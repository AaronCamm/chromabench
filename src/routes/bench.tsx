import { createFileRoute, Link } from "@tanstack/react-router";
import { AccessGate } from "@/components/AccessGate";
import { PaintConverter } from "@/components/PaintConverter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/bench")({
  component: BenchPage,
  head: () => ({
    meta: [
      { title: "Bench — Chromabench" },
      {
        name: "description",
        content:
          "Open the Chromabench paint converter: find cross-brand equivalents, mix recipes, and save favourites.",
      },
    ],
  }),
});

function BenchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader active="bench" />
      <main className="flex-1 border-b border-border bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Workspace
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">The bench</h1>
            </div>
            <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground max-w-sm text-right">
              Sign in required · 7-day trial, then $5/month
            </p>
          </div>
          <div className="mt-8">
            <AccessGate feature="The bench">
              <PaintConverter />
            </AccessGate>
          </div>
          <p className="mt-8 mono text-[11px] uppercase tracking-widest text-muted-foreground">
            New here?{" "}
            <Link to="/" className="underline hover:text-foreground">
              Back to overview
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
