import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";

type Mode = "signin" | "signup";

export function AuthDialog({
  open,
  onOpenChange,
  initialMode = "signin",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: Mode;
}) {
  const { signIn, signUp, configured } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const res = await signIn(email.trim(), password);
        if (res.error) setError(res.error);
        else onOpenChange(false);
      } else {
        const res = await signUp(email.trim(), password);
        if (res.error) setError(res.error);
        else {
          setMessage("Check your email to confirm, or sign in if confirmations are disabled.");
          setMode("signin");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-none border-border bg-background p-0 gap-0">
        <DialogHeader className="border-b border-border px-5 py-4 text-left">
          <DialogTitle className="mono text-sm font-bold tracking-tight uppercase">
            {mode === "signin" ? "Sign in" : "Create account"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {configured
              ? "7-day free trial, then $5/month. Sign in to use the full bench."
              : "Auth is not configured yet. Add Supabase env vars to enable sign-in."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 px-5 py-5">
          <div className="space-y-1.5">
            <label
              className="mono text-[10px] uppercase tracking-widest text-muted-foreground"
              htmlFor="auth-email"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!configured || busy}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="mono text-[10px] uppercase tracking-widest text-muted-foreground"
              htmlFor="auth-password"
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!configured || busy}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}

          <button
            type="submit"
            disabled={!configured || busy}
            className="w-full bg-foreground text-background mono text-[11px] uppercase tracking-widest px-3 py-3 hover:bg-accent disabled:opacity-50"
          >
            {busy ? "Working…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>

          <button
            type="button"
            className="w-full mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setMessage(null);
            }}
          >
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
