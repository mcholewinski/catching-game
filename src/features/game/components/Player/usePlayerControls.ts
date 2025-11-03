import { useCallback, useEffect, useState } from 'react'
import type { Direction } from '../../types/common'
import { DIRECTION_KEYS } from './constants'

function usePlayerControls() {
    const [heldKeys, setHeldKeys] = useState<Set<Direction>>(new Set())

    const handleInput = useCallback((e: KeyboardEvent, isKeyDown: boolean) => {
        const direction = DIRECTION_KEYS[e.code]
        if (!direction) return;

        setHeldKeys(prev => {
            const newSet = new Set(prev)
            if (isKeyDown) {
                newSet.add(direction)
            } else {
                newSet.delete(direction)
            }
            return newSet
        })
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => handleInput(e, true)
        const handleKeyUp = (e: KeyboardEvent) => handleInput(e, false)

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleInput])

     const getDirection = useCallback(() => {
        if (heldKeys.has('LEFT') && heldKeys.has('RIGHT')) {
            return null
        }
        // Return the first pressed key, or null if none
        return heldKeys.has('LEFT') ? 'LEFT' : heldKeys.has('RIGHT') ? 'RIGHT' : null
    }, [heldKeys])

    return { getDirection }

}

export default usePlayerControls