import { AnimatedSprite, Assets, Container, Sprite, Texture } from "pixi.js";
import { extend, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";

import {
  PLAYER_DEFAULT_POS_X,
  PLAYER_DEFAULT_POS_Y,
  PLAYER_SIZE,
  PLAYER_SPEED,
} from "./constants";
import usePlayerControls from "./usePlayerControls";
import type { Position } from "../../types/common";

extend({ Container, Sprite, AnimatedSprite });

interface PlayerProps {
  canvasSize: { width: number; height: number };
  onMove: ({ x, y }: Position) => void;
}

type PlayerAnim = 'idle' | 'runLeft' | 'runRight'

function Player({ canvasSize, onMove }: PlayerProps) {
  const [texture, setTexture] = useState<Texture>(Texture.EMPTY);
  const [walkLeftFrames, setWalkLeftFrames] = useState<Texture[]>([])
  const [walkRightFrames, setWalkRightFrames] = useState<Texture[]>([])
  const [animation, setAnimation] = useState<PlayerAnim>('idle')
  const [position, setPosition] = useState({
    x: PLAYER_DEFAULT_POS_X,
    y: PLAYER_DEFAULT_POS_Y,
  });
  const prevCanvasSize = useRef(canvasSize);
  const runLeftRef = useRef<AnimatedSprite>(null);
  const runRightRef = useRef<AnimatedSprite>(null);

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

        const newY = canvasSize.height - 182;

        newX = Math.max(0, Math.min(canvasSize.width - PLAYER_SIZE, newX));

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

  useEffect(() => {
    const loadFrames = async () => {
      const walkLeft: Texture[] = [];
      const walkRight: Texture[] = [];

      for (let i = 0; i < 5; i++) {
        walkLeft.push(await Assets.load(`./assets/anim/runLeft_${i}.png`))
        walkRight.push(await Assets.load(`./assets/anim/runRight_${i}.png`))
      }

      setWalkLeftFrames(walkLeft)
      setWalkRightFrames(walkRight)
    }

    loadFrames();
  })

  useEffect(() => {
    if (animation === 'runLeft' && runLeftRef.current) {
      runLeftRef.current.play();
    }
    if (animation === 'runRight' && runRightRef.current) {
      runRightRef.current.play();
    }
  }, [animation]);

  useTick(() => {
    const direction = getDirection();
    let newAnim: PlayerAnim = 'idle';

    if (direction) {
      if (direction === 'LEFT') {
        newAnim = 'runLeft'
      } else if (direction === 'RIGHT') {
        newAnim = 'runRight'
      }

      setPosition((prev) => {
        const movement = direction === "LEFT" ? -PLAYER_SPEED : PLAYER_SPEED;
        const newX = Math.max(
          0,
          Math.min(canvasSize.width - PLAYER_SIZE, prev.x + movement),
        );
        return { ...prev, x: newX };
      });
    }
    setAnimation(newAnim)
  });

  useEffect(() => {
    onMove(position);
  }, [position, onMove]);

  return (
    <pixiContainer>
      {animation === 'idle' &&
        <pixiSprite
          texture={texture}
          width={PLAYER_SIZE}
          height={PLAYER_SIZE}
          x={position.x}
          y={position.y}
        />}
      {animation === 'runLeft' &&
        <pixiAnimatedSprite
          ref={runLeftRef}
          textures={walkLeftFrames}
          width={PLAYER_SIZE}
          height={PLAYER_SIZE}
          interactive
          loop
          animationSpeed={0.1}
          x={position.x}
          y={position.y}
        />}
      {animation === 'runRight' &&
        <pixiAnimatedSprite
          ref={runRightRef}
          textures={walkRightFrames}
          width={PLAYER_SIZE}
          height={PLAYER_SIZE}
          loop
          animationSpeed={0.1}
          x={position.x}
          y={position.y}
        />}

    </pixiContainer>
  );
}

export default Player;
