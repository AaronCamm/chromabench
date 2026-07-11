import type { Paint } from "./types";
import { citadelPaints } from "./citadel";
import { vallejoPaints } from "./vallejo";
import { armyPainterPaints } from "./army-painter";
import { tamiyaPaints } from "./tamiya";
import { mrColorPaints } from "./mr-color";
import { akPaints } from "./ak-interactive";
import { scale75Paints } from "./scale75";
import { reaperPaints } from "./reaper";
import { smsPaints } from "./sms";

export type { Paint, PaintType } from "./types";
export { BRANDS, P } from "./types";

export const PAINTS: Paint[] = [
  ...citadelPaints,
  ...vallejoPaints,
  ...armyPainterPaints,
  ...tamiyaPaints,
  ...mrColorPaints,
  ...akPaints,
  ...scale75Paints,
  ...reaperPaints,
  ...smsPaints,
];

export function paintById(id: string): Paint | undefined {
  return PAINTS.find((p) => p.id === id);
}
