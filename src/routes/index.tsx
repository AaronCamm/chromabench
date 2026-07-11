import { createFileRoute } from "@tanstack/react-router";
import { PaintConverter } from "@/components/PaintConverter";
import { BRANDS, PAINTS } from "@/data/paints";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ToolSection />
        <BrandsSection />
        <MethodSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="h-5 w-5 bg-accent" aria-hidden />
          <span className="mono text-sm font-bold tracking-tight">CHROMABENCH</span>
          <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">v0.1</span>
        </a>
        <nav className="flex items-center gap-1">
          <a href="#tool" className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface">Tool</a>
          <a href="#brands" className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface">Brands</a>
          <a href="#method" className="mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface">Method</a>
          <a
            href="#tool"
            className="mono text-[11px] uppercase tracking-widest ml-2 bg-foreground text-background px-3 py-2 hover:bg-accent"
          >
            Open bench →
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="border border-border bg-background px-2 py-1">01 / Reference</span>
          <span className="ml-2">Hobby paint converter &amp; mix bench</span>
        </div>

        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
          Match any paint.
          <br />
          <span className="text-muted-foreground">Mix across any brand.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Pick a paint from Citadel, Vallejo, Tamiya, Mr. Color, SMS, Army Painter, AK Interactive, Scale75, or Reaper.
          Chromabench finds the closest cross-brand equivalents and builds multi-brand mix recipes so you can keep
          working with what's on your bench.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          <Stat label="Brands" value={String(BRANDS.length)} />
          <Stat label="Paints indexed" value={String(PAINTS.length)} />
          <Stat label="Perceptual model" value="CIE LAB" />
          <Stat label="Mix space" value="Linear sRGB" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background px-4 py-4">
      <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 mono text-2xl font-bold">{value}</div>
    </div>
  );
}

function ToolSection() {
  return (
    <section id="tool" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeader num="02" title="The bench" caption="Search, match, mix." />
        <div className="mt-8">
          <PaintConverter />
        </div>
      </div>
    </section>
  );
}

function BrandsSection() {
  const groups = BRANDS.map((b) => {
    const list = PAINTS.filter((p) => p.brand === b);
    return { brand: b, count: list.length, samples: list.slice(0, 12) };
  });
  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeader num="03" title="Indexed brands" caption="Curated, growing." />
        <div className="mt-8 grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.brand} className="bg-background p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{g.brand}</h3>
                <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{g.count} sku</span>
              </div>
              <div className="mt-3 grid grid-cols-6 gap-1">
                {g.samples.map((p) => (
                  <div key={p.id} className="aspect-square border border-border" style={{ backgroundColor: p.hex }} title={p.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const items = [
    { n: "A", t: "Perceptual matching", d: "Every hex is converted to CIE LAB. Match quality is reported as ΔE — the perceptual distance a trained eye actually sees. Under 2 is a very close match, under 5 is a good working substitute." },
    { n: "B", t: "Multi-brand mixing", d: "Add paints from any brand with volumetric parts. Chromabench averages the recipe in linear sRGB — a physically-motivated approximation of how thin acrylics blend on a wet palette." },
    { n: "C", t: "Recipe search", d: "Pick a target color and a brand you own. The bench searches every pair of paints in that brand across seven ratios and keeps the top 10 closest mixes by ΔE, so you can hit a Citadel colour from a Tamiya or SMS rack." },
  ];
  return (
    <section id="method" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeader num="04" title="Method" caption="How the bench thinks." />
        <div className="mt-8 grid gap-px bg-border border border-border md:grid-cols-3">
          {items.map((i) => (
            <div key={i.n} className="bg-background p-6">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border inline-block px-1.5 py-0.5">{i.n}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Note — hex values are best-effort approximations of published swatches. Always test on a spare miniature before committing.
        </p>
      </div>
    </section>
  );
}

function SectionHeader({ num, title, caption }: { num: string; title: string; caption: string }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
      <div>
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{num} — Section</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      <div className="mono text-[11px] uppercase tracking-widest text-muted-foreground">{caption}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 bg-accent" aria-hidden />
          <span className="mono text-xs font-bold tracking-tight">CHROMABENCH</span>
          <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest">Independent · not affiliated with any manufacturer</span>
        </div>
        <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Built for hobbyists. Corrections welcome.
        </div>
      </div>
    </footer>
  );
}
