import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import type { ModelCategory, ModelSubject, PaintScheme, SchemeColorCallout, SchemeSource } from "@/data/models/types";

type CommunityModelRow = {
  id: string;
  name: string;
  category: ModelCategory;
  aliases: string[] | null;
};

type CommunitySchemeRow = {
  id: string;
  model_id: string;
  name: string;
  operator: string | null;
  unit: string | null;
  year: string | null;
  buno: string | null;
  colors: SchemeColorCallout[] | null;
  sources: SchemeSource[] | null;
  image_url: string | null;
  image_credit: string | null;
};

/** Fetch public community models+schemes (authenticated read). */
export async function fetchCommunityModels(): Promise<ModelSubject[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseBrowserClient();
  const [{ data: models, error: modelError }, { data: schemes, error: schemeError }] =
    await Promise.all([
      supabase.from("community_models").select("id, name, category, aliases"),
      supabase
        .from("community_schemes")
        .select(
          "id, model_id, name, operator, unit, year, buno, colors, sources, image_url, image_credit",
        ),
    ]);

  if (modelError || schemeError || !models) {
    console.warn("community models fetch failed", modelError ?? schemeError);
    return [];
  }

  const byModel = new Map<string, PaintScheme[]>();
  for (const row of (schemes ?? []) as CommunitySchemeRow[]) {
    const scheme: PaintScheme = {
      id: row.id,
      name: row.name,
      operator: row.operator ?? undefined,
      unit: row.unit ?? undefined,
      year: row.year ?? undefined,
      buno: row.buno ?? undefined,
      colors: Array.isArray(row.colors) ? row.colors : [],
      sources: Array.isArray(row.sources) && row.sources.length > 0
        ? row.sources
        : [{ label: "User Added" }],
      imageUrl: row.image_url ?? undefined,
      imageCredit: row.image_credit ?? undefined,
    };
    const list = byModel.get(row.model_id) ?? [];
    list.push(scheme);
    byModel.set(row.model_id, list);
  }

  return (models as CommunityModelRow[]).map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    aliases: m.aliases ?? [],
    schemes: byModel.get(m.id) ?? [],
  }));
}
