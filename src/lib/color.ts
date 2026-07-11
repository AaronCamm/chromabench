// Color utilities: hex <-> RGB <-> LAB, Delta E (CIE76), mixing.

export type RGB = { r: number; g: number; b: number };
export type LAB = { l: number; a: number; b: number };

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "").trim();
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function srgbToLinear(v: number) {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function linearToSrgb(v: number) {
  const s = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return s * 255;
}

export function rgbToLab({ r, g, b }: RGB): LAB {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  // sRGB D65 -> XYZ
  let X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  let Z = R * 0.0193339 + G * 0.119192 + B * 0.9503041;
  X /= 0.95047;
  Y /= 1.0;
  Z /= 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(X), fy = f(Y), fz = f(Z);
  return { l: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

export function labToRgb({ l, a, b }: LAB): RGB {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const finv = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);
  let X = 0.95047 * finv(fx);
  let Y = 1.0 * finv(fy);
  let Z = 1.08883 * finv(fz);
  const R = X * 3.2404542 + Y * -1.5371385 + Z * -0.4985314;
  const G = X * -0.969266 + Y * 1.8760108 + Z * 0.041556;
  const B = X * 0.0556434 + Y * -0.2040259 + Z * 1.0572252;
  return { r: linearToSrgb(R), g: linearToSrgb(G), b: linearToSrgb(B) };
}

export function hexToLab(hex: string): LAB {
  return rgbToLab(hexToRgb(hex));
}

export function deltaE(a: LAB, b: LAB): number {
  return Math.sqrt((a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);
}

// Weighted mix in linear RGB space (physically closer to how paint pigments average by volume).
export function mixHex(entries: { hex: string; parts: number }[]): string {
  const total = entries.reduce((s, e) => s + e.parts, 0);
  if (total <= 0) return "#000000";
  let R = 0, G = 0, B = 0;
  for (const e of entries) {
    const { r, g, b } = hexToRgb(e.hex);
    const w = e.parts / total;
    R += srgbToLinear(r) * w;
    G += srgbToLinear(g) * w;
    B += srgbToLinear(b) * w;
  }
  return rgbToHex({ r: linearToSrgb(R), g: linearToSrgb(G), b: linearToSrgb(B) });
}

export function contrastText(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lum = 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  return lum > 0.4 ? "#0a0a0a" : "#fafafa";
}
