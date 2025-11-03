interface GameUIProps {
  score: number;
  lives: number;
  isPlaying: boolean;
  onStart: () => void;
}

function GameUI({ score, lives, isPlaying, onStart }: GameUIProps) {
  return (
    <div className="absolute bottom-0 flex h-20 w-full items-center justify-around bg-black">
      <div className="text-xl font-bold text-yellow-300">Score: {score}</div>
      {!isPlaying ? (
        <button
          onClick={onStart}
          className="hover:bg-opacity-90 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
        >
          START GAME
        </button>
      ) : (
        <div className="text-black-600 text-sm">
          Use Left/Right Arrow Keys or "A" and "D" to move
        </div>
      )}
      <div className="text-xl font-bold text-red-700">Lives: {lives}</div>
    </div>
  );
}

export default GameUI;
