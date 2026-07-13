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

  // Prefer colour photos first, then general matches as fallback.
  const withColor = base.flatMap((q) => [`${q} color`, `${q} colour`, q]);
  return [...new Set(withColor)].slice(0, 6);
}

function isLikelyMono(text: string): boolean {
  return /black[\s_-]?and[\s_-]?white|\bb\s*&\s*w\b|monochrome|gr[ae]yscale|sepia|noir/i.test(
    text,
  );
}

function isLikelyColor(text: string): boolean {
  return /\bcolou?r(?:ed|ized)?\b|kodachrome|agfacolor|technicolor|full.?color/i.test(text);
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

  // Strong preference for colour reference photos (paint schemes need colour).
  if (isLikelyMono(hay)) score -= 8;
  if (isLikelyColor(hay)) score += 5;
  if (/black and white photographs|monochrome photographs/i.test(categories)) score -= 10;
  if (/color photographs|colour photographs|photographs of .* in color/i.test(categories)) {
    score += 4;
  }

  return score;
}

function creditFromMeta(meta: Record<string, { value?: string }> | undefined): string {
  const artist = meta?.Artist?.value ? stripHtml(meta.Artist.value) : "";
  const license = meta?.LicenseShortName?.value ? stripHtml(meta.LicenseShortName.value) : "";
  return [artist || "Wikimedia Commons", license].filter(Boolean).join(" · ");
}

/**
 * Find up to `limit` real Wikimedia Commons files for this scheme.
 * Prefers colour photos over black-and-white.
 */
export async function findCommonsReferenceImages(
  draft: ImageSearchDraft,
  query?: string,
  limit = 3,
): Promise<CommonsImageOption[]> {
  const queries = searchQueries(draft, query);
  if (queries.length === 0) return [];

  const colorHits: CommonsImageOption[] = [];
  const monoHits: CommonsImageOption[] = [];
  const seen = new Set<string>();

  for (const q of queries) {
    if (colorHits.length >= limit) break;

    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrnamespace: "6",
      gsrsearch: q,
      gsrlimit: "16",
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
            mono: isLikelyMono(blob),
            score: relevanceScore(title, categories, draft, query) - (page.index ?? 99) * 0.01,
          };
        })
        .filter((row) => row.url && row.mime.startsWith("image/"))
        .sort((a, b) => b.score - a.score);

      for (const row of ranked) {
        if (colorHits.length >= limit) break;
        if (!row.url || row.score < 2) continue;
        const verified = await verifyReferenceImageUrl(row.url);
        if (verified.status !== "verified" || !verified.url) continue;
        if (seen.has(verified.url)) continue;
        seen.add(verified.url);

        const option = {
          url: verified.url,
          credit: creditFromMeta(row.page.imageinfo?.[0]?.extmetadata),
        };
        if (row.mono) monoHits.push(option);
        else colorHits.push(option);
      }
    } catch {
      /* try next query */
    } finally {
      clearTimeout(timer);
    }
  }

  // Prefer colour; only pad with B&W if we couldn't find enough colour photos.
  return [...colorHits, ...monoHits].slice(0, limit);
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
