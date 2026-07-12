import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AuthDialog } from "@/components/AuthDialog";
import { toast } from "sonner";

export function AuthHeaderControls() {
  const {
    configured,
    loading,
    user,
    hasAccess,
    profile,
    subscription,
    signOut,
    startCheckout,
    openBillingPortal,
    refreshAccess,
  } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const isComplimentary = profile?.access_tier === "complimentary";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");

    if (checkout === "success") {
      toast.success("Trial started — welcome to Chromabench");
      (async () => {
        try {
          const {
            data: { session },
          } = await (await import("@/lib/supabase")).getSupabaseBrowserClient().auth.getSession();
          if (session?.access_token) {
            await fetch("/api/stripe/sync", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sessionId: sessionId ?? undefined }),
            });
            await refreshAccess();
          }
        } catch {
          /* refresh on next load */
        }
      })();
      params.delete("checkout");
      params.delete("session_id");
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", next);
    } else if (checkout === "cancel") {
      toast.message("Checkout canceled");
      params.delete("checkout");
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", next);
    }
  }, [refreshAccess]);

  if (!configured) {
    return (
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 hidden lg:inline">
        Auth unset
      </span>
    );
  }

  if (loading) {
    return (
      <span className="mono text-[11px] uppercase tracking-widest px-3 py-2 text-muted-foreground">
        …
      </span>
    );
  }

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface"
        >
          Sign in
        </button>
        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  const statusLabel = isComplimentary
    ? "Complimentary"
    : hasAccess
      ? subscription?.status === "trialing"
        ? "Trial"
        : "Subscribed"
      : "No plan";

  return (
    <div className="flex items-center gap-1">
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 hidden md:inline">
        {statusLabel}
      </span>
      {!hasAccess && (
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await startCheckout();
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Checkout failed");
              setBusy(false);
            }
          }}
          className="mono text-[11px] uppercase tracking-widest ml-1 bg-foreground text-background px-3 py-2 hover:bg-accent disabled:opacity-50"
        >
          Start trial
        </button>
      )}
      {hasAccess && !isComplimentary && (
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await openBillingPortal();
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Portal failed");
              setBusy(false);
            }
          }}
          className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface disabled:opacity-50"
        >
          Billing
        </button>
      )}
      <button
        type="button"
        onClick={() => signOut()}
        className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface"
      >
        Sign out
      </button>
    </div>
  );
}
