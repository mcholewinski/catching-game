import type { Direction } from "../../types/common"

export const DIRECTION_KEYS: Record<string, Direction> = {
    KeyA: 'LEFT',
    KeyD: 'RIGHT',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT'
}

export const PLAYER_SPEED: number = 5
export const PLAYER_SIZE: number = 100
export const PLAYER_DEFAULT_POS_X: number = window.innerWidth / 2 - PLAYER_SIZE / 2
export const PLAYER_DEFAULT_POS_Y: number = window.innerHeight - 200