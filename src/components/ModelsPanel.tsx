import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Plane, Search, Truck, ChevronLeft } from "lucide-react";
import {
  searchModels,
  modelById,
  schemeById,
  type ModelCategory,
  type ModelSubject,
  type PaintScheme,
  totalSchemeCount,
} from "@/data/models";
import { resolveCalloutPaint, hexForFs, paintsForFs } from "@/lib/fs-paints";
import type { Paint } from "@/data/paints";
import { FavouriteButton } from "@/components/FavouritesPanel";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/contexts/auth-context";
import { fetchCommunityModels } from "@/lib/community-models";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { SchemeLookupDraft } from "@/lib/scheme-lookup";
import { toast } from "sonner";

type ModelsPanelProps = {
  initialModelId?: string | null;
  initialSchemeId?: string | null;
  onFocusChange?: (focus: { modelId: string; schemeId: string | null } | null) => void;
  onOpenEquivalents: (paint: Paint) => void;
  onOpenRecipe: (paint: Paint) => void;
};

type RequestStep = "idle" | "form" | "loading" | "preview";

export function ModelsPanel({
  initialModelId,
  initialSchemeId,
  onFocusChange,
  onOpenEquivalents,
  onOpenRecipe,
}: ModelsPanelProps) {
  const { session, hasAccess, configured } = useAuth();
  const signedInUser = Boolean(session?.user);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ModelCategory | "all">("all");
  const [community, setCommunity] = useState<ModelSubject[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(initialModelId ?? null);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(initialSchemeId ?? null);
  const [requestStep, setRequestStep] = useState<RequestStep>("idle");
  const [requestQuery, setRequestQuery] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [draft, setDraft] = useState<SchemeLookupDraft | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [busyConfirm, setBusyConfirm] = useState(false);

  // Deep-link from Favourites (or restore) while panel stays mounted across tabs
  useEffect(() => {
    if (!initialModelId) return;
    setSelectedModelId(initialModelId);
    setSelectedSchemeId(initialSchemeId ?? null);
    setRequestStep("idle");
  }, [initialModelId, initialSchemeId]);

  useEffect(() => {
    if (!configured || !signedInUser) {
      setCommunity([]);
      return;
    }
    let cancelled = false;
    fetchCommunityModels().then((models) => {
      if (!cancelled) setCommunity(models);
    });
    return () => {
      cancelled = true;
    };
  }, [configured, signedInUser]);

  const results = useMemo(
    () => searchModels(query, category, community),
    [query, category, community],
  );
  const visibleResults = results.slice(0, 10);
  const selectedModel = selectedModelId ? modelById(selectedModelId, community) : null;
  const selectedScheme =
    selectedModel && selectedSchemeId
      ? selectedModel.schemes.find((s) => s.id === selectedSchemeId)
      : null;

  const pickModel = (model: ModelSubject) => {
    const schemeId = model.schemes[0]?.id ?? null;
    setSelectedModelId(model.id);
    setSelectedSchemeId(schemeId);
    setRequestStep("idle");
    onFocusChange?.({ modelId: model.id, schemeId });
  };

  const pickScheme = (scheme: PaintScheme) => {
    setSelectedSchemeId(scheme.id);
    if (selectedModelId) onFocusChange?.({ modelId: selectedModelId, schemeId: scheme.id });
  };

  const clearSelection = () => {
    setSelectedModelId(null);
    setSelectedSchemeId(null);
    onFocusChange?.(null);
  };

  const startRequest = () => {
    if (!signedInUser) {
      setAuthOpen(true);
      return;
    }
    if (!hasAccess) {
      toast.error("Start a trial to request missing models");
      return;
    }
    setRequestQuery(query.trim());
    setRequestNotes("");
    setDraft(null);
    setRequestStep("form");
  };

  const runLookup = async () => {
    const q = requestQuery.trim();
    if (q.length < 2) {
      toast.error("Enter a model or scheme name");
      return;
    }
    setRequestStep("loading");
    try {
      const token =
        session?.access_token ??
        (await getSupabaseBrowserClient().auth.getSession()).data.session?.access_token;
      if (!token) throw new Error("Sign in required");
      const res = await fetch("/api/models/lookup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q, notes: requestNotes.trim() || undefined }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        draft?: SchemeLookupDraft;
        error?: string;
      };
      if (!res.ok || !body.draft) throw new Error(body.error ?? "Lookup failed");
      setDraft(body.draft);
      setRequestStep("preview");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lookup failed");
      setRequestStep("form");
    }
  };

  const confirmDraft = async () => {
    if (!draft) return;
    setBusyConfirm(true);
    try {
      const token =
        session?.access_token ??
        (await getSupabaseBrowserClient().auth.getSession()).data.session?.access_token;
      if (!token) throw new Error("Sign in required");
      const res = await fetch("/api/models/confirm", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft, query: requestQuery.trim() }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        modelId?: string;
        schemeId?: string;
        error?: string;
      };
      if ((!res.ok && res.status !== 409) || !body.modelId || !body.schemeId) {
        throw new Error(body.error ?? "Could not save scheme");
      }
      const refreshed = await fetchCommunityModels();
      setCommunity(refreshed);
      setSelectedModelId(body.modelId);
      setSelectedSchemeId(body.schemeId);
      onFocusChange?.({ modelId: body.modelId, schemeId: body.schemeId });
      setRequestStep("idle");
      setDraft(null);
      setQuery("");
      toast.success(res.status === 409 ? "Scheme already exists — opened it" : "Scheme added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Confirm failed");
    } finally {
      setBusyConfirm(false);
    }
  };

  if (selectedModel && selectedScheme) {
    return (
      <SchemeDetail
        model={selectedModel}
        scheme={selectedScheme}
        onBack={() => {
          setSelectedSchemeId(null);
          if (selectedModelId) onFocusChange?.({ modelId: selectedModelId, schemeId: null });
        }}
        onBackToList={clearSelection}
        onPickScheme={pickScheme}
        onOpenEquivalents={onOpenEquivalents}
        onOpenRecipe={onOpenRecipe}
      />
    );
  }

  if (selectedModel) {
    return (
      <div className="p-5 md:p-8 space-y-6">
        <button
          type="button"
          onClick={clearSelection}
          className="inline-flex items-center gap-2 mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> All models
        </button>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {selectedModel.category}
          </div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{selectedModel.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedModel.schemes.length} colour variation
            {selectedModel.schemes.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="grid gap-2">
          {selectedModel.schemes.map((scheme) => (
            <SchemeListRow
              key={scheme.id}
              scheme={scheme}
              onClick={() => pickScheme(scheme)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Curated reference
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalSchemeCount(community)} schemes across aircraft and vehicles. Sources attributed
            per entry.
          </p>
        </div>
      </div>

      <div className="flex items-center border border-border bg-background">
        <Search className="h-4 w-4 ml-3 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (requestStep !== "idle") setRequestStep("idle");
          }}
          placeholder="Search model, operator, unit, FS number…"
          className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        {(
          [
            ["all", "All"],
            ["aircraft", "Aircraft"],
            ["vehicle", "Vehicles"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setCategory(id)}
            className={`mono text-[11px] uppercase tracking-widest px-3 py-2 border border-border ${
              category === id ? "bg-foreground text-background" : "hover:bg-surface"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-2">
        {visibleResults.map(({ model, matchedSchemes }) => (
          <button
            key={model.id}
            type="button"
            onClick={() => pickModel(model)}
            className="flex items-start gap-3 border border-border p-4 text-left hover:bg-surface transition-colors w-full"
          >
            <span className="mt-0.5 text-muted-foreground">
              {model.category === "vehicle" ? (
                <Truck className="h-4 w-4" />
              ) : (
                <Plane className="h-4 w-4" />
              )}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold tracking-tight">{model.name}</span>
              <span className="mono block text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {matchedSchemes.length} scheme{matchedSchemes.length === 1 ? "" : "s"}
                {model.era ? ` · ${model.era}` : ""}
              </span>
              <span className="mt-2 flex flex-wrap gap-1">
                {matchedSchemes.slice(0, 4).map((s) => (
                  <span
                    key={s.id}
                    className="mono text-[9px] uppercase tracking-wider border border-border px-1.5 py-0.5 text-muted-foreground"
                  >
                    {s.name.length > 28 ? `${s.name.slice(0, 28)}…` : s.name}
                  </span>
                ))}
              </span>
            </span>
          </button>
        ))}
        {results.length > 10 && (
          <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground text-center pt-2">
            Showing 10 of {results.length} — refine your search to find more
          </p>
        )}
        {(results.length === 0 || query.trim() || requestStep !== "idle") && (
          <EmptySearchRequest
            query={query}
            hasResults={results.length > 0}
            step={requestStep}
            requestQuery={requestQuery}
            requestNotes={requestNotes}
            draft={draft}
            busyConfirm={busyConfirm}
            signedIn={signedInUser}
            hasAccess={hasAccess}
            onStartRequest={startRequest}
            onChangeRequestQuery={setRequestQuery}
            onChangeRequestNotes={setRequestNotes}
            onLookup={runLookup}
            onConfirm={confirmDraft}
            onCancel={() => {
              setRequestStep("idle");
              setDraft(null);
            }}
            onBackToForm={() => setRequestStep("form")}
          />
        )}
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}

function EmptySearchRequest({
  query,
  hasResults,
  step,
  requestQuery,
  requestNotes,
  draft,
  busyConfirm,
  signedIn,
  hasAccess,
  onStartRequest,
  onChangeRequestQuery,
  onChangeRequestNotes,
  onLookup,
  onConfirm,
  onCancel,
  onBackToForm,
}: {
  query: string;
  hasResults: boolean;
  step: RequestStep;
  requestQuery: string;
  requestNotes: string;
  draft: SchemeLookupDraft | null;
  busyConfirm: boolean;
  signedIn: boolean;
  hasAccess: boolean;
  onStartRequest: () => void;
  onChangeRequestQuery: (v: string) => void;
  onChangeRequestNotes: (v: string) => void;
  onLookup: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onBackToForm: () => void;
}) {
  if (step === "loading") {
    return (
      <div className="border border-border p-8 text-center space-y-2">
        <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Looking up colours…
        </p>
        <p className="text-sm text-muted-foreground">Researching FS callouts for your request.</p>
      </div>
    );
  }

  if (step === "preview" && draft) {
    return (
      <div className="border border-border p-5 space-y-4">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Preview · confidence {draft.confidence}
          </div>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">{draft.modelName}</h3>
          <p className="text-sm text-muted-foreground">{draft.schemeName}</p>
          {draft.notes && <p className="mt-2 text-sm text-muted-foreground">{draft.notes}</p>}
        </div>
        {draft.colors.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reliable colour callouts found. Try a more specific request (operator, year, or
            scheme name).
          </p>
        ) : (
          <ul className="divide-y divide-border border border-border">
            {draft.colors.map((c, i) => {
              const paint = resolveCalloutPaint(c);
              const hex = paint?.hex ?? (c.fs ? hexForFs(c.fs) : undefined) ?? "#888";
              return (
                <li key={i} className="flex items-center gap-3 px-3 py-2">
                  <span
                    className="h-5 w-5 border border-border shrink-0"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="flex-1 text-sm">{c.role}</span>
                  <span className="mono text-[10px] text-muted-foreground">
                    {c.fs ? `FS ${c.fs}` : "—"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busyConfirm || draft.colors.length === 0}
            onClick={onConfirm}
            className="mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent disabled:opacity-50"
          >
            {busyConfirm ? "Saving…" : "Confirm & add"}
          </button>
          <button
            type="button"
            onClick={onBackToForm}
            className="mono text-[11px] uppercase tracking-widest border border-border px-4 py-2.5 hover:bg-surface"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mono text-[11px] uppercase tracking-widest px-4 py-2.5 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
        <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Source will be recorded as User Added
        </p>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="border border-border p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Request a scheme</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll look up FS colours for you to review before publishing.
          </p>
        </div>
        <label className="block space-y-1.5">
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Model / scheme
          </span>
          <input
            value={requestQuery}
            onChange={(e) => onChangeRequestQuery(e.target.value)}
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none"
            placeholder="e.g. TA-4J VF-127 Adversary"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Notes (optional)
          </span>
          <input
            value={requestNotes}
            onChange={(e) => onChangeRequestNotes(e.target.value)}
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none"
            placeholder="Operator, year, BuNo…"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onLookup}
            className="mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent"
          >
            Look up colours
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mono text-[11px] uppercase tracking-widest border border-border px-4 py-2.5 hover:bg-surface"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border border-dashed border-border text-center space-y-4 ${
        hasResults ? "p-5 mt-2" : "p-8"
      }`}
    >
      <p className="text-sm text-muted-foreground">
        {hasResults
          ? "Not seeing the right scheme?"
          : query.trim()
            ? `No models match “${query.trim()}”.`
            : "No models in this category."}
      </p>
      <button
        type="button"
        onClick={onStartRequest}
        className="mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent"
      >
        {!signedIn ? "Sign in to request" : !hasAccess ? "Start trial to request" : "Request this model"}
      </button>
    </div>
  );
}

function SchemeListRow({ scheme, onClick }: { scheme: PaintScheme; onClick: () => void }) {
  const swatches = scheme.colors.slice(0, 6).map((c) => {
    const paint = resolveCalloutPaint(c);
    return paint?.hex ?? (c.fs ? hexForFs(c.fs) : undefined) ?? "#888";
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 border border-border p-3 text-left hover:bg-surface w-full"
    >
      <div className="flex h-8 w-24 shrink-0 overflow-hidden border border-border">
        {swatches.map((hex, i) => (
          <span key={i} className="flex-1" style={{ backgroundColor: hex }} />
        ))}
      </div>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium truncate">{scheme.name}</span>
        <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest">
          {[scheme.unit, scheme.operator, scheme.year].filter(Boolean).join(" · ")}
        </span>
      </span>
    </button>
  );
}

function SchemeDetail({
  model,
  scheme,
  onBack,
  onBackToList,
  onPickScheme,
  onOpenEquivalents,
  onOpenRecipe,
}: {
  model: ModelSubject;
  scheme: PaintScheme;
  onBack: () => void;
  onBackToList: () => void;
  onPickScheme: (s: PaintScheme) => void;
  onOpenEquivalents: (paint: Paint) => void;
  onOpenRecipe: (paint: Paint) => void;
}) {
  const { saveFavourite, hasAccess, configured, favourites } = useAuth();
  const alreadySaved = favourites.some(
    (f) =>
      f.kind === "scheme" &&
      f.payload &&
      "modelId" in f.payload &&
      f.payload.modelId === model.id &&
      f.payload.schemeId === scheme.id,
  );

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBackToList}
          className="inline-flex items-center gap-2 mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> All models
        </button>
        <span className="text-muted-foreground">/</span>
        <button
          type="button"
          onClick={onBack}
          className="mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground truncate max-w-[12rem]"
        >
          {model.name}
        </button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {model.name}
          </div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{scheme.name}</h2>
          <p className="mt-2 mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {[scheme.unit, scheme.operator, scheme.year, scheme.buno ? `BuNo ${scheme.buno}` : null]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <FavouriteButton
          disabled={!configured || !hasAccess}
          alreadySaved={alreadySaved}
          onSave={async () => {
            const res = await saveFavourite({
              kind: "scheme",
              title: `${model.name} — ${scheme.name}`,
              payload: { modelId: model.id, schemeId: scheme.id },
            });
            if (res.error) toast.error(res.error);
            else toast.success("Vehicle saved to favourites");
          }}
        />
      </div>

      {model.schemes.length > 1 && (
        <div className="flex flex-wrap gap-1">
          {model.schemes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onPickScheme(s)}
              className={`mono text-[10px] uppercase tracking-widest px-2.5 py-1.5 border border-border max-w-[14rem] truncate ${
                s.id === scheme.id ? "bg-foreground text-background" : "hover:bg-surface"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="mono text-[10px] uppercase tracking-widest text-left px-3 py-2 font-medium">
                Callout
              </th>
              <th className="mono text-[10px] uppercase tracking-widest text-left px-3 py-2 font-medium">
                FS
              </th>
              <th className="mono text-[10px] uppercase tracking-widest text-left px-3 py-2 font-medium hidden md:table-cell">
                Suggested paints
              </th>
              <th className="mono text-[10px] uppercase tracking-widest text-right px-3 py-2 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scheme.colors.map((callout, i) => {
              const paint = resolveCalloutPaint(callout);
              const hex = paint?.hex ?? (callout.fs ? hexForFs(callout.fs) : undefined) ?? "#888888";
              const fsPaints = callout.fs ? paintsForFs(callout.fs).slice(0, 4) : [];
              return (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-6 w-6 shrink-0 border border-border"
                        style={{ backgroundColor: hex }}
                      />
                      <span>{callout.role}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 mono text-xs text-muted-foreground">
                    {callout.fs ? `FS ${callout.fs}` : "—"}
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {fsPaints.length > 0
                        ? fsPaints.map((p) => (
                            <span
                              key={p.id}
                              className="mono text-[9px] uppercase tracking-wider border border-border px-1.5 py-0.5"
                            >
                              {p.brand} {p.code}
                            </span>
                          ))
                        : [callout.tamiya, callout.vallejo, callout.mrColor]
                            .filter(Boolean)
                            .map((code, j) => (
                              <span
                                key={j}
                                className="mono text-[9px] uppercase tracking-wider border border-border px-1.5 py-0.5"
                              >
                                {code}
                              </span>
                            ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    {paint ? (
                      <div className="flex flex-wrap justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenEquivalents(paint)}
                          className="mono text-[9px] uppercase tracking-widest px-2 py-1 border border-border hover:bg-surface"
                        >
                          Equivalents
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenRecipe(paint)}
                          className="mono text-[9px] uppercase tracking-widest px-2 py-1 border border-border hover:bg-surface"
                        >
                          Recipe
                        </button>
                      </div>
                    ) : callout.fs && hex ? (
                      <button
                        type="button"
                        onClick={() => {
                          const synthetic: Paint = {
                            id: `fs-${callout.fs}`,
                            brand: "Reference",
                            line: "FS",
                            code: callout.fs!,
                            name: callout.standardName ?? `FS ${callout.fs}`,
                            hex,
                            type: "acrylic",
                          };
                          onOpenRecipe(synthetic);
                        }}
                        className="mono text-[9px] uppercase tracking-widest px-2 py-1 border border-border hover:bg-surface"
                      >
                        Recipe
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {scheme.sources.length > 0 && (
        <div className="space-y-2">
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sources
          </div>
          <ul className="space-y-1">
            {scheme.sources.map((src, i) => (
              <li key={i} className="text-sm">
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline hover:text-foreground text-muted-foreground"
                  >
                    {src.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground">{src.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Colour callouts are approximate. Always check references before committing to a scheme.
      </p>
    </div>
  );
}

/** Resolve scheme for favourites deep-link. */
export { schemeById };
