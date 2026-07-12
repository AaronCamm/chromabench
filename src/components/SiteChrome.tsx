import { Link } from "@tanstack/react-router";
import { AuthHeaderControls } from "@/components/AuthHeaderControls";

export function SiteHeader({ active }: { active?: "home" | "bench" }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-5 w-5 bg-accent" aria-hidden />
          <span className="mono text-sm font-bold tracking-tight">CHROMABENCH</span>
          <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">
            v0.1
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {active === "home" ? (
            <>
              <a
                href="#brands"
                className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden md:inline"
              >
                Brands
              </a>
              <a
                href="#method"
                className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden md:inline"
              >
                Method
              </a>
            </>
          ) : (
            <Link
              to="/"
              className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden sm:inline"
            >
              Home
            </Link>
          )}
          <AuthHeaderControls />
          <Link
            to="/bench"
            className={`mono text-[11px] uppercase tracking-widest ml-1 px-3 py-2 hidden sm:inline ${
              active === "bench"
                ? "bg-accent text-background"
                : "bg-foreground text-background hover:bg-accent"
            }`}
          >
            {active === "bench" ? "Bench" : "Open bench →"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 bg-accent" aria-hidden />
          <span className="mono text-xs font-bold tracking-tight">CHROMABENCH</span>
          <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Independent · not affiliated with any manufacturer
          </span>
        </div>
        <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Built for hobbyists. Corrections welcome.
        </div>
      </div>
    </footer>
  );
}
