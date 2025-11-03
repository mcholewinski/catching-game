import { useEffect, useState } from "react";

import Game from "./features/game/Game";
import GameUI from "./features/game/components/GameUI";
import { useHighscore } from "./features/game/hooks/useHighscore";
import {
  INITIAL_LIVES,
  GAME_OVER_LIVES,
} from "./features/game/config/constants";

function App() {
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(INITIAL_LIVES);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDead, setIsDead] = useState<boolean>(false);

  const { highscore, updateHighscore } = useHighscore();

  const handleStart = () => {
    setIsPlaying(true);
    setIsDead(false);
    setScore(0);
    setLives(INITIAL_LIVES);
  };

  const handleGameOver = () => {
    updateHighscore(score);
    setIsDead(true);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (lives === GAME_OVER_LIVES) {
      handleGameOver();
    }
  }, [lives]);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center font-sans text-white">
      {isDead && !isPlaying ? (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-800">
          <h1 className="mb-8 text-5xl">Game Over!</h1>
          <p className="mb-4 text-lg">
            <b>Your Score:</b> <span className="text-yellow-400">{score}</span>
          </p>
          <p className="text-md mb-4">
            <b>Local Highscore:</b>{" "}
            <span className="text-cyan-400">{highscore}</span>
          </p>
          {score > highscore && (
            <p className="text-lg font-bold text-yellow-400">
              Congratulations! You beat the highscore.
            </p>
          )}
          <button
            className="mt-8 rounded-xl bg-white px-10 py-2 text-black"
            onClick={handleStart}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <Game
            isPlaying={isPlaying}
            onGameStart={handleStart}
            onScoreChange={setScore}
            onLivesChange={setLives}
          />
          <GameUI
            score={score}
            lives={lives}
            isPlaying={isPlaying}
            onStart={handleStart}
          />
        </>
      )}
    </div>
  );
}

export default App;
