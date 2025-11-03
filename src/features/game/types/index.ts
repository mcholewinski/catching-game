/**
 * Position interface for objects with x, y coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Direction type for player movement
 */
export type Direction = "LEFT" | "RIGHT" | undefined;

/**
 * Canvas size interface
 */
export interface CanvasSize {
  width: number;
  height: number;
}

/**
 * Item data interface for falling items
 */
export interface ItemData {
  id: string;
  x: number;
  y: number;
  speed: number;
}
