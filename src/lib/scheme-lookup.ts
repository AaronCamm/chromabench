import type { ModelCategory, SchemeColorCallout, SchemeSource } from "@/data/models/types";
import { resolveCalloutPaint } from "@/lib/fs-paints";
import { sanitizeCalloutBrandCodes } from "@/lib/equivalents";

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
- Respond with JSON only matching the schema.`;

export async function lookupSchemeWithClaude(
  query: string,
  notes?: string,
): Promise<SchemeLookupDraft> {
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
              citedUrl: { type: "string" },
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

  return normalizeDraft(tool.input);
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
    citedUrl: typeof input.citedUrl === "string" ? input.citedUrl : undefined,
  };
}

export function draftSources(draft: SchemeLookupDraft): SchemeSource[] {
  const sources: SchemeSource[] = [{ label: "User Added" }];
  if (draft.citedUrl) {
    sources.push({ label: "Cited reference", url: draft.citedUrl });
  }
  return sources;
}
