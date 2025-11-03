import { useState } from 'react';

import GameController from './features/game/GameController';
import GameUI from './features/ui/GameUI';

function App() {
  const [score, setScore] = useState<number>(0)
  const [lives, setLives] = useState<number>(10)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleStart = () => {
    setIsPlaying(true)
    setScore(0)
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-game-bg text-white font-sans">
      <GameController isPlaying={isPlaying} onGameStart={handleStart} onScoreChange={setScore} onLivesChange={setLives} />
      <GameUI
        score={score}
        lives={lives}
        isPlaying={isPlaying}
        onStart={handleStart}
      />
    </div>
  )
}

export default App