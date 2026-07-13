import { useMemo, useState } from "react";
import { PAINTS, BRANDS, type Paint } from "@/data/paints";
import { contrastText, deltaE, hexToLab, mixHex } from "@/lib/color";
import { Search, Plus, X, ArrowRight, Beaker, Target, Shuffle, Heart, Plane } from "lucide-react";
import { FavouriteButton, FavouritesPanel } from "@/components/FavouritesPanel";
import { ModelsPanel } from "@/components/ModelsPanel";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

type Tab = "equivalents" | "mixer" | "recipe" | "models" | "favourites";
type MixEntry = { paint: Paint; parts: number };

export function PaintConverter() {
  const [tab, setTab] = useState<Tab>("equivalents");
  const [mixerSeed, setMixerSeed] = useState<MixEntry[] | null>(null);
  const [mixerKey, setMixerKey] = useState(0);
  const [equivSeed, setEquivSeed] = useState<Paint | null>(null);
  const [equivKey, setEquivKey] = useState(0);
  const [recipeSeed, setRecipeSeed] = useState<Paint | null>(null);
  const [recipeKey, setRecipeKey] = useState(0);
  const [modelsFocus, setModelsFocus] = useState<{ modelId: string; schemeId: string } | null>(
    null,
  );

  const loadMixer = (entries: MixEntry[]) => {
    setMixerSeed(entries);
    setMixerKey((k) => k + 1);
    setTab("mixer");
  };

  const openEquivalents = (paint: Paint) => {
    setEquivSeed(paint);
    setEquivKey((k) => k + 1);
    setTab("equivalents");
  };

  const openRecipe = (paint: Paint) => {
    setRecipeSeed(paint);
    setRecipeKey((k) => k + 1);
    setTab("recipe");
  };

  const openScheme = (modelId: string, schemeId: string) => {
    setModelsFocus({ modelId, schemeId });
    setTab("models");
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-0 border border-border bg-card overflow-x-auto">
        <TabBtn
          active={tab === "equivalents"}
          onClick={() => setTab("equivalents")}
          icon={<Shuffle className="h-3.5 w-3.5" />}
          label="Equivalents"
          hint="01"
        />
        <TabBtn
          active={tab === "mixer"}
          onClick={() => setTab("mixer")}
          icon={<Beaker className="h-3.5 w-3.5" />}
          label="Mixer"
          hint="02"
        />
        <TabBtn
          active={tab === "recipe"}
          onClick={() => setTab("recipe")}
          icon={<Target className="h-3.5 w-3.5" />}
          label="Recipe finder"
          hint="03"
        />
        <TabBtn
          active={tab === "models"}
          onClick={() => {
            setModelsFocus(null);
            setTab("models");
          }}
          icon={<Plane className="h-3.5 w-3.5" />}
          label="Models (Beta)"
          hint="04"
        />
        <TabBtn
          active={tab === "favourites"}
          onClick={() => setTab("favourites")}
          icon={<Heart className="h-3.5 w-3.5" />}
          label="Favourites"
          hint="05"
        />
      </div>
      <div className="border border-t-0 border-border bg-card">
        {tab === "equivalents" && (
          <EquivalentsPanel key={equivKey} initialSource={equivSeed ?? undefined} />
        )}
        {tab === "mixer" && <MixerPanel key={mixerKey} initialEntries={mixerSeed ?? undefined} />}
        {tab === "recipe" && (
          <RecipePanel key={recipeKey} initialTarget={recipeSeed ?? undefined} onLoadMixer={loadMixer} />
        )}
        {tab === "models" && (
          <ModelsPanel
            key={modelsFocus ? `${modelsFocus.modelId}-${modelsFocus.schemeId}` : "browse"}
            initialModelId={modelsFocus?.modelId}
            initialSchemeId={modelsFocus?.schemeId}
            onOpenEquivalents={openEquivalents}
            onOpenRecipe={openRecipe}
          />
        )}
        {tab === "favourites" && (
          <FavouritesPanel onLoadMixer={loadMixer} onOpenScheme={openScheme} />
        )}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex-1 min-w-[7.5rem] flex items-center justify-between gap-3 px-5 py-4 text-left border-r border-border last:border-r-0 transition-colors ${
        active ? "bg-foreground text-background" : "hover:bg-surface"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{label}</span>
      </span>
      <span className={`mono text-[10px] ${active ? "opacity-60" : "text-muted-foreground"}`}>
        {hint}
      </span>
    </button>
  );
}

/* ─────────── Paint picker ─────────── */

function PaintPicker({
  value,
  onChange,
  placeholder = "Search paint by name, code, or brand…",
}: {
  value: Paint | null;
  onChange: (p: Paint | null) => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PAINTS.slice(0, 40);
    return PAINTS.filter((p) =>
      (p.name + " " + p.code + " " + p.brand + " " + p.line).toLowerCase().includes(s),
    ).slice(0, 60);
  }, [q]);

  if (value) {
    return (
      <div className="flex items-stretch border border-border bg-background">
        <div className="w-14 shrink-0" style={{ backgroundColor: value.hex }} />
        <div className="flex-1 px-3 py-2 min-w-0">
          <div className="mono text-[10px] text-muted-foreground uppercase tracking-widest truncate">
            {value.brand} · {value.line} · {value.code}
          </div>
          <div className="text-sm font-semibold truncate">{value.name}</div>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="px-3 border-l border-border hover:bg-surface"
          aria-label="Clear paint"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center border border-border bg-background">
        <Search className="h-4 w-4 ml-3 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-80 w-full overflow-auto border border-border bg-popover shadow-lg">
          {results.map((p) => (
            <button
              key={p.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(p);
                setQ("");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-surface"
            >
              <span
                className="h-6 w-6 shrink-0 border border-border"
                style={{ backgroundColor: p.hex }}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{p.name}</span>
                <span className="mono block text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                  {p.brand} · {p.line} · {p.code}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── Equivalents ─────────── */

function EquivalentsPanel({ initialSource }: { initialSource?: Paint }) {
  const [source, setSource] = useState<Paint | null>(
    initialSource ??
      PAINTS.find((p) => p.name === "Mephiston Red") ??
      null,
  );

  const grouped = useMemo(() => {
    if (!source) return [];
    const srcLab = hexToLab(source.hex);
    const others = PAINTS.filter((p) => p.brand !== source.brand);
    const byBrand = new Map<string, { paint: Paint; dE: number }[]>();
    for (const p of others) {
      const dE = deltaE(srcLab, hexToLab(p.hex));
      const arr = byBrand.get(p.brand) ?? [];
      arr.push({ paint: p, dE });
      byBrand.set(p.brand, arr);
    }
    return BRANDS.filter((b) => byBrand.has(b)).map((brand) => ({
      brand,
      matches: byBrand
        .get(brand)!
        .sort((a, b) => a.dE - b.dE)
        .slice(0, 10),
    }));
  }, [source]);

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <div className="space-y-2">
          <Label num="A" text="Source paint" />
          <PaintPicker value={source} onChange={setSource} />
        </div>
        <div className="hidden md:flex items-center justify-center pb-3 text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <Label num="B" text="Closest cross-brand matches" />
          <div className="border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground">
            Top 10 per brand, ranked by ΔE (CIE76). Lower is closer.
          </div>
        </div>
      </div>

      {source && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {grouped.map(({ brand, matches }) => (
            <div key={brand} className="border border-border">
              <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-2">
                <span className="mono text-[10px] uppercase tracking-widest">{brand}</span>
                <span className="mono text-[10px] text-muted-foreground">
                  {matches.length} match{matches.length === 1 ? "" : "es"}
                </span>
              </div>
              <ul>
                {matches.map(({ paint, dE }) => (
                  <li
                    key={paint.id}
                    className="flex items-stretch border-b border-border last:border-b-0"
                  >
                    <div className="w-10 shrink-0" style={{ backgroundColor: paint.hex }} />
                    <div className="flex-1 min-w-0 px-3 py-2">
                      <div className="text-sm font-medium truncate">{paint.name}</div>
                      <div className="mono text-[10px] text-muted-foreground truncate">
                        {paint.line} · {paint.code}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center pr-3 pl-2">
                      <span className="mono text-[10px] text-muted-foreground">ΔE</span>
                      <span
                        className={`mono text-sm font-semibold ${dE < 3 ? "text-foreground" : dE < 7 ? "text-foreground/80" : "text-muted-foreground"}`}
                      >
                        {dE.toFixed(1)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── Mixer ─────────── */

function MixerPanel({ initialEntries }: { initialEntries?: MixEntry[] }) {
  const { saveFavourite, hasAccess, configured } = useAuth();
  const [entries, setEntries] = useState<MixEntry[]>(
    initialEntries ??
      [
        { paint: PAINTS.find((p) => p.brand === "Tamiya" && p.code === "X-7")!, parts: 2 },
        { paint: PAINTS.find((p) => p.brand === "Tamiya" && p.code === "X-2")!, parts: 1 },
      ].filter((e) => e.paint),
  );

  const mixed = useMemo(() => {
    if (entries.length === 0) return null;
    return mixHex(entries.map((e) => ({ hex: e.paint.hex, parts: e.parts })));
  }, [entries]);

  const closest = useMemo(() => {
    if (!mixed) return [];
    const lab = hexToLab(mixed);
    return PAINTS.map((p) => ({ p, dE: deltaE(lab, hexToLab(p.hex)) }))
      .sort((a, b) => a.dE - b.dE)
      .slice(0, 10);
  }, [mixed]);

  return (
    <div className="p-5 md:p-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label num="A" text="Recipe" />
          <FavouriteButton
            disabled={!configured || !hasAccess || entries.length === 0 || !mixed}
            onSave={async () => {
              const res = await saveFavourite({
                kind: "mixer",
                title: entries.map((e) => `${e.parts}× ${e.paint.code}`).join(" + "),
                payload: {
                  paints: entries.map((e) => ({ id: e.paint.id, parts: e.parts })),
                  hex: mixed ?? undefined,
                },
              });
              if (res.error) toast.error(res.error);
              else toast.success("Recipe saved to favourites");
            }}
          />
        </div>
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-stretch gap-2">
              <div className="flex-1 min-w-0">
                <PaintPicker
                  value={e.paint}
                  onChange={(p) => {
                    if (!p) setEntries(entries.filter((_, j) => j !== i));
                    else setEntries(entries.map((x, j) => (j === i ? { ...x, paint: p } : x)));
                  }}
                />
              </div>
              <div className="flex items-stretch border border-border bg-background">
                <button
                  type="button"
                  className="px-2 hover:bg-surface"
                  onClick={() =>
                    setEntries(
                      entries.map((x, j) =>
                        j === i ? { ...x, parts: Math.max(1, x.parts - 1) } : x,
                      ),
                    )
                  }
                >
                  −
                </button>
                <div className="w-10 flex items-center justify-center mono text-sm font-semibold border-x border-border">
                  {e.parts}
                </div>
                <button
                  type="button"
                  className="px-2 hover:bg-surface"
                  onClick={() =>
                    setEntries(entries.map((x, j) => (j === i ? { ...x, parts: x.parts + 1 } : x)))
                  }
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => setEntries(entries.filter((_, j) => j !== i))}
                className="border border-border px-2 hover:bg-surface"
                aria-label="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <AddPaintRow onAdd={(p) => setEntries([...entries, { paint: p, parts: 1 }])} />
        </div>
        <p className="mono text-[10px] text-muted-foreground">
          Parts are volumetric. Colors blend in linear sRGB — a physical approximation, not perfect
          pigment chemistry.
        </p>
      </div>

      <div className="space-y-4">
        <Label num="B" text="Result" />
        {mixed ? (
          <>
            <div className="border border-border">
              <div
                className="aspect-[16/9] flex items-end justify-between p-4"
                style={{ backgroundColor: mixed, color: contrastText(mixed) }}
              >
                <span className="mono text-[10px] uppercase tracking-widest opacity-70">Mixed</span>
                <span className="mono text-sm font-semibold uppercase">{mixed}</span>
              </div>
              <RecipeSummary entries={entries} />
            </div>

            <div className="space-y-2">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Closest single-paint equivalents
              </div>
              <ul className="border border-border">
                {closest.map(({ p, dE }) => (
                  <li
                    key={p.id}
                    className="flex items-stretch border-b border-border last:border-b-0"
                  >
                    <div className="w-8 shrink-0" style={{ backgroundColor: p.hex }} />
                    <div className="flex-1 min-w-0 px-3 py-1.5">
                      <div className="text-xs font-medium truncate">{p.name}</div>
                      <div className="mono text-[10px] text-muted-foreground truncate">
                        {p.brand} · {p.code}
                      </div>
                    </div>
                    <div className="flex items-center pr-3 mono text-xs font-semibold">
                      {dE.toFixed(1)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="border border-dashed border-border p-6 text-sm text-muted-foreground">
            Add at least one paint to see the mix.
          </div>
        )}
      </div>
    </div>
  );
}

function RecipeSummary({ entries }: { entries: MixEntry[] }) {
  const total = entries.reduce((s, e) => s + e.parts, 0) || 1;
  return (
    <ul className="divide-y divide-border">
      {entries.map((e, i) => (
        <li key={i} className="flex items-center gap-3 px-3 py-2">
          <span
            className="h-4 w-4 shrink-0 border border-border"
            style={{ backgroundColor: e.paint.hex }}
          />
          <span className="mono text-[10px] text-muted-foreground w-10">
            {Math.round((e.parts / total) * 100)}%
          </span>
          <span className="mono text-xs font-semibold w-6">{e.parts}×</span>
          <span className="text-xs truncate flex-1">
            {e.paint.brand} {e.paint.code} · {e.paint.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AddPaintRow({ onAdd }: { onAdd: (p: Paint) => void }) {
  const [adding, setAdding] = useState(false);
  if (!adding) {
    return (
      <button
        type="button"
        onClick={() => setAdding(true)}
        className="flex w-full items-center gap-2 border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
      >
        <Plus className="h-4 w-4" /> Add paint
      </button>
    );
  }
  return (
    <PaintPicker
      value={null}
      onChange={(p) => {
        if (p) onAdd(p);
        setAdding(false);
      }}
    />
  );
}

/* ─────────── Recipe finder ─────────── */

function RecipePanel({
  initialTarget,
  onLoadMixer,
}: {
  initialTarget?: Paint;
  onLoadMixer: (entries: MixEntry[]) => void;
}) {
  const { saveFavourite, hasAccess, configured } = useAuth();
  const [target, setTarget] = useState<Paint | null>(
    initialTarget ??
      PAINTS.find((p) => p.name === "Mephiston Red") ??
      null,
  );
  const [brand, setBrand] = useState<string>("Tamiya");

  const results = useMemo(() => {
    if (!target) return [];
    const targetLab = hexToLab(target.hex);
    const pool = PAINTS.filter((p) => p.brand === brand);
    const labs = pool.map((p) => hexToLab(p.hex));
    const ratios: [number, number][] = [
      [1, 1],
      [2, 1],
      [1, 2],
      [3, 1],
      [1, 3],
      [3, 2],
      [2, 3],
    ];
    type Row = { a: Paint; b: Paint; ra: number; rb: number; hex: string; dE: number };
    const TOP = 10;
    const best: Row[] = [];
    const consider = (row: Row) => {
      if (best.length < TOP) {
        best.push(row);
        best.sort((x, y) => x.dE - y.dE);
        return;
      }
      if (row.dE >= best[TOP - 1].dE) return;
      best[TOP - 1] = row;
      best.sort((x, y) => x.dE - y.dE);
    };
    for (let i = 0; i < pool.length; i++) {
      const a = pool[i];
      consider({ a, b: a, ra: 1, rb: 0, hex: a.hex, dE: deltaE(targetLab, labs[i]) });
      for (let j = i + 1; j < pool.length; j++) {
        const b = pool[j];
        for (const [ra, rb] of ratios) {
          const hex = mixHex([
            { hex: a.hex, parts: ra },
            { hex: b.hex, parts: rb },
          ]);
          consider({ a, b, ra, rb, hex, dE: deltaE(targetLab, hexToLab(hex)) });
        }
      }
    }
    return best;
  }, [target, brand]);

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="space-y-2">
          <Label num="A" text="Target color" />
          <PaintPicker value={target} onChange={setTarget} />
        </div>
        <div className="space-y-2">
          <Label num="B" text="Mix using brand" />
          <div className="flex flex-wrap gap-1 border border-border p-1 bg-background">
            {BRANDS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBrand(b)}
                className={`mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 ${
                  brand === b ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {target && (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((r, i) => (
            <div key={i} className="border border-border">
              <div className="flex">
                <div
                  className="w-20 flex items-center justify-center mono text-[10px]"
                  style={{ backgroundColor: target.hex, color: contrastText(target.hex) }}
                >
                  target
                </div>
                <div
                  className="flex-1 flex items-end justify-between p-3"
                  style={{ backgroundColor: r.hex, color: contrastText(r.hex) }}
                >
                  <span className="mono text-[10px] uppercase tracking-widest opacity-70">mix</span>
                  <span className="mono text-xs font-semibold">ΔE {r.dE.toFixed(1)}</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center gap-3 px-3 py-2">
                  <span
                    className="h-4 w-4 shrink-0 border border-border"
                    style={{ backgroundColor: r.a.hex }}
                  />
                  <span className="mono text-xs font-semibold w-8">{r.ra}×</span>
                  <span className="text-xs truncate">
                    {r.a.code} · {r.a.name}
                  </span>
                </div>
                {r.rb > 0 && (
                  <div className="flex items-center gap-3 px-3 py-2">
                    <span
                      className="h-4 w-4 shrink-0 border border-border"
                      style={{ backgroundColor: r.b.hex }}
                    />
                    <span className="mono text-xs font-semibold w-8">{r.rb}×</span>
                    <span className="text-xs truncate">
                      {r.b.code} · {r.b.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    const entries: MixEntry[] = [{ paint: r.a, parts: r.ra }];
                    if (r.rb > 0) entries.push({ paint: r.b, parts: r.rb });
                    onLoadMixer(entries);
                  }}
                  className="flex-1 mono text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-surface"
                >
                  Open in mixer
                </button>
                <FavouriteButton
                  disabled={!configured || !hasAccess}
                  onSave={async () => {
                    const paints = [{ id: r.a.id, parts: r.ra }];
                    if (r.rb > 0) paints.push({ id: r.b.id, parts: r.rb });
                    const res = await saveFavourite({
                      kind: "finder",
                      title: `${r.ra}× ${r.a.code}${r.rb > 0 ? ` + ${r.rb}× ${r.b.code}` : ""}`,
                      payload: {
                        paints,
                        hex: r.hex,
                        dE: r.dE,
                        brand,
                        targetPaintId: target.id,
                      },
                    });
                    if (res.error) toast.error(res.error);
                    else toast.success("Recipe saved to favourites");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── shared ─────────── */

function Label({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-1.5 py-0.5">
        {num}
      </span>
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {text}
      </span>
    </div>
  );
}
