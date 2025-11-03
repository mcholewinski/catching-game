import { Graphics } from 'pixi.js'
import { extend, useTick } from '@pixi/react'
import { useState } from 'react'

import { ITEM_SIZE } from './constants'
import { PLAYER_SIZE } from '../Player/constants'

extend({ Graphics })

interface ItemProps {
    id: string
    x: number
    initialY: number
    speed: number
    onCollect: (id: string) => void
    onFallOff: (id: string) => void
    playerX: number
    playerY: number
    canvasHeight: number
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
    canvasHeight
}: ItemProps) {
    const [y, setY] = useState<number>(initialY)

    useTick(() => {
        setY(prev => {
            const newY = prev + speed

            if (newY > canvasHeight) {
                onFallOff(id)
                return prev
            }

            const itemCenterX = x + ITEM_SIZE / 2
            const itemCenterY = newY + ITEM_SIZE / 2
            const playerCenterX = playerX + PLAYER_SIZE / 2
            const playerCenterY = playerY + PLAYER_SIZE / 2

            const distance = Math.sqrt(
                Math.pow(itemCenterX - playerCenterX, 2) +
                Math.pow(itemCenterY - playerCenterY, 2)
            )

            if (distance < (ITEM_SIZE + PLAYER_SIZE) / 2) {
                onCollect(id)
                return prev
            }

            return newY
        })
    })

    return (
        <pixiGraphics
            draw={g => {
                g.clear()
                g.fill(0xFFD700)
                g.circle(ITEM_SIZE / 2, ITEM_SIZE / 2, ITEM_SIZE / 2)
            }}
            x={x}
            y={y}
        />
    )
}

export default Item