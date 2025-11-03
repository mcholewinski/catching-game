import { useEffect, useState } from "react";
import { useApplication } from "@pixi/react";
import { initDevtools } from "@pixi/devtools";

import Player from "./Player/Player";
import Item from './Item/Item';
import { ITEM_FALL_SPEED, ITEM_SPAWN_INTERVAL } from "./Item/constants";

import type { Position } from "../types/common";

interface MainContainerProps {
    canvasSize: { width: number, height: number }
    isPlaying: boolean;
    onScoreChange: (score: number | ((prev: number) => number)) => void
    onLivesChange: (lives: number | ((prev: number) => number)) => void
}

interface ItemData {
    id: string
    x: number
    y: number
    speed: number
}

function MainContainer({ canvasSize, isPlaying, onLivesChange, onScoreChange }: MainContainerProps) {
    const [items, setItems] = useState<ItemData[]>([])
    const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 })

    const coinSound = new Audio("assets/coin.flac")
    coinSound.volume = 0.2

    useEffect(() => {
        if (!isPlaying) {
            setItems([])
        }
    }, [isPlaying])

    useEffect(() => {
        const interval = setInterval(() => {
            const newItem: ItemData = {
                id: `item-${Date.now()}-${Math.random()}`,
                x: Math.random() * (canvasSize.width - 100),
                y: Math.floor(Math.random() * (-30 - -100 + 1)) + -100,
                speed: ITEM_FALL_SPEED
            }
            setItems(prev => [...prev, newItem])
        }, ITEM_SPAWN_INTERVAL)

        return () => clearInterval(interval)
    }, [canvasSize.width])

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const handleFallOff = (id: string) => {
        removeItem(id)
        onLivesChange(prev => prev - 1)
    }

    const handleCollect = (id: string) => {
        removeItem(id)
        coinSound.play();
        onScoreChange(prev => prev + 10)
    }

    if (import.meta.env.MODE === 'development') {
        const { app } = useApplication()
        initDevtools({ app })
    }

    return (
        <pixiContainer>
            <Player canvasSize={canvasSize} onMove={setPlayerPosition} />
            {items.map(item => (
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
    )
}

export default MainContainer