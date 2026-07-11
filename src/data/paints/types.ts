// Curated hobby paint dataset.
// Hex values are best-effort approximations based on published swatches and
// community references. They are close enough for perceptual color matching
// (Delta E) but not guaranteed to be perfect representations of the physical
// paint. Contributions and corrections are welcome.

export type PaintType = "acrylic" | "enamel" | "lacquer" | "contrast";

export type Paint = {
  id: string;
  brand: string;
  line: string;
  code: string;
  name: string;
  hex: string;
  type: PaintType;
};

export const BRANDS = [
  "Citadel",
  "Vallejo",
  "Army Painter",
  "Tamiya",
  "Mr. Color",
  "AK Interactive",
  "Scale75",
  "Reaper MSP",
  "SMS",
] as const;

export const P = (
  brand: string,
  line: string,
  code: string,
  name: string,
  hex: string,
  type: PaintType = "acrylic",
): Paint => ({
  id: `${brand}-${line}-${code}`.replace(/\s+/g, "_").toLowerCase(),
  brand,
  line,
  code,
  name,
  hex,
  type,
});
