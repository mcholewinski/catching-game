import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { useCallback, useEffect, useRef, useState } from "react";

import MainContainer from "./components/MainContainer";

import { calculateGameSize } from "./utils";

extend({ Container, Graphics, Sprite })

function Game() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [canvasSize, setCanvasSize] = useState<{ width: number, height: number }>(calculateGameSize)

    const updateCanvasSize = useCallback(() => {
        setCanvasSize(calculateGameSize())
    }, [])

    useEffect(() => {
        window.addEventListener('resize', updateCanvasSize)

        return () => window.removeEventListener('resize', updateCanvasSize)
    }, [updateCanvasSize])


    return (
        <div className="w-screen max-w-[1600px] mx-auto h-screen" ref={wrapperRef}>
            <Application
                background='#5CB6FF'
                width={canvasSize.width}
                height={canvasSize.height}
                antialias
                resizeTo={wrapperRef}
            >
                <MainContainer canvasSize={canvasSize}/>
            </Application>
        </div>
    )
}

export default Game