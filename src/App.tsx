import { useEffect, useState } from 'react';

import GameController from './features/game/GameController';
import GameUI from './features/ui/GameUI';

function App() {
  const [score, setScore] = useState<number>(0)
  const [highscore, setHighscore] = useState<number>(0)
  const [lives, setLives] = useState<number>(10)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isDead, setIsDead] = useState<boolean>(false)


  const handleStart = () => {
    setIsPlaying(true)
    setIsDead(false)
    setScore(0)
    setLives(10)
    setHighscore(Number(window.localStorage.getItem("highscore") || 0))
  }

  const handleGameOver = () => {
    if (score > highscore) window.localStorage.setItem("highscore", String(score))

    setIsDead(true)
    setIsPlaying(false)
  }


  useEffect(() => {
    if (lives === 0) {
      handleGameOver()
    }
  }, [lives])

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-white font-sans">
      {isDead && !isPlaying ? <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-800'>
        <h1 className="text-5xl mb-8">Game Over!</h1>
        <p className='text-lg mb-4'><b>Your Score:</b> <span className='text-yellow-400'>{score}</span></p>
        <p className='text-md mb-4'><b>Local Highscore:</b> <span className='text-cyan-400'>{highscore}</span></p>
        {score > highscore && <p className='text-lg font-bold text-yellow-400'>Congratulations! You beat the highscore.</p>}
        <button className='mt-8 rounded-xl bg-white text-black py-2 px-10' onClick={handleStart}>Play Again</button>
      </div> :
        <>
          <GameController isPlaying={isPlaying} onGameStart={handleStart} onScoreChange={setScore} onLivesChange={setLives} />
          <GameUI
            score={score}
            lives={lives}
            isPlaying={isPlaying}
            onStart={handleStart}
          />
        </>
      }
    </div>
  )
}

export default App