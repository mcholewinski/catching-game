import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { useEffect, useRef, useState } from "react";

import MainContainer from "./components/MainContainer";

import { calculateGameSize } from "./utils";

extend({ Container, Graphics, Sprite })

interface GameProps {
    isPlaying: boolean;
    onGameStart: () => void;
    onScoreChange: (score: number | ((prev: number) => number)) => void
    onLivesChange: (lives: number | ((prev: number) => number)) => void
}

function Game({ isPlaying, onGameStart, onScoreChange, onLivesChange }: GameProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [canvasSize, setCanvasSize] = useState<{ width: number, height: number }>(calculateGameSize)

    useEffect(() => {
        const updateCanvasSize = () => setCanvasSize(calculateGameSize())

        window.addEventListener('resize', updateCanvasSize)

        return () => window.removeEventListener('resize', updateCanvasSize)
    }, [])


    return (
        <div className="w-screen max-w-[1600px] mx-auto h-screen" ref={wrapperRef}>
            <Application
                background='#5CB6FF'
                backgroundAlpha={0.9}
                autoStart={false}
                width={canvasSize.width}
                height={canvasSize.height}
                antialias
                resizeTo={wrapperRef}
            >
                <MainContainer canvasSize={canvasSize} isPlaying={isPlaying} onGameStart={onGameStart} onScoreChange={onScoreChange} onLivesChange={onLivesChange} />
            </Application>
        </div>
    )
}

export default Game