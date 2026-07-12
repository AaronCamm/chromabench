import { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useAccess } from "@/hooks/use-access";
import { AuthDialog } from "@/components/AuthDialog";

export function AccessGate({
  children,
  feature = "This feature",
}: {
  children: React.ReactNode;
  feature?: string;
}) {
  const { loading, signedIn, hasAccess, configured } = useAccess();
  const { startCheckout, openBillingPortal, subscription } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-[28rem] flex items-center justify-center border border-border bg-card p-6">
        <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground">Loading…</p>
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
                {busy ? "Redirecting…" : "Start 7-day trial"}
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
