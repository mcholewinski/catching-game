interface GameUIProps {
  score: number
  isPlaying: boolean
  onStart: () => void
}

function GameUI ({ score, isPlaying, onStart }: GameUIProps) {
  return (
    <div className="absolute">
      <div className="text-3xl font-bold mb-3 text-game-primary drop-shadow-lg">
        Score: {score}
      </div>
      {!isPlaying && (
        <button
          onClick={onStart}
          className="px-6 py-3 text-lg font-semibold bg-game-primary hover:bg-opacity-90 transition-all duration-200 border-none rounded-lg text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start Game
        </button>
      )}
      {isPlaying && (
        <div className="text-sm text-gray-400 mt-2">
          Use Arrow Keys or WASD to move
        </div>
      )}
    </div>
  )
}

export default GameUI