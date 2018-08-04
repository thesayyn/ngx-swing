import { Offset } from "./offset";
import { Dimension } from './dimension'

export function calculateRotation(dimension: Dimension, offset: Offset): number {
  const horizontalOffset = Math.min(Math.max(offset.x / dimension.width, -1), 1);
  const verticalOffset = (offset.y > 0 ? 1 : -1) * Math.min(Math.abs(offset.y) / 100, 1);
  return horizontalOffset * verticalOffset
}
