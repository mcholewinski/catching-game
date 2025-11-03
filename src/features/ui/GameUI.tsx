interface GameUIProps {
  score: number
  lives: number
  isPlaying: boolean
  onStart: () => void
}

function GameUI({ score, lives, isPlaying, onStart }: GameUIProps) {
  return (
    <div className="h-20 w-full absolute bottom-0 flex justify-around items-center bg-black">
      <div className="text-xl font-bold text-yellow-300">
        Score: {score}
      </div>
      {!isPlaying ? (
        <button
          onClick={onStart}
          className="text-sm px-4 py-2 rounded-xl text-black font-semibold bg-white hover:bg-opacity-90"
        >
          START GAME
        </button>
      ) : <div className="text-sm text-black-600">
        Use Left/Right Arrow Keys or "A" and "D" to move
      </div>}
      <div className="text-xl font-bold text-red-700">
        Lives: {lives}
      </div>
    </div>
  )
}

export default GameUI