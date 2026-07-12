import { useMemo, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { paintById, type Paint } from "@/data/paints";
import { contrastText } from "@/lib/color";
import type { FavouriteRecipe } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";

export function FavouritesPanel({
  onLoadMixer,
}: {
  onLoadMixer: (entries: { paint: Paint; parts: number }[]) => void;
}) {
  const { favourites, deleteFavourite, hasAccess, configured } = useAuth();

  if (!hasAccess) {
    return (
      <div className="p-5 md:p-8 text-sm text-muted-foreground">
        {configured
          ? "Sign in and start a trial to save and reopen mix recipes."
          : "Configure Supabase to enable favourites."}
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="p-5 md:p-8 text-sm text-muted-foreground">
        No favourites yet. Heart a mixer recipe or recipe-finder result to save it here.
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 grid gap-3 md:grid-cols-2">
      {favourites.map((fav) => (
        <FavouriteCard
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
  );
}

function FavouriteCard({
  fav,
  onLoad,
  onDelete,
}: {
  fav: FavouriteRecipe;
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
