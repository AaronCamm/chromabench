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
      <div className="relative">
        <div className="pointer-events-none opacity-40">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 p-6">
          <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Loading…
          </p>
        </div>
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
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30 blur-[1px]">{children}</div>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 p-5 backdrop-blur-[2px]">
        <div className="max-w-md w-full border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <h3 className="text-sm font-semibold tracking-tight">{feature} requires access</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {signedIn
              ? "Start a 7-day free trial, then $5/month. Cancel anytime from the billing portal."
              : "Sign in to start a 7-day free trial ($5/month after). Equivalents stay free."}
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
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} initialMode="signup" />
    </div>
  );
}
