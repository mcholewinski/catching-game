import { useEffect, useState } from "react";

const HIGHSCORE_KEY = "highscore";

/**
 * Custom hook to manage highscore in localStorage
 * @returns Object with highscore value and updateHighscore function
 */
export const useHighscore = () => {
  const [highscore, setHighscore] = useState<number>(0);

  // Load highscore from localStorage on mount
  useEffect(() => {
    const stored = Number(localStorage.getItem(HIGHSCORE_KEY) || 0);
    setHighscore(stored);
  }, []);

  /**
   * Updates the highscore if the new score is higher
   * @param newScore - The new score to compare
   * @returns True if highscore was updated, false otherwise
   */
  const updateHighscore = (newScore: number): boolean => {
    if (newScore > highscore) {
      setHighscore(newScore);
      localStorage.setItem(HIGHSCORE_KEY, String(newScore));
      return true;
    }
    return false;
  };

  return { highscore, updateHighscore };
};
