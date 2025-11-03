/**
 * Clamps a value between a minimum and maximum boundary
 * @param value - The value to clamp
 * @param min - Minimum boundary
 * @param max - Maximum boundary
 * @returns The clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Clamps X position within canvas boundaries
 * @param x - The x position
 * @param canvasWidth - Width of the canvas
 * @param objectWidth - Width of the object
 * @returns The clamped x position
 */
export const clampX = (
  x: number,
  canvasWidth: number,
  objectWidth: number,
): number => {
  return clamp(x, 0, canvasWidth - objectWidth);
};

/**
 * Calculates canvas size based on window dimensions
 * @returns Object with width and height
 */
export const calculateCanvasSize = (): { width: number; height: number } => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
