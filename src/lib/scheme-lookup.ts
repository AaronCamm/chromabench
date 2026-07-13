import type { ModelCategory, SchemeColorCallout, SchemeSource } from "@/data/models/types";
import { resolveCalloutPaint } from "@/lib/fs-paints";
import { sanitizeCalloutBrandCodes } from "@/lib/equivalents";
import { verifyCitationUrl } from "@/lib/citation-verify";
import {
  reviewSchemeDraftWithOpenAI,
  suggestCitationUrlWithOpenAI,
  type SchemeReviewMeta,
} from "@/lib/scheme-review";

export type SchemeLookupDraft = {
  modelName: string;
  category: ModelCategory;
  aliases: string[];
  schemeName: string;
  operator?: string;
  unit?: string;
  year?: string;
  buno?: string;
  colors: SchemeColorCallout[];
  confidence: "high" | "medium" | "low" | "unknown";
  notes?: string;
  citedUrl?: string;
};

export type SchemeLookupResult = {
  draft: SchemeLookupDraft;
  citation: {
    status: "verified" | "needs_review" | "rejected" | "missing";
    reason?: string;
    url?: string;
  };
  review: SchemeReviewMeta;
};

const LOOKUP_SYSTEM = `You are a scale modelling colour researcher for Chromabench.
Given a model / operator / scheme request, return known Federal Standard (FS 595) or equivalent
camouflage callouts used by hobbyists (decal sheets, Cybermodeler, IPMS charts).

Rules:
- Prefer FS ##### codes when the scheme is US-related or commonly mapped to FS.
- Include role labels (e.g. Upper surface, Underside, Tan, Dark Green).
- Optional brand codes (tamiya XF-###, vallejo 71.###, mrColor C###) only when widely published.
- Brand codes for the same role MUST be colour-equivalents of each other (e.g. XF-23 with C20, never C367).
- If unsure about a brand code, omit it — do not guess.
- If you are not confident, set confidence to "low" or "unknown" and return an empty colors array rather than inventing.
- Do not invent BuNos. Omit fields you do not know.
- citedUrl: include a real public http(s) page about THIS specific aircraft/scheme when known
  (Cybermodeler, museum fact sheets, IPMS, warbird registry, etc.). Never invent or guess a URL path.
  The URL path/slug must name this aircraft (e.g. …/consolidated-b-24d-liberator/), not a
  different type on the same site. If you are not sure the exact URL is correct, omit citedUrl.
- Respond with JSON only matching the schema.`;

export async function lookupSchemeWithClaude(
  query: string,
  notes?: string,
): Promise<SchemeLookupResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const userContent = [
    `Request: ${query.trim()}`,
    notes?.trim() ? `Additional notes: ${notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-5",
      max_tokens: 2048,
      system: LOOKUP_SYSTEM,
      messages: [{ role: "user", content: userContent }],
      tools: [
        {
          name: "submit_scheme",
          description: "Return the researched paint scheme as structured data",
          input_schema: {
            type: "object",
            properties: {
              modelName: { type: "string" },
              category: { type: "string", enum: ["aircraft", "vehicle", "ship"] },
              aliases: { type: "array", items: { type: "string" } },
              schemeName: { type: "string" },
              operator: { type: "string" },
              unit: { type: "string" },
              year: { type: "string" },
              buno: { type: "string" },
              colors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    role: { type: "string" },
                    fs: { type: "string" },
                    standardName: { type: "string" },
                    tamiya: { type: "string" },
                    vallejo: { type: "string" },
                    mrColor: { type: "string" },
                    notes: { type: "string" },
                  },
                  required: ["role"],
                },
              },
              confidence: { type: "string", enum: ["high", "medium", "low", "unknown"] },
              notes: { type: "string" },
              citedUrl: {
                type: "string",
                description:
                  "Exact public URL for this aircraft/scheme only if known; omit if unsure",
              },
            },
            required: ["modelName", "category", "schemeName", "colors", "confidence"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "submit_scheme" },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Claude API error (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    content?: Array<{ type: string; name?: string; input?: Record<string, unknown> }>;
  };

  const tool = data.content?.find((c) => c.type === "tool_use" && c.name === "submit_scheme");
  if (!tool?.input) {
    throw new Error("Claude did not return a scheme draft");
  }

  const draft = normalizeDraft(tool.input);
  let { draft: reviewed, review } = await reviewSchemeDraftWithOpenAI(draft, query, notes);

  let citation = await verifyCitationUrl(reviewed.citedUrl, reviewed, query);

  // If we still have no usable citation, ask OpenAI specifically for a URL, then re-verify.
  if (citation.status === "rejected" || citation.status === "missing") {
    const suggested = await suggestCitationUrlWithOpenAI(reviewed, query, notes);
    if (suggested.url) {
      reviewed = { ...reviewed, citedUrl: suggested.url };
      citation = await verifyCitationUrl(suggested.url, reviewed, query);
      if (citation.status === "verified" || citation.status === "needs_review") {
        review = {
          ...review,
          applied: true,
          citedUrlChanged: true,
          summary: suggested.summary
            ? `${review.summary ? `${review.summary} · ` : ""}${suggested.summary}`
            : review.summary ?? "Added citation from cross-check",
        };
      }
    }
  }

  // Keep path-valid citations on the draft for save. needs_review (bot-blocked sites) still
  // shows in the UI so the user can open/remove, but Confirm includes the link by default.
  if (citation.status === "verified" || citation.status === "needs_review") {
    reviewed.citedUrl = citation.url;
  } else {
    reviewed.citedUrl = undefined;
  }

  return {
    draft: reviewed,
    citation: {
      status: citation.status,
      reason: citation.reason,
      url: citation.url ?? reviewed.citedUrl,
    },
    review,
  };
}

function normalizeDraft(input: Record<string, unknown>): SchemeLookupDraft {
  const category = input.category;
  const cat: ModelCategory =
    category === "vehicle" || category === "ship" || category === "aircraft"
      ? category
      : "aircraft";

  const colorsRaw = Array.isArray(input.colors) ? input.colors : [];
  const colors: SchemeColorCallout[] = colorsRaw
    .map((c) => {
      if (!c || typeof c !== "object") return null;
      const row = c as Record<string, unknown>;
      const role = typeof row.role === "string" ? row.role.trim() : "";
      if (!role) return null;
      const fs =
        typeof row.fs === "string"
          ? row.fs.replace(/\D/g, "").slice(0, 5) || undefined
          : undefined;
      const out: SchemeColorCallout = { role };
      if (fs) out.fs = fs;
      if (typeof row.standardName === "string" && row.standardName) out.standardName = row.standardName;
      if (typeof row.tamiya === "string" && row.tamiya) out.tamiya = row.tamiya;
      if (typeof row.vallejo === "string" && row.vallejo) out.vallejo = row.vallejo;
      if (typeof row.mrColor === "string" && row.mrColor) out.mrColor = row.mrColor;
      if (typeof row.notes === "string" && row.notes) out.notes = row.notes;
      return sanitizeCalloutBrandCodes(out, resolveCalloutPaint);
    })
    .filter(Boolean) as SchemeColorCallout[];

  const confidence = input.confidence;
  const conf: SchemeLookupDraft["confidence"] =
    confidence === "high" ||
    confidence === "medium" ||
    confidence === "low" ||
    confidence === "unknown"
      ? confidence
      : "unknown";

  const aliases = Array.isArray(input.aliases)
    ? input.aliases.filter((a): a is string => typeof a === "string" && a.trim().length > 0)
    : [];

  const rawUrl = typeof input.citedUrl === "string" ? input.citedUrl.trim() : "";

  return {
    modelName: String(input.modelName ?? "Unknown model").trim(),
    category: cat,
    aliases,
    schemeName: String(input.schemeName ?? "Unknown scheme").trim(),
    operator: typeof input.operator === "string" ? input.operator : undefined,
    unit: typeof input.unit === "string" ? input.unit : undefined,
    year: typeof input.year === "string" ? input.year : undefined,
    buno: typeof input.buno === "string" ? input.buno : undefined,
    colors,
    confidence: conf,
    notes: typeof input.notes === "string" ? input.notes : undefined,
    citedUrl: rawUrl || undefined,
  };
}

export function draftSources(draft: SchemeLookupDraft): SchemeSource[] {
  const sources: SchemeSource[] = [{ label: "User Added" }];
  if (draft.citedUrl) {
    sources.push({ label: "Cited reference", url: draft.citedUrl });
  }
  return sources;
}
