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

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (BLOCKED_HOSTS.has(host)) return true;
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  // IPv4 private / loopback / link-local
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

/** Significant tokens from the draft used to check the page is about the right subject. */
export function citationRelevanceTokens(draft: CitationDraft, query?: string): string[] {
  const raw = [
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

  const tokens = new Set<string>();
  for (const part of raw.toLowerCase().split(/[^a-z0-9]+/)) {
    if (part.length < 4) continue;
    if (["with", "from", "that", "this", "scheme", "color", "colour", "paint"].includes(part)) {
      continue;
    }
    tokens.add(part);
  }
  // Compact airframe codes like b-24 / b24
  const compact = raw.toLowerCase().match(/\b[a-z]-?\d{1,3}[a-z]?\b/g) ?? [];
  for (const c of compact) {
    const cleaned = c.replace(/-/g, "");
    if (cleaned.length >= 2) tokens.add(cleaned);
  }
  return [...tokens].slice(0, 12);
}

/**
 * Fetch a candidate citation and keep it only if the page loads and mentions
 * the model/scheme. Some sites block bots (403) — those return needs_review
 * so the user can open and confirm the link in the preview UI.
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

  // Also require the URL path/host itself to look related when possible
  const urlHaystack = `${parsed.hostname}${parsed.pathname}`.toLowerCase();
  const urlHits = tokens.filter((t) => urlHaystack.includes(t)).length;

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
    let finalHost = parsed.hostname;
    try {
      finalHost = new URL(finalUrl).hostname;
    } catch {
      /* keep */
    }
    if (isPrivateOrLocalHost(finalHost)) {
      return { status: "rejected", reason: "Citation redirected to a blocked host" };
    }

    // Bot-blocked or unreachable HTML — allow user review if URL looks related
    if (res.status === 401 || res.status === 403 || res.status === 429) {
      if (urlHits >= 1) {
        return {
          url: parsed.toString(),
          status: "needs_review",
          reason: "Site blocked automated checks — please open and confirm the link",
        };
      }
      return {
        status: "rejected",
        reason: `Citation page returned ${res.status}`,
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

    const body = (await res.text()).slice(0, 250_000).toLowerCase();
    const hits = tokens.filter((t) => body.includes(t));
    const needed = Math.min(2, tokens.length);
    if (hits.length < needed) {
      // Soft pass: URL path matches strongly even if body is JS-rendered empty
      if (urlHits >= 2 || (urlHits >= 1 && hits.length >= 1)) {
        return {
          url: finalUrl,
          status: "needs_review",
          reason: "Could not fully verify page text — please open and confirm",
        };
      }
      return {
        status: "rejected",
        reason: "Page does not mention this model/scheme",
      };
    }

    return { url: finalUrl, status: "verified" };
  } catch {
    if (urlHits >= 1) {
      return {
        url: parsed.toString(),
        status: "needs_review",
        reason: "Could not reach citation URL — please open and confirm",
      };
    }
    return { status: "rejected", reason: "Could not reach citation URL" };
  } finally {
    clearTimeout(timer);
  }
}
