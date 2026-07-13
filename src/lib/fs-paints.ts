import { PAINTS, paintById, type Paint } from "@/data/paints";

const fsPaintIndex = new Map<string, Paint[]>();

function normalizeFs(fs: string): string {
  return fs.replace(/\D/g, "").padStart(5, "0");
}

function registerPaint(paint: Paint) {
  const match = paint.name.match(/FS\s*(\d{5})/i) ?? paint.code.match(/FS(\d{5})/i);
  if (!match) return;
  const key = normalizeFs(match[1]);
  const list = fsPaintIndex.get(key) ?? [];
  list.push(paint);
  fsPaintIndex.set(key, list);
}

for (const paint of PAINTS) {
  registerPaint(paint);
}

const BRAND_PRIORITY = ["Tamiya", "Vallejo", "SMS", "Mr. Color"] as const;

export function paintsForFs(fs: string): Paint[] {
  const key = normalizeFs(fs);
  const matches = fsPaintIndex.get(key) ?? [];
  return [...matches].sort((a, b) => {
    const ai = BRAND_PRIORITY.indexOf(a.brand as (typeof BRAND_PRIORITY)[number]);
    const bi = BRAND_PRIORITY.indexOf(b.brand as (typeof BRAND_PRIORITY)[number]);
    const ap = ai === -1 ? 99 : ai;
    const bp = bi === -1 ? 99 : bi;
    return ap - bp || a.brand.localeCompare(b.brand);
  });
}

export function bestPaintForFs(fs: string, brand?: string): Paint | undefined {
  const matches = paintsForFs(fs);
  if (brand) {
    return matches.find((p) => p.brand === brand) ?? matches[0];
  }
  return matches[0];
}

export function hexForFs(fs: string): string | undefined {
  return bestPaintForFs(fs)?.hex;
}

export function resolveCalloutPaint(callout: {
  fs?: string;
  tamiya?: string;
  vallejo?: string;
  sms?: string;
  mrColor?: string;
}): Paint | undefined {
  if (callout.fs) {
    const fromFs = bestPaintForFs(callout.fs);
    if (fromFs) return fromFs;
  }
  const codeMap: [string | undefined, string][] = [
    [callout.tamiya, "Tamiya"],
    [callout.vallejo, "Vallejo"],
    [callout.sms, "SMS"],
    [callout.mrColor, "Mr. Color"],
  ];
  for (const [code, brand] of codeMap) {
    if (!code) continue;
    const normalized = code.replace(/^XF-|^X-|^C/i, (m) => (m.startsWith("C") ? "C" : m));
    const hit = PAINTS.find(
      (p) =>
        p.brand === brand &&
        (p.code.toLowerCase() === code.toLowerCase() ||
          p.code.toLowerCase() === normalized.toLowerCase() ||
          p.code.replace(/\s/g, "").toLowerCase() === code.replace(/\s/g, "").toLowerCase()),
    );
    if (hit) return hit;
    if (callout.fs) {
      const byBrand = bestPaintForFs(callout.fs, brand);
      if (byBrand) return byBrand;
    }
  }
  return undefined;
}

export { paintById, normalizeFs };
