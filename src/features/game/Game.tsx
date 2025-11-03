import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { useEffect, useRef, useState } from "react";

import MainContainer from "./components/MainContainer";
import { calculateCanvasSize } from "./utils/boundaries";
import { MAX_CANVAS_WIDTH } from "./config/constants";
import type { CanvasSize } from "./types";

extend({ Container, Graphics, Sprite });

interface GameProps {
  isPlaying: boolean;
  onGameStart: () => void;
  onScoreChange: (score: number | ((prev: number) => number)) => void;
  onLivesChange: (lives: number | ((prev: number) => number)) => void;
}

function Game({
  isPlaying,
  onGameStart,
  onScoreChange,
  onLivesChange,
}: GameProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [canvasSize, setCanvasSize] = useState<CanvasSize>(calculateCanvasSize);

  useEffect(() => {
    const updateCanvasSize = () => setCanvasSize(calculateCanvasSize());

    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <div
      className="mx-auto h-screen w-screen"
      style={{ maxWidth: `${MAX_CANVAS_WIDTH}px` }}
      ref={wrapperRef}
    >
      <Application
        background="#5CB6FF"
        backgroundAlpha={0.9}
        autoStart={false}
        width={canvasSize.width}
        height={canvasSize.height}
        antialias
        resizeTo={wrapperRef}
      >
        <MainContainer
          canvasSize={canvasSize}
          isPlaying={isPlaying}
          onGameStart={onGameStart}
          onScoreChange={onScoreChange}
          onLivesChange={onLivesChange}
        />
      </Application>
    </div>
  );
}

export default Game;
