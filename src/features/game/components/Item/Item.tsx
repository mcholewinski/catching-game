import { Graphics } from "pixi.js";
import { extend, useTick } from "@pixi/react";
import { useState, useRef } from "react";

import { ITEM_SIZE } from "./constants";
import { PLAYER_SIZE } from "../Player/constants";

extend({ Graphics });

interface ItemProps {
  id: string;
  x: number;
  initialY: number;
  speed: number;
  onCollect: (id: string) => void;
  onFallOff: (id: string) => void;
  playerX: number;
  playerY: number;
  canvasHeight: number;
}

function Item({
  id,
  x,
  initialY,
  speed,
  onCollect,
  onFallOff,
  playerX,
  playerY,
  canvasHeight,
}: ItemProps) {
  const [y, setY] = useState<number>(initialY);
  const shouldCallFallOff = useRef(false);
  const shouldCallCollect = useRef(false);

  useTick(() => {
    setY((prev) => {
      const newY = prev + speed;

      if (newY > canvasHeight) {
        shouldCallFallOff.current = true;
        return prev;
      }

      const itemCenterX = x + ITEM_SIZE / 2;
      const itemCenterY = newY + ITEM_SIZE / 2;
      const playerCenterX = playerX + PLAYER_SIZE / 2;
      const playerCenterY = playerY + PLAYER_SIZE / 2;

      const distance = Math.sqrt(
        Math.pow(itemCenterX - playerCenterX, 2) +
          Math.pow(itemCenterY - playerCenterY, 2),
      );

      if (distance < (ITEM_SIZE + PLAYER_SIZE) / 2) {
        shouldCallCollect.current = true;
        return prev;
      }

      return newY;
    });

    if (shouldCallFallOff.current) {
      shouldCallFallOff.current = false;
      onFallOff(id);
    }

    if (shouldCallCollect.current) {
      shouldCallCollect.current = false;
      onCollect(id);
    }
  });

  return (
    <pixiGraphics
      draw={(g) => {
        g.fill(0xffd700);
        g.circle(ITEM_SIZE / 2, ITEM_SIZE / 2, ITEM_SIZE / 2);
      }}
      x={x}
      y={y}
    />
  );
}

export default Item;
