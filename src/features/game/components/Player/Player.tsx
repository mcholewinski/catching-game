import { Assets, Container, Sprite, Texture } from "pixi.js";
import { extend, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";

import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  PLAYER_Y_OFFSET,
} from "../../config/constants";
import usePlayerControls from "../../hooks/usePlayerControls";
import { clampX } from "../../utils/boundaries";
import type { Position, CanvasSize } from "../../types";

extend({ Container, Sprite });

interface PlayerProps {
  canvasSize: CanvasSize;
  onMove: ({ x, y }: Position) => void;
}

function Player({ canvasSize, onMove }: PlayerProps) {
  const [texture, setTexture] = useState<Texture>(Texture.EMPTY);
  const [position, setPosition] = useState({
    x: canvasSize.width / 2 - PLAYER_SIZE / 2,
    y: canvasSize.height - PLAYER_Y_OFFSET,
  });
  const prevCanvasSize = useRef(canvasSize);

  const { getDirection } = usePlayerControls();

  useEffect(() => {
    const widthChanged = prevCanvasSize.current.width !== canvasSize.width;
    const heightChanged = prevCanvasSize.current.height !== canvasSize.height;

    if (widthChanged || heightChanged) {
      setPosition((prev) => {
        let newX = prev.x;

        if (widthChanged) {
          const relativeX = prev.x / prevCanvasSize.current.width;
          newX = relativeX * canvasSize.width;
        }

        const newY = canvasSize.height - PLAYER_Y_OFFSET;

        newX = clampX(newX, canvasSize.width, PLAYER_SIZE);

        return { x: newX, y: newY };
      });
    }
    prevCanvasSize.current = canvasSize;
  }, [canvasSize]);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load("./assets/knight1.png").then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  useTick(() => {
    const direction = getDirection();

    if (direction) {
      setPosition((prev) => {
        const movement = direction === "LEFT" ? -PLAYER_SPEED : PLAYER_SPEED;
        const newX = clampX(prev.x + movement, canvasSize.width, PLAYER_SIZE);
        return { ...prev, x: newX };
      });
    }
  });

  useEffect(() => {
    onMove(position);
  }, [position, onMove]);

  return (
    <pixiContainer>
      <pixiSprite
        texture={texture}
        width={PLAYER_SIZE}
        height={PLAYER_SIZE}
        x={position.x}
        y={position.y}
      />
    </pixiContainer>
  );
}

export default Player;
