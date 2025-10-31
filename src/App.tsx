import { useState } from 'react';

import Game from './features/game/Game';
import GameUI from './features/ui/GameUI';

function App() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleStart = () => {
    setIsPlaying(true)
    setScore(0)
  }

  const handleGameOver = () => {
    setIsPlaying(false)
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-game-bg text-white font-sans">
      <GameUI
        score={score}
        isPlaying={isPlaying}
        onStart={handleStart}
      />
      <Game />
    </div>
  )
}

export default App