type CitationDraft = {
  modelName: string;
  schemeName: string;
  operator?: string;
  unit?: string;
  buno?: string;
  aliases?: string[];
};

const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
]);

const STOP_WORDS = new Set([
  "with",
  "from",
  "that",
  "this",
  "scheme",
  "color",
  "colour",
  "paint",
  "visit",
  "museum",
  "exhibit",
  "exhibits",
  "fact",
  "sheet",
  "sheets",
  "display",
  "article",
  "national",
  "archive",
  "aircraft",
]);

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (BLOCKED_HOSTS.has(host)) return true;
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  return false;
}

function draftText(draft: CitationDraft, query?: string): string {
  return [
    draft.modelName,
    draft.schemeName,
    draft.operator,
    draft.unit,
    draft.buno,
    ...(draft.aliases ?? []),
    query,
  ]
    .filter(Boolean)
    .join(" ");
}

/** Airframe designations normalized without hyphens (b24d, a20g, f16c). */
export function extractDesignations(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.toLowerCase().matchAll(/\b([a-z]{1,3})-?(\d{1,3})([a-z]?)\b/g)) {
    const code = `${m[1]}${m[2]}${m[3]}`;
    if (code.length >= 2) out.add(code);
  }
  return [...out];
}

/** Significant tokens from the draft used to check the page is about the right subject. */
export function citationRelevanceTokens(draft: CitationDraft, query?: string): string[] {
  const raw = draftText(draft, query);
  const tokens = new Set<string>();
  for (const part of raw.toLowerCase().split(/[^a-z0-9]+/)) {
    if (part.length < 4) continue;
    if (STOP_WORDS.has(part)) continue;
    tokens.add(part);
  }
  for (const d of extractDesignations(raw)) {
    tokens.add(d);
  }
  return [...tokens].slice(0, 16);
}

function pathSlug(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  return (parts[parts.length - 1] ?? "").toLowerCase();
}

function countHits(haystack: string, tokens: string[]): number {
  return tokens.filter((t) => haystack.includes(t)).length;
}

/** Prefer title / og:title / h1 — full-page HTML often shares nav text across exhibits. */
function extractTitleSignals(html: string): string {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const og =
    html.match(/property=["']og:title["'][^>]*content=["']([^"']+)["']/i)?.[1] ??
    html.match(/content=["']([^"']+)["'][^>]*property=["']og:title["']/i)?.[1] ??
    "";
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  return `${title} ${og} ${h1}`.replace(/<[^>]+>/g, " ").toLowerCase();
}

/**
 * Reject when the URL slug names a different airframe designation than the draft
 * (e.g. douglas-a-20g-havoc for a B-24 Liberator request).
 */
function designationsConflict(draft: CitationDraft, query: string | undefined, slug: string): boolean {
  const draftCodes = extractDesignations(draftText(draft, query));
  // Keep hyphens so a-20g / b-24d parse as designations.
  const urlCodes = extractDesignations(slug);
  if (draftCodes.length === 0 || urlCodes.length === 0) return false;
  return !urlCodes.some((u) => draftCodes.includes(u));
}

/**
 * Fetch a candidate citation and keep it only if the URL (and title when available)
 * is about this model — not merely the same museum site with shared navigation.
 */
export async function verifyCitationUrl(
  url: string | undefined,
  draft: CitationDraft,
  query?: string,
): Promise<{
  url?: string;
  status: "verified" | "needs_review" | "rejected" | "missing";
  reason?: string;
}> {
  if (!url?.trim()) return { status: "missing" };

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return { status: "rejected", reason: "Invalid URL" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { status: "rejected", reason: "Only http(s) citations are allowed" };
  }
  if (isPrivateOrLocalHost(parsed.hostname)) {
    return { status: "rejected", reason: "Citation host not allowed" };
  }

  const tokens = citationRelevanceTokens(draft, query);
  if (tokens.length === 0) {
    return { status: "rejected", reason: "Not enough context to verify citation" };
  }

  const slug = pathSlug(parsed.pathname);
  const pathHaystack = parsed.pathname.toLowerCase();
  const slugHits = countHits(slug.replace(/-/g, " "), tokens) + countHits(slug, tokens);
  // Deduplicate-ish: also count path without double-counting via max of slug-focused
  const pathHits = Math.max(slugHits, countHits(pathHaystack, tokens));

  if (designationsConflict(draft, query, slug)) {
    return {
      status: "rejected",
      reason: "Citation URL is for a different aircraft type",
    };
  }

  // URL path must look like this subject — museum hubs share nav text across pages.
  if (pathHits < 1) {
    return {
      status: "rejected",
      reason: "Citation URL does not name this model/scheme",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (compatible; ChromabenchCitationCheck/1.0; +https://chromabench.com)",
      },
    });

    const finalUrl = res.url || parsed.toString();
    let finalParsed = parsed;
    try {
      finalParsed = new URL(finalUrl);
    } catch {
      /* keep */
    }
    if (isPrivateOrLocalHost(finalParsed.hostname)) {
      return { status: "rejected", reason: "Citation redirected to a blocked host" };
    }

    const finalSlug = pathSlug(finalParsed.pathname);
    if (designationsConflict(draft, query, finalSlug)) {
      return {
        status: "rejected",
        reason: "Citation URL is for a different aircraft type",
      };
    }
    const finalPathHits = Math.max(
      countHits(finalSlug.replace(/-/g, " "), tokens) + countHits(finalSlug, tokens),
      countHits(finalParsed.pathname.toLowerCase(), tokens),
    );
    if (finalPathHits < 1) {
      return {
        status: "rejected",
        reason: "Citation URL does not name this model/scheme",
      };
    }

    if (res.status === 401 || res.status === 403 || res.status === 429) {
      return {
        url: parsed.toString(),
        status: "needs_review",
        reason: "Site blocked automated checks — please open and confirm the link",
      };
    }

    if (!res.ok) {
      return { status: "rejected", reason: `Citation page returned ${res.status}` };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (
      contentType &&
      !/text\/html|text\/plain|application\/xhtml/i.test(contentType) &&
      !contentType.includes("charset")
    ) {
      return { status: "rejected", reason: "Citation is not an HTML page" };
    }

    const html = (await res.text()).slice(0, 250_000);
    const titleSignals = extractTitleSignals(html);
    const titleHits = countHits(titleSignals, tokens);
    const needed = Math.min(2, tokens.length);

    if (titleHits >= needed) {
      return { url: finalUrl, status: "verified" };
    }

    // Path already matched; title incomplete (JS site) — ask the user to confirm.
    if (finalPathHits >= 1) {
      return {
        url: finalUrl,
        status: "needs_review",
        reason: "Could not confirm page title — please open and confirm it’s the right aircraft",
      };
    }

    return {
      status: "rejected",
      reason: "Page title does not match this model/scheme",
    };
  } catch {
    return {
      url: parsed.toString(),
      status: "needs_review",
      reason: "Could not reach citation URL — please open and confirm",
    };
  } finally {
    clearTimeout(timer);
  }
}
