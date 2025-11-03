interface CollisionObject {
  x: number;
  y: number;
  size: number;
}

/**
 * Calculates the center point of an object
 * @param x - X position
 * @param y - Y position
 * @param size - Size of the object
 * @returns Object with centerX and centerY
 */
const getCenter = (x: number, y: number, size: number) => ({
  centerX: x + size / 2,
  centerY: y + size / 2,
});

/**
 * Calculates the Euclidean distance between two points
 * @param x1 - X coordinate of first point
 * @param y1 - Y coordinate of first point
 * @param x2 - X coordinate of second point
 * @param y2 - Y coordinate of second point
 * @returns The distance between the two points
 */
const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

/**
 * Detects circular collision between two objects
 * @param obj1 - First object with x, y, and size
 * @param obj2 - Second object with x, y, and size
 * @returns True if collision detected, false otherwise
 */
export const detectCollision = (
  obj1: CollisionObject,
  obj2: CollisionObject,
): boolean => {
  const center1 = getCenter(obj1.x, obj1.y, obj1.size);
  const center2 = getCenter(obj2.x, obj2.y, obj2.size);

  const distance = calculateDistance(
    center1.centerX,
    center1.centerY,
    center2.centerX,
    center2.centerY,
  );

  const collisionRadius = (obj1.size + obj2.size) / 2;

  return distance < collisionRadius;
};
