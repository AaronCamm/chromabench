import { decode as decodeJpeg } from "jpeg-js";
import { verifyReferenceImageUrl } from "@/lib/image-verify";

export type CommonsImageOption = {
  url: string;
  credit: string;
};

type ImageSearchDraft = {
  modelName: string;
  schemeName: string;
  aliases?: string[];
};

type CommonsPage = {
  title?: string;
  index?: number;
  imageinfo?: Array<{
    url?: string;
    thumburl?: string;
    mime?: string;
    extmetadata?: Record<string, { value?: string }>;
  }>;
};

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function searchQueries(draft: ImageSearchDraft, query?: string): string[] {
  const base = [
    [draft.schemeName, draft.modelName].filter(Boolean).join(" "),
    draft.modelName,
    query?.trim(),
    draft.aliases?.[0],
  ]
    .map((q) => q?.trim())
    .filter((q): q is string => Boolean(q && q.length >= 3));

  // Prefer colour photos; exclude Commons B&W category when possible.
  const withColor = base.flatMap((q) => [
    `${q} color -incategory:"Black and white photographs"`,
    `${q} colour -incategory:"Black and white photographs"`,
    `${q} -incategory:"Black and white photographs"`,
  ]);
  return [...new Set(withColor)].slice(0, 6);
}

function isTaggedMono(text: string): boolean {
  return /black[\s_-]?and[\s_-]?white|\bb\s*&\s*w\b|monochrome|gr[ae]yscale|sepia|noir|black and white photographs|monochrome photographs/i.test(
    text,
  );
}

function relevanceScore(
  title: string,
  categories: string,
  draft: ImageSearchDraft,
  query?: string,
): number {
  const hay = `${title} ${categories}`.toLowerCase();
  const tokens = [
    draft.modelName,
    draft.schemeName,
    ...(draft.aliases ?? []),
    query,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 4);

  let score = 0;
  for (const t of [...new Set(tokens)]) {
    if (hay.includes(t)) score += t.length >= 6 ? 3 : 1;
  }
  if (/nose.?art|aircraft|plane|bomber|fighter|tank|ship|museum/i.test(title)) score += 1;
  if (/map|diagram|drawing|logo|icon|flag|silhouette|line.?art/i.test(title)) score -= 3;
  if (/\bcolou?r(?:ed|ized)?\b|kodachrome|agfacolor|technicolor/i.test(hay)) score += 4;
  return score;
}

function creditFromMeta(meta: Record<string, { value?: string }> | undefined): string {
  const artist = meta?.Artist?.value ? stripHtml(meta.Artist.value) : "";
  const license = meta?.LicenseShortName?.value ? stripHtml(meta.LicenseShortName.value) : "";
  return [artist || "Wikimedia Commons", license].filter(Boolean).join(" · ");
}

/** Sample a small JPEG and decide if it is effectively greyscale. */
async function isGrayscaleImage(url: string): Promise<boolean | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    // Force a tiny derivative for sampling when possible
    const sampleUrl = url.includes("/thumb/")
      ? url.replace(/\/\d+px-/, "/64px-")
      : url;
    const res = await fetch(sampleUrl, {
      signal: controller.signal,
      headers: {
        Accept: "image/jpeg,image/*;q=0.8",
        "User-Agent": "Chromabench/1.0 (https://chromabench.com; grayscale check)",
      },
    });
    if (!res.ok) return null;
    const type = (res.headers.get("content-type") ?? "").toLowerCase();
    if (!type.includes("jpeg") && !type.includes("jpg") && !url.toLowerCase().match(/\.jpe?g(\?|$)/)) {
      // Skip non-JPEG sampling (PNG/WebP) — treat as unknown/not grayscale fail-open for tagged color only
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const decoded = decodeJpeg(buf, { useTArray: true, maxMemoryUsageInMB: 32 });
    const { data, width, height } = decoded;
    if (!width || !height) return null;

    let chroma = 0;
    let samples = 0;
    const stepX = Math.max(1, Math.floor(width / 16));
    const stepY = Math.max(1, Math.floor(height / 16));
    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        chroma += Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);
        samples += 1;
      }
    }
    if (samples === 0) return null;
    const avgChroma = chroma / samples;
    // Colour photos usually average well above this; true B&W sits near 0.
    return avgChroma < 12;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Find up to `limit` colour Wikimedia Commons files for this scheme.
 * Black-and-white photos are excluded (metadata + pixel check).
 */
export async function findCommonsReferenceImages(
  draft: ImageSearchDraft,
  query?: string,
  limit = 3,
): Promise<CommonsImageOption[]> {
  const queries = searchQueries(draft, query);
  if (queries.length === 0) return [];

  const found: CommonsImageOption[] = [];
  const seen = new Set<string>();

  for (const q of queries) {
    if (found.length >= limit) break;

    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrnamespace: "6",
      gsrsearch: q,
      gsrlimit: "20",
      prop: "imageinfo",
      iiprop: "url|mime|extmetadata",
      iiurlwidth: "1600",
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Chromabench/1.0 (https://chromabench.com; scheme reference images)",
          Accept: "application/json",
        },
      });
      if (!res.ok) continue;

      const data = (await res.json()) as { query?: { pages?: Record<string, CommonsPage> } };
      const pages = Object.values(data.query?.pages ?? {});
      if (pages.length === 0) continue;

      const ranked = pages
        .map((page) => {
          const info = page.imageinfo?.[0];
          const url = info?.thumburl || info?.url;
          const mime = info?.mime ?? "";
          const title = page.title ?? "";
          const categories = info?.extmetadata?.Categories?.value ?? "";
          const blob = `${title} ${categories}`;
          return {
            page,
            url,
            mime,
            title,
            categories,
            taggedMono: isTaggedMono(blob),
            score: relevanceScore(title, categories, draft, query) - (page.index ?? 99) * 0.01,
          };
        })
        .filter((row) => row.url && row.mime.startsWith("image/") && !row.taggedMono)
        .sort((a, b) => b.score - a.score);

      for (const row of ranked) {
        if (found.length >= limit) break;
        if (!row.url || row.score < 2) continue;
        const verified = await verifyReferenceImageUrl(row.url);
        if (verified.status !== "verified" || !verified.url) continue;
        if (seen.has(verified.url)) continue;

        const gray = await isGrayscaleImage(verified.url);
        if (gray === true) continue; // drop measured B&W

        seen.add(verified.url);
        found.push({
          url: verified.url,
          credit: creditFromMeta(row.page.imageinfo?.[0]?.extmetadata),
        });
      }
    } catch {
      /* try next query */
    } finally {
      clearTimeout(timer);
    }
  }

  return found.slice(0, limit);
}

/** @deprecated use findCommonsReferenceImages */
export async function findCommonsReferenceImage(
  draft: ImageSearchDraft,
  query?: string,
): Promise<{ url?: string; credit?: string; summary?: string }> {
  const [first] = await findCommonsReferenceImages(draft, query, 1);
  if (!first) return {};
  return {
    url: first.url,
    credit: first.credit,
    summary: "Found Commons reference image",
  };
}
