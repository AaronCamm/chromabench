import { BRANDS, PAINTS, type Paint } from "@/data/paints";
import { deltaE, hexToLab } from "@/lib/color";

/** Closest paints in other brands, ranked by CIE76 ΔE (same logic as Equivalents tab). */
export function closestEquivalents(
  source: Paint,
  perBrand = 1,
): { brand: string; paint: Paint; dE: number }[] {
  const srcLab = hexToLab(source.hex);
  const out: { brand: string; paint: Paint; dE: number }[] = [];

  for (const brand of BRANDS) {
    if (brand === source.brand) continue;
    const matches = PAINTS.filter((p) => p.brand === brand)
      .map((paint) => ({ paint, dE: deltaE(srcLab, hexToLab(paint.hex)) }))
      .sort((a, b) => a.dE - b.dE)
      .slice(0, perBrand);
    for (const m of matches) out.push({ brand, ...m });
  }

  return out;
}

/** Drop brand codes that are missing from the catalog or clash with the resolved colour. */
export function sanitizeCalloutBrandCodes<
  T extends {
    fs?: string;
    tamiya?: string;
    vallejo?: string;
    sms?: string;
    mrColor?: string;
  },
>(callout: T, resolve: (c: T) => Paint | undefined, maxDeltaE = 12): T {
  const paint = resolve(callout);
  if (!paint) {
    return {
      ...callout,
      tamiya: undefined,
      vallejo: undefined,
      sms: undefined,
      mrColor: undefined,
    };
  }

  const srcLab = hexToLab(paint.hex);
  const keep = (code: string | undefined, brand: string): string | undefined => {
    if (!code) return undefined;
    const hit = PAINTS.find(
      (p) =>
        p.brand === brand &&
        p.code.replace(/\s/g, "").toLowerCase() === code.replace(/\s/g, "").toLowerCase(),
    );
    if (!hit) return undefined;
    if (deltaE(srcLab, hexToLab(hit.hex)) > maxDeltaE) return undefined;
    return hit.code;
  };

  return {
    ...callout,
    tamiya: keep(callout.tamiya, "Tamiya"),
    vallejo: keep(callout.vallejo, "Vallejo"),
    sms: keep(callout.sms, "SMS"),
    mrColor: keep(callout.mrColor, "Mr. Color"),
  };
}
