import { useMemo, useState } from "react";
import { Heart, Trash2, Plane } from "lucide-react";
import { paintById, type Paint } from "@/data/paints";
import { schemeById } from "@/data/models";
import { resolveCalloutPaint, hexForFs } from "@/lib/fs-paints";
import { contrastText } from "@/lib/color";
import { isRecipeFavourite, isSchemeFavourite, type FavouriteRecipe } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";

export function FavouritesPanel({
  onLoadMixer,
  onOpenScheme,
}: {
  onLoadMixer: (entries: { paint: Paint; parts: number }[]) => void;
  onOpenScheme: (modelId: string, schemeId: string) => void;
}) {
  const { favourites, deleteFavourite, hasAccess, configured } = useAuth();

  const vehicleFavs = useMemo(
    () => favourites.filter(isSchemeFavourite),
    [favourites],
  );
  const colourFavs = useMemo(
    () => favourites.filter(isRecipeFavourite),
    [favourites],
  );

  if (!hasAccess) {
    return (
      <div className="p-5 md:p-8 text-sm text-muted-foreground">
        {configured
          ? "Sign in and start a trial to save favourites."
          : "Configure Supabase to enable favourites."}
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="p-5 md:p-8 text-sm text-muted-foreground">
        No favourites yet. Heart a mixer recipe, recipe-finder result, or vehicle scheme to save it
        here.
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 space-y-10">
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Vehicles</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Saved model schemes from Models (Beta).
          </p>
        </div>
        {vehicleFavs.length === 0 ? (
          <p className="text-sm text-muted-foreground border border-dashed border-border p-4">
            No vehicle favourites yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {vehicleFavs.map((fav) => (
              <SchemeFavouriteCard
                key={fav.id}
                fav={fav}
                onOpen={() =>
                  onOpenScheme(fav.payload.modelId, fav.payload.schemeId)
                }
                onDelete={() => deleteFavourite(fav.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Colours & recipes</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Saved mixer and recipe-finder results.
          </p>
        </div>
        {colourFavs.length === 0 ? (
          <p className="text-sm text-muted-foreground border border-dashed border-border p-4">
            No colour favourites yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {colourFavs.map((fav) => (
              <RecipeFavouriteCard
                key={fav.id}
                fav={fav}
                onLoad={() => {
                  const entries = fav.payload.paints
                    .map((p) => {
                      const paint = paintById(p.id);
                      if (!paint) return null;
                      return { paint, parts: p.parts };
                    })
                    .filter(Boolean) as { paint: Paint; parts: number }[];
                  if (entries.length) onLoadMixer(entries);
                }}
                onDelete={() => deleteFavourite(fav.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SchemeFavouriteCard({
  fav,
  onOpen,
  onDelete,
}: {
  fav: FavouriteRecipe & { kind: "scheme" };
  onOpen: () => void;
  onDelete: () => void;
}) {
  const resolved = schemeById(fav.payload.modelId, fav.payload.schemeId);
  const title = fav.title ?? resolved?.scheme.name ?? "Saved vehicle";
  const subtitle = resolved?.model.name ?? fav.payload.modelId;

  const swatches =
    resolved?.scheme.colors.slice(0, 8).map((c) => {
      const paint = resolveCalloutPaint(c);
      return paint?.hex ?? (c.fs ? hexForFs(c.fs) : undefined) ?? "#888";
    }) ?? ["#888"];

  return (
    <div className="border border-border">
      <div className="flex h-10 overflow-hidden border-b border-border">
        {swatches.map((hex, i) => (
          <span key={i} className="flex-1" style={{ backgroundColor: hex }} />
        ))}
      </div>
      <div className="px-3 py-3 flex items-start gap-2">
        <Plane className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground truncate">
            {subtitle}
          </div>
        </div>
      </div>
      <div className="flex border-t border-border">
        <button
          type="button"
          onClick={onOpen}
          className="flex-1 mono text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-surface"
        >
          Open scheme
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="border-l border-border px-3 py-2 hover:bg-surface text-muted-foreground"
          aria-label="Delete favourite"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function RecipeFavouriteCard({
  fav,
  onLoad,
  onDelete,
}: {
  fav: FavouriteRecipe & { kind: "mixer" | "finder" };
  onLoad: () => void;
  onDelete: () => void;
}) {
  const paints = useMemo(
    () =>
      fav.payload.paints
        .map((p) => ({ paint: paintById(p.id), parts: p.parts }))
        .filter((x): x is { paint: Paint; parts: number } => Boolean(x.paint)),
    [fav.payload.paints],
  );

  const hex = fav.payload.hex ?? paints[0]?.paint.hex ?? "#888888";
  const title =
    fav.title ?? paints.map((p) => `${p.parts}× ${p.paint.code}`).join(" + ") ?? "Saved recipe";

  return (
    <div className="border border-border">
      <div
        className="flex items-end justify-between p-3"
        style={{ backgroundColor: hex, color: contrastText(hex) }}
      >
        <span className="mono text-[10px] uppercase tracking-widest opacity-70">
          {fav.kind}
          {fav.payload.dE != null ? ` · ΔE ${fav.payload.dE.toFixed(1)}` : ""}
        </span>
        <span className="mono text-xs font-semibold uppercase">{hex}</span>
      </div>
      <div className="px-3 py-2 text-sm font-medium truncate">{title}</div>
      <ul className="divide-y divide-border border-t border-border">
        {paints.map((p) => (
          <li key={p.paint.id} className="flex items-center gap-3 px-3 py-1.5">
            <span
              className="h-3.5 w-3.5 border border-border"
              style={{ backgroundColor: p.paint.hex }}
            />
            <span className="mono text-xs font-semibold w-6">{p.parts}×</span>
            <span className="text-xs truncate">
              {p.paint.brand} {p.paint.code} · {p.paint.name}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex border-t border-border">
        <button
          type="button"
          onClick={onLoad}
          className="flex-1 mono text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-surface"
        >
          Load in mixer
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="border-l border-border px-3 py-2 hover:bg-surface text-muted-foreground"
          aria-label="Delete favourite"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function FavouriteButton({
  disabled,
  onSave,
}: {
  disabled?: boolean;
  onSave: () => Promise<void> | void;
}) {
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled || busy}
      onClick={async () => {
        setBusy(true);
        try {
          await onSave();
          setSaved(true);
          setTimeout(() => setSaved(false), 1500);
        } finally {
          setBusy(false);
        }
      }}
      className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 mono text-[10px] uppercase tracking-widest hover:bg-surface disabled:opacity-40"
      title="Save favourite"
    >
      <Heart className={`h-3.5 w-3.5 ${saved ? "fill-foreground" : ""}`} />
      {saved ? "Saved" : busy ? "Saving…" : "Favourite"}
    </button>
  );
}
