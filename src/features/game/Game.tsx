import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { useRef } from "react";

extend({ Container, Graphics, Sprite })

function Game() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="w-screen max-w-[1600px] mx-auto h-screen" ref={wrapperRef}>
            <Application
                width={800}
                height={600}
                antialias
                resizeTo={wrapperRef}
            />
        </div>
    )
}

export default Game