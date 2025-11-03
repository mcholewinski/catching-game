import { COIN_SOUND_PATH, COIN_SOUND_VOLUME } from "../config/constants";

/**
 * AudioManager - Singleton class to manage game audio
 * Prevents creating multiple Audio instances on re-renders
 */
class AudioManager {
  private static instance: AudioManager;
  private coinSound: HTMLAudioElement;

  private constructor() {
    this.coinSound = new Audio(COIN_SOUND_PATH);
    this.coinSound.volume = COIN_SOUND_VOLUME;
  }

  /**
   * Gets the singleton instance of AudioManager
   * @returns The AudioManager instance
   */
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Plays the coin collection sound effect
   */
  public playCoinSound(): void {
    // Clone and play to allow overlapping sounds
    this.coinSound.cloneNode(true) as HTMLAudioElement;
    this.coinSound.currentTime = 0;
    this.coinSound.play().catch((error) => {
      console.warn("Failed to play coin sound:", error);
    });
  }
}

// Export singleton instance
export const audioManager = AudioManager.getInstance();
