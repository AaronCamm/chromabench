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
  citedUrl?: string;
  replaceColors: boolean;
  colors?: Array<{
    role: string;
    fs?: string;
    standardName?: string;
    tamiya?: string;
    vallejo?: string;
    mrColor?: string;
    notes?: string;
  }>;
};

const REVIEW_SYSTEM = `You are a second-opinion fact checker for Chromabench scale-modelling paint schemes.

You receive a user request and a draft scheme produced by another model. Your job is to correct
clear mistakes when you are certain — especially wrong citation URLs.

Rules:
- citedUrlAction:
  - "keep" if the URL is about THIS specific aircraft/scheme (slug/title must match).
  - "replace" if you know the correct public URL with high confidence (e.g. same museum site,
    wrong fact-sheet ID). Put the corrected URL in citedUrl. The path/slug must name this aircraft.
  - "clear" if the URL is wrong/unknown and you do not know a correct replacement.
- Never invent URL paths. Only replace when you are sure of the exact correct page.
- replaceColors: true only when you are certain specific FS/brand callouts are wrong and you know
  the correct ones. Otherwise false and omit colors.
- Brand codes for the same role must be colour-equivalents (e.g. XF-23 with C20, never C367).
- certainty "high" only when you would bet on the correction. Use "medium"/"low" if unsure —
  the app only auto-applies high-certainty changes.
- Respond with JSON matching the schema.`;

/**
 * Second-pass review (OpenAI). When certainty is high, may replace citedUrl and/or colours.
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
    "Correct clear errors. Prefer fixing citedUrl when the draft linked a different aircraft on the same site.",
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

  // Only auto-apply high-certainty corrections
  if (certainty !== "high") {
    return {
      draft,
      review: {
        applied: false,
        certainty,
        summary: payload.summary,
        reason: "Review not applied (certainty below high)",
      },
    };
  }

  const next: SchemeLookupDraft = { ...draft };
  let citedUrlChanged = false;
  let colorsChanged = false;

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

  if (payload.replaceColors && Array.isArray(payload.colors) && payload.colors.length > 0) {
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
      reason: applied ? undefined : "High certainty but no changes needed",
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

function normalizeReviewColors(
  colors: NonNullable<ReviewPayload["colors"]>,
): SchemeColorCallout[] {
  return colors
    .map((row) => {
      const role = row.role?.trim();
      if (!role) return null;
      const fs = row.fs ? row.fs.replace(/\D/g, "").slice(0, 5) || undefined : undefined;
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
