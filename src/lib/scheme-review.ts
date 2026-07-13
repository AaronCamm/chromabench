import type { SchemeColorCallout } from "@/data/models/types";
import type { SchemeLookupDraft } from "@/lib/scheme-lookup";
import { resolveCalloutPaint } from "@/lib/fs-paints";
import { sanitizeCalloutBrandCodes } from "@/lib/equivalents";

export type SchemeReviewMeta = {
  applied: boolean;
  skipped?: boolean;
  reason?: string;
  certainty?: "high" | "medium" | "low";
  summary?: string;
  citedUrlChanged?: boolean;
  colorsChanged?: boolean;
};

type ReviewPayload = {
  certainty: "high" | "medium" | "low";
  summary: string;
  citedUrlAction: "keep" | "replace" | "clear";
  citedUrl?: string | null;
  replaceColors: boolean;
  colors?: Array<{
    role: string;
    fs?: string | null;
    standardName?: string | null;
    tamiya?: string | null;
    vallejo?: string | null;
    mrColor?: string | null;
    notes?: string | null;
  }> | null;
};

const REVIEW_SYSTEM = `You are a second-opinion fact checker for Chromabench scale-modelling paint schemes.

You receive a user request and a draft scheme produced by another model. Your job is to correct
clear mistakes — especially wrong or missing citation URLs — when you know the right answer.

Rules for citedUrlAction:
- "keep" if the URL path/slug is clearly about THIS specific aircraft/scheme.
- "replace" if the URL is missing, points at a different aircraft (common on museum fact-sheet sites),
  or is otherwise wrong — AND you know the correct public http(s) URL. Put that exact URL in citedUrl.
  The path/slug must name this aircraft (e.g. …/consolidated-b-24d-liberator/ for a B-24 Liberator,
  never …/douglas-a-20g-havoc/).
- "clear" only if the URL is wrong and you do NOT know a correct replacement.
- Prefer "replace" over "clear" whenever you know the right page.
- Never invent URL paths you are unsure of.

Rules for colours:
- replaceColors: true only when you are certain specific FS/brand callouts are wrong and you know
  the correct ones. Otherwise false.
- Brand codes for the same role must be colour-equivalents (e.g. XF-23 with C20, never C367).

certainty:
- "high" when you would bet on the correction (required to auto-apply colour changes).
- "medium" is enough for citedUrl keep/replace/clear when the URL issue is obvious.
- Respond with JSON matching the schema.`;

/**
 * Second-pass review (OpenAI). Can replace citedUrl (medium+) and colours (high only).
 * No-ops if OPENAI_API_KEY is missing.
 */
export async function reviewSchemeDraftWithOpenAI(
  draft: SchemeLookupDraft,
  query: string,
  notes?: string,
): Promise<{ draft: SchemeLookupDraft; review: SchemeReviewMeta }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return {
      draft,
      review: { applied: false, skipped: true, reason: "OPENAI_API_KEY not configured" },
    };
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4.1";

  const userContent = [
    `User request: ${query.trim()}`,
    notes?.trim() ? `Additional notes: ${notes.trim()}` : null,
    `Draft JSON:\n${JSON.stringify(draft, null, 2)}`,
    draft.citedUrl
      ? "Check citedUrl carefully. If it is a different aircraft on the same site, REPLACE with the correct page."
      : "citedUrl is missing. If you know a correct public reference page for this exact aircraft/scheme, REPLACE with that URL.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "scheme_review",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              certainty: { type: "string", enum: ["high", "medium", "low"] },
              summary: { type: "string" },
              citedUrlAction: { type: "string", enum: ["keep", "replace", "clear"] },
              citedUrl: { type: ["string", "null"] },
              replaceColors: { type: "boolean" },
              colors: {
                type: ["array", "null"],
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    role: { type: "string" },
                    fs: { type: ["string", "null"] },
                    standardName: { type: ["string", "null"] },
                    tamiya: { type: ["string", "null"] },
                    vallejo: { type: ["string", "null"] },
                    mrColor: { type: ["string", "null"] },
                    notes: { type: ["string", "null"] },
                  },
                  required: [
                    "role",
                    "fs",
                    "standardName",
                    "tamiya",
                    "vallejo",
                    "mrColor",
                    "notes",
                  ],
                },
              },
            },
            required: [
              "certainty",
              "summary",
              "citedUrlAction",
              "citedUrl",
              "replaceColors",
              "colors",
            ],
          },
        },
      },
      messages: [
        { role: "system", content: REVIEW_SYSTEM },
        { role: "user", content: userContent },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.warn("OpenAI scheme review failed", res.status, body.slice(0, 200));
    return {
      draft,
      review: {
        applied: false,
        reason: `OpenAI review failed (${res.status})`,
      },
    };
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) {
    return { draft, review: { applied: false, reason: "Empty OpenAI review response" } };
  }

  let payload: ReviewPayload;
  try {
    payload = JSON.parse(raw) as ReviewPayload;
  } catch {
    return { draft, review: { applied: false, reason: "Invalid OpenAI review JSON" } };
  }

  const certainty =
    payload.certainty === "high" || payload.certainty === "medium" || payload.certainty === "low"
      ? payload.certainty
      : "low";

  if (certainty === "low") {
    return {
      draft,
      review: {
        applied: false,
        certainty,
        summary: payload.summary,
        reason: "Review not applied (low certainty)",
      },
    };
  }

  const next: SchemeLookupDraft = { ...draft };
  let citedUrlChanged = false;
  let colorsChanged = false;

  // URL fixes apply at medium or high certainty
  if (payload.citedUrlAction === "clear") {
    if (next.citedUrl) {
      next.citedUrl = undefined;
      citedUrlChanged = true;
    }
  } else if (payload.citedUrlAction === "replace") {
    const url = typeof payload.citedUrl === "string" ? payload.citedUrl.trim() : "";
    if (url && looksLikeHttpUrl(url) && url !== next.citedUrl) {
      next.citedUrl = url;
      citedUrlChanged = true;
    }
  }

  // Colour fixes only at high certainty
  if (
    certainty === "high" &&
    payload.replaceColors &&
    Array.isArray(payload.colors) &&
    payload.colors.length > 0
  ) {
    const colors = normalizeReviewColors(payload.colors);
    if (colors.length > 0) {
      next.colors = colors;
      colorsChanged = true;
    }
  }

  const applied = citedUrlChanged || colorsChanged;
  return {
    draft: next,
    review: {
      applied,
      certainty,
      summary: payload.summary,
      citedUrlChanged,
      colorsChanged,
      reason: applied ? undefined : "No changes needed",
    },
  };
}

function looksLikeHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Focused recovery when the draft has no usable citation after the main review.
 * Returns a candidate URL when OpenAI is at least medium-certain.
 */
export async function suggestCitationUrlWithOpenAI(
  draft: SchemeLookupDraft,
  query: string,
  notes?: string,
): Promise<{ url?: string; summary?: string; skipped?: boolean; reason?: string }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return { skipped: true, reason: "OPENAI_API_KEY not configured" };
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4.1";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "citation_suggest",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              certainty: { type: "string", enum: ["high", "medium", "low"] },
              url: { type: ["string", "null"] },
              summary: { type: "string" },
            },
            required: ["certainty", "url", "summary"],
          },
        },
      },
      messages: [
        {
          role: "system",
          content: `You find a single public reference URL for a specific aircraft/vehicle paint scheme.
Return one http(s) URL whose path/slug names THIS subject (e.g. consolidated-b-24d-liberator for a B-24 Liberator named Strawberry Bitch).
Prefer museum fact sheets, Cybermodeler, IPMS, or warbird registries.
Never return a URL for a different aircraft type. If unsure, set url to null and certainty to low.`,
        },
        {
          role: "user",
          content: [
            `Request: ${query.trim()}`,
            notes?.trim() ? `Notes: ${notes.trim()}` : null,
            `Model: ${draft.modelName}`,
            `Scheme: ${draft.schemeName}`,
            draft.operator ? `Operator: ${draft.operator}` : null,
            draft.aliases?.length ? `Aliases: ${draft.aliases.join(", ")}` : null,
            "Return the best exact public page URL for this subject, or null.",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.warn("OpenAI citation suggest failed", res.status, body.slice(0, 200));
    return { reason: `OpenAI citation suggest failed (${res.status})` };
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) return { reason: "Empty citation suggest response" };

  try {
    const payload = JSON.parse(raw) as {
      certainty?: string;
      url?: string | null;
      summary?: string;
    };
    const certainty = payload.certainty;
    const url = typeof payload.url === "string" ? payload.url.trim() : "";
    if (
      (certainty === "high" || certainty === "medium") &&
      url &&
      looksLikeHttpUrl(url)
    ) {
      return { url, summary: payload.summary };
    }
    return { reason: payload.summary || "No confident citation URL" };
  } catch {
    return { reason: "Invalid citation suggest JSON" };
  }
}

function normalizeReviewColors(
  colors: NonNullable<ReviewPayload["colors"]>,
): SchemeColorCallout[] {
  return colors
    .map((row) => {
      const role = row?.role?.trim();
      if (!role) return null;
      const fs = row.fs ? String(row.fs).replace(/\D/g, "").slice(0, 5) || undefined : undefined;
      const out: SchemeColorCallout = { role };
      if (fs) out.fs = fs;
      if (row.standardName) out.standardName = row.standardName;
      if (row.tamiya) out.tamiya = row.tamiya;
      if (row.vallejo) out.vallejo = row.vallejo;
      if (row.mrColor) out.mrColor = row.mrColor;
      if (row.notes) out.notes = row.notes;
      return sanitizeCalloutBrandCodes(out, resolveCalloutPaint);
    })
    .filter(Boolean) as SchemeColorCallout[];
}
