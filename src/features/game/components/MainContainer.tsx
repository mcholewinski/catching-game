import { useEffect, useState } from "react";
import { useApplication } from "@pixi/react";
import { initDevtools } from "@pixi/devtools";

import Player from "./Player/Player";
import Item from './Item/Item';
import { ITEM_FALL_SPEED, ITEM_SPAWN_INTERVAL } from "./Item/constants";

import type React from "react";
import type { Position } from "../types/common";

interface MainContainerProps {
    canvasSize: { width: number, height: number }
    children?: React.ReactNode
}

interface ItemData {
    id: string
    x: number
    speed: number
}

function MainContainer({ children, canvasSize }: MainContainerProps) {
    const [items, setItems] = useState<ItemData[]>([])
    const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 })

    useEffect(() => {
        const interval = setInterval(() => {
            const newItem: ItemData = {
                id: `item-${Date.now()}-${Math.random()}`,
                x: Math.random() * (canvasSize.width - 30), // 30 is item size
                speed: ITEM_FALL_SPEED
            }
            setItems(prev => [...prev, newItem])
        }, ITEM_SPAWN_INTERVAL)

        return () => clearInterval(interval)
    }, [canvasSize.width])

    const handleCollect = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
        console.log('addScore')
    }

    const handleFallOff = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    if (import.meta.env.MODE === 'development') {
        const { app } = useApplication()
        initDevtools({ app })
    }

    return (
        <pixiContainer>
            {children}
            <Player canvasSize={canvasSize} onMove={setPlayerPosition} />
            {items.map(item => (
                <Item
                    key={item.id}
                    id={item.id}
                    x={item.x}
                    initialY={-30}
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