import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useAccess } from "@/hooks/use-access";
import { AuthDialog } from "@/components/AuthDialog";
import { getSupabaseBrowserClient } from "@/lib/supabase";

async function syncSubscription(accessToken: string, signal?: AbortSignal) {
  const res = await fetch("/api/stripe/sync", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: "{}",
    signal,
  });
  return res;
}

export function AccessGate({
  children,
  feature = "This feature",
}: {
  children: React.ReactNode;
  feature?: string;
}) {
  const { loading, signedIn, hasAccess, configured } = useAccess();
  const { startCheckout, openBillingPortal, subscription, refreshAccess, session, user } =
    useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const syncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      syncedUserId.current = null;
      setSyncing(false);
      return;
    }
    if (!configured || !signedIn || hasAccess || loading) {
      if (hasAccess) setSyncing(false);
      return;
    }
    // Only auto-sync once per signed-in user so effect churn can't leave us stuck.
    if (syncedUserId.current === user.id) return;
    syncedUserId.current = user.id;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10_000);
    setSyncing(true);
    setError(null);

    (async () => {
      try {
        const token =
          session?.access_token ??
          (await getSupabaseBrowserClient().auth.getSession()).data.session?.access_token;
        if (!token || controller.signal.aborted) return;
        await syncSubscription(token, controller.signal);
        if (!controller.signal.aborted) await refreshAccess();
      } catch {
        /* aborted or network — fall through to paywall */
      } finally {
        window.clearTimeout(timeoutId);
        setSyncing(false);
      }
    })();

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
      setSyncing(false);
    };
  }, [
    configured,
    signedIn,
    hasAccess,
    loading,
    user?.id,
    session?.access_token,
    refreshAccess,
  ]);

  if (loading || syncing) {
    return (
      <div className="min-h-[28rem] flex items-center justify-center border border-border bg-card p-6">
        <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {syncing ? "Checking subscription…" : "Loading…"}
        </p>
      </div>
    );
  }

  // Without Supabase env, keep the bench usable (local / pre-billing).
  if (!configured || hasAccess) {
    return <>{children}</>;
  }

  const onCheckout = async () => {
    setError(null);
    setBusy(true);
    try {
      await startCheckout();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  };

  const onPortal = async () => {
    setError(null);
    setBusy(true);
    try {
      await openBillingPortal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Portal failed");
      setBusy(false);
    }
  };

  const onRefresh = async () => {
    setError(null);
    setBusy(true);
    try {
      const token =
        session?.access_token ??
        (await getSupabaseBrowserClient().auth.getSession()).data.session?.access_token;
      if (!token) throw new Error("Sign in required");
      const res = await syncSubscription(token);
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not find a subscription");
      await refreshAccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refresh failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[28rem] flex items-center justify-center border border-border bg-card p-5 md:p-10">
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <h3 className="text-sm font-semibold tracking-tight">{feature} requires access</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {signedIn
            ? "Start a 7-day free trial, then $5/month. Cancel anytime from the billing portal."
            : "Sign in or create an account to use the bench. Includes a 7-day free trial, then $5/month."}
        </p>
        {subscription?.status &&
          subscription.status !== "trialing" &&
          subscription.status !== "active" && (
            <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Subscription status: {subscription.status}
            </p>
          )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex flex-wrap gap-2">
          {!signedIn ? (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent"
            >
              Sign in / Sign up
            </button>
          ) : (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={onCheckout}
                className="mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent disabled:opacity-50"
              >
                {busy ? "Working…" : "Start 7-day trial"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={onRefresh}
                className="mono text-[11px] uppercase tracking-widest border border-border px-4 py-2.5 hover:bg-surface disabled:opacity-50"
              >
                Already subscribed? Refresh
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={onPortal}
                className="mono text-[11px] uppercase tracking-widest border border-border px-4 py-2.5 hover:bg-surface disabled:opacity-50"
              >
                Manage billing
              </button>
            </>
          )}
        </div>
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} initialMode="signup" />
    </div>
  );
}
