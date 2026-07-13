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
  const parts = [
    [draft.schemeName, draft.modelName].filter(Boolean).join(" "),
    draft.modelName,
    query?.trim(),
    draft.aliases?.[0],
  ]
    .map((q) => q?.trim())
    .filter((q): q is string => Boolean(q && q.length >= 3));

  return [...new Set(parts)].slice(0, 3);
}

function relevanceScore(title: string, draft: ImageSearchDraft, query?: string): number {
  const hay = title.toLowerCase();
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
  if (/nose.?art|aircraft|plane|bomber|fighter|tank|ship/i.test(title)) score += 1;
  if (/map|diagram|drawing|logo|icon|flag/i.test(title)) score -= 2;
  return score;
}

function creditFromMeta(meta: Record<string, { value?: string }> | undefined): string {
  const artist = meta?.Artist?.value ? stripHtml(meta.Artist.value) : "";
  const license = meta?.LicenseShortName?.value ? stripHtml(meta.LicenseShortName.value) : "";
  return [artist || "Wikimedia Commons", license].filter(Boolean).join(" · ");
}

/**
 * Find up to `limit` real Wikimedia Commons files for this scheme.
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
      gsrlimit: "12",
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
          return {
            page,
            url,
            mime,
            title,
            score: relevanceScore(title, draft, query) - (page.index ?? 99) * 0.01,
          };
        })
        .filter((row) => row.url && row.mime.startsWith("image/"))
        .sort((a, b) => b.score - a.score);

      for (const row of ranked) {
        if (found.length >= limit) break;
        if (!row.url || row.score < 2) continue;
        const verified = await verifyReferenceImageUrl(row.url);
        if (verified.status !== "verified" || !verified.url) continue;
        if (seen.has(verified.url)) continue;
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

  return found;
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
