import { useEffect, useState } from "react";
import { useApplication } from "@pixi/react";
import { initDevtools } from "@pixi/devtools";

import Player from "./Player/Player";
import Item from "./Item/Item";
import {
  ITEM_FALL_SPEED,
  ITEM_SPAWN_INTERVAL,
  ITEM_SPAWN_PADDING,
  ITEM_SPAWN_Y_MIN,
  ITEM_SPAWN_Y_MAX,
  SCORE_PER_ITEM,
} from "../config/constants";
import { audioManager } from "../utils/audio";
import type { Position, CanvasSize, ItemData } from "../types";

interface MainContainerProps {
  canvasSize: CanvasSize;
  isPlaying: boolean;
  onGameStart: () => void;
  onScoreChange: (score: number | ((prev: number) => number)) => void;
  onLivesChange: (lives: number | ((prev: number) => number)) => void;
}

function MainContainer({
  canvasSize,
  isPlaying,
  onGameStart,
  onLivesChange,
  onScoreChange,
}: MainContainerProps) {
  const [items, setItems] = useState<ItemData[]>([]);
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const { app } = useApplication();

  useEffect(() => {
    if (isPlaying) {
      app.start();
      onGameStart();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setItems([]);
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: ItemData = {
        id: `item-${Date.now()}-${Math.random()}`,
        x: Math.floor(
          Math.random() *
            (canvasSize.width - ITEM_SPAWN_PADDING * 2 + 1) +
            ITEM_SPAWN_PADDING,
        ),
        y: Math.floor(
          Math.random() * (ITEM_SPAWN_Y_MAX - ITEM_SPAWN_Y_MIN + 1) +
            ITEM_SPAWN_Y_MIN,
        ),
        speed: ITEM_FALL_SPEED,
      };
      setItems((prev) => [...prev, newItem]);
    }, ITEM_SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [canvasSize.width]);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFallOff = (id: string) => {
    removeItem(id);
    onLivesChange((prev) => prev - 1);
  };

  const handleCollect = (id: string) => {
    removeItem(id);
    audioManager.playCoinSound();
    onScoreChange((prev) => prev + SCORE_PER_ITEM);
  };

  if (import.meta.env.MODE === "development") {
    initDevtools({ app });
  }

  return (
    <pixiContainer>
      <Player canvasSize={canvasSize} onMove={setPlayerPosition} />
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          x={item.x}
          initialY={item.y}
          speed={item.speed}
          onCollect={handleCollect}
          onFallOff={handleFallOff}
          playerX={playerPosition.x}
          playerY={playerPosition.y}
          canvasHeight={canvasSize.height}
        />
      ))}
    </pixiContainer>
  );
}

export default MainContainer;
