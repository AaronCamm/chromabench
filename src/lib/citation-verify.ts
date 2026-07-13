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

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

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

function pathMatchesSubject(
  pathname: string,
  draft: CitationDraft,
  query: string | undefined,
  tokens: string[],
): boolean {
  const slug = pathSlug(pathname);
  if (designationsConflict(draft, query, slug)) return false;
  const pathHits = Math.max(
    countHits(slug.replace(/-/g, " "), tokens) + countHits(slug, tokens),
    countHits(pathname.toLowerCase(), tokens),
  );
  return pathHits >= 1;
}

function resolveRedirectUrl(base: URL, location: string): URL | null {
  try {
    return new URL(location, base);
  } catch {
    return null;
  }
}

/**
 * Fetch following redirects manually so CMS sites that ignore the slug
 * (article ID → canonical slug) are judged on the FINAL URL, not the claimed one.
 */
async function fetchCitationPage(
  start: URL,
  signal: AbortSignal,
): Promise<{ finalUrl: URL; status: number; html?: string }> {
  let current = start;
  for (let hop = 0; hop < 6; hop++) {
    const res = await fetch(current.toString(), {
      method: "GET",
      redirect: "manual",
      signal,
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "User-Agent": BROWSER_UA,
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) {
        return { finalUrl: current, status: res.status };
      }
      const next = resolveRedirectUrl(current, location);
      if (!next) return { finalUrl: current, status: res.status };
      if (isPrivateOrLocalHost(next.hostname)) {
        return { finalUrl: next, status: 403 };
      }
      // Prefer https if museum redirects to http
      if (next.protocol === "http:" && start.protocol === "https:") {
        next.protocol = "https:";
      }
      current = next;
      continue;
    }

    if (!res.ok) {
      return { finalUrl: current, status: res.status };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (
      contentType &&
      !/text\/html|text\/plain|application\/xhtml/i.test(contentType) &&
      !contentType.includes("charset")
    ) {
      return { finalUrl: current, status: 415 };
    }

    const html = (await res.text()).slice(0, 250_000);
    return { finalUrl: current, status: res.status, html };
  }

  return { finalUrl: current, status: 310 };
}

/**
 * Fetch a candidate citation and keep it only if the FINAL page (after redirects)
 * is about this model. Museum fact sheets use article IDs — a forged Liberator slug
 * on a Spitfire article ID must be rejected.
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

  // Quick reject on the claimed path when it already names a different type
  if (!pathMatchesSubject(parsed.pathname, draft, query, tokens)) {
    // Still fetch — some sites redirect a wrong slug to the right article.
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const page = await fetchCitationPage(parsed, controller.signal);

    if (isPrivateOrLocalHost(page.finalUrl.hostname)) {
      return { status: "rejected", reason: "Citation redirected to a blocked host" };
    }

    // Judged on the destination after redirects — not the AI-claimed slug.
    if (!pathMatchesSubject(page.finalUrl.pathname, draft, query, tokens)) {
      return {
        status: "rejected",
        reason: "Citation redirects to a different aircraft page",
      };
    }

    if (page.status === 401 || page.status === 403 || page.status === 429) {
      // Do not trust a claimed slug we could not load (CMS IDs are authoritative).
      return {
        status: "rejected",
        reason: "Could not verify citation page (site blocked the check)",
      };
    }

    if (page.status === 415) {
      return { status: "rejected", reason: "Citation is not an HTML page" };
    }

    if (page.status < 200 || page.status >= 300 || !page.html) {
      return { status: "rejected", reason: `Citation page returned ${page.status}` };
    }

    const titleSignals = extractTitleSignals(page.html);
    const titleHits = countHits(titleSignals, tokens);
    const needed = Math.min(2, tokens.length);
    const canonical = page.finalUrl.toString();

    if (titleHits >= needed) {
      return { url: canonical, status: "verified" };
    }

    // Final path matched but title was thin — still keep canonical URL for review.
    return {
      url: canonical,
      status: "needs_review",
      reason: "Could not confirm page title — please open and confirm it’s the right aircraft",
    };
  } catch {
    return {
      status: "rejected",
      reason: "Could not reach citation URL",
    };
  } finally {
    clearTimeout(timer);
  }
}
