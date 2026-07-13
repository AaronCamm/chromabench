import type { ModelCategory, ModelSubject, PaintScheme } from "./types";
import { MODELS } from "./catalog";

export type { ModelCategory, ModelSubject, PaintScheme, SchemeColorCallout, SchemeSource } from "./types";
export { MODELS };

export function modelById(id: string): ModelSubject | undefined {
  return MODELS.find((m) => m.id === id);
}

export function schemeById(
  modelId: string,
  schemeId: string,
): { model: ModelSubject; scheme: PaintScheme } | undefined {
  const model = modelById(modelId);
  if (!model) return undefined;
  const scheme = model.schemes.find((s) => s.id === schemeId);
  if (!scheme) return undefined;
  return { model, scheme };
}

export type ModelSearchResult = {
  model: ModelSubject;
  matchedSchemes: PaintScheme[];
  score: number;
};

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[\s,/+-]+/)
    .filter((t) => t.length > 0);
}

function matchesTokens(haystack: string, tokens: string[]): number {
  const lower = haystack.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (lower.includes(t)) score += t.length;
  }
  return score;
}

export function searchModels(query: string, category?: ModelCategory | "all"): ModelSearchResult[] {
  const tokens = tokenize(query.trim());
  const results: ModelSearchResult[] = [];

  for (const model of MODELS) {
    if (category && category !== "all" && model.category !== category) continue;

    const baseHaystack = [model.name, model.era ?? "", ...model.aliases].join(" ");
    const matchedSchemes: PaintScheme[] = [];
    let score = tokens.length === 0 ? 1 : matchesTokens(baseHaystack, tokens);

    for (const scheme of model.schemes) {
      const schemeHaystack = [
        scheme.name,
        scheme.operator ?? "",
        scheme.unit ?? "",
        scheme.year ?? "",
        scheme.buno ?? "",
        ...scheme.colors.map((c) => [c.role, c.fs ?? "", c.standardName ?? ""].join(" ")),
      ].join(" ");
      const schemeScore = tokens.length === 0 ? 0 : matchesTokens(schemeHaystack, tokens);
      if (schemeScore > 0 || tokens.length === 0) {
        matchedSchemes.push(scheme);
        score += schemeScore;
      }
    }

    if (tokens.length === 0 || score > 0) {
      results.push({
        model,
        matchedSchemes: matchedSchemes.length ? matchedSchemes : model.schemes,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score || a.model.name.localeCompare(b.model.name));
}

export function totalSchemeCount(): number {
  return MODELS.reduce((n, m) => n + m.schemes.length, 0);
}
