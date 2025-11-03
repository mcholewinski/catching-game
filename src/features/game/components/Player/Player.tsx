import { Assets, Container, Sprite, Texture } from 'pixi.js'
import { extend, useTick } from '@pixi/react'
import { useEffect, useState, useRef } from 'react';

import { PLAYER_DEFAULT_POS_X, PLAYER_DEFAULT_POS_Y, PLAYER_SIZE, PLAYER_SPEED } from './constants'
import usePlayerControls from './usePlayerControls';
import type { Position } from '../../types/common';

extend({ Container, Sprite })

interface PlayerProps {
    canvasSize: { width: number, height: number }
    onMove: ({ x, y }: Position) => void
}

function Player({ canvasSize, onMove }: PlayerProps) {
    const [texture, setTexture] = useState<Texture>(Texture.EMPTY);
    const [position, setPosition] = useState({ x: PLAYER_DEFAULT_POS_X, y: PLAYER_DEFAULT_POS_Y })
    const prevCanvasSize = useRef(canvasSize)

    const { getDirection } = usePlayerControls()

    useEffect(() => {
        const widthChanged = prevCanvasSize.current.width !== canvasSize.width
        const heightChanged = prevCanvasSize.current.height !== canvasSize.height

        if (widthChanged || heightChanged) {
            setPosition(prev => {
                let newX = prev.x

                if (widthChanged) {
                    const relativeX = prev.x / prevCanvasSize.current.width
                    newX = relativeX * canvasSize.width
                }

                const newY = canvasSize.height - 200

                newX = Math.max(0, Math.min(canvasSize.width - PLAYER_SIZE, newX))

                return { x: newX, y: newY }
            })
        }
        prevCanvasSize.current = canvasSize
    }, [canvasSize])

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load('./assets/knight1.png').then((result) => { setTexture(result) })
        }
    }, [texture])

    useTick(() => {
        const direction = getDirection()

        if (direction) {
            setPosition(prev => {
                const movement = direction === 'LEFT' ? -PLAYER_SPEED : PLAYER_SPEED
                const newX = Math.max(0, Math.min(canvasSize.width - PLAYER_SIZE, prev.x + movement))
                return { ...prev, x: newX }
            })
        }
    })

    useEffect(() => {
        onMove(position)
    }, [position, onMove])

    return (
        <pixiContainer>
            <pixiSprite texture={texture} width={PLAYER_SIZE} height={PLAYER_SIZE} x={position.x} y={position.y} />
        </pixiContainer>
    )
}

export default Player