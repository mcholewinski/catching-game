import type { Direction } from "../types";

// Player Configuration
export const PLAYER_SPEED = 3;
export const PLAYER_SIZE = 100;
export const PLAYER_Y_OFFSET = 200; // Distance from bottom of canvas

// Item Configuration
export const ITEM_SIZE = 30;
export const ITEM_SPAWN_INTERVAL = 2000; // milliseconds
export const ITEM_FALL_SPEED = 2;

// Game Configuration
export const INITIAL_LIVES = 10;
export const SCORE_PER_ITEM = 10;
export const GAME_OVER_LIVES = 0;

// Item Spawn Configuration
export const ITEM_SPAWN_PADDING = 50; // Padding from canvas edges
export const ITEM_SPAWN_Y_MIN = -100;
export const ITEM_SPAWN_Y_MAX = -30;

// Player Controls
export const DIRECTION_KEYS: Record<string, Direction> = {
  KeyA: "LEFT",
  KeyD: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
};

// Audio Configuration
export const COIN_SOUND_VOLUME = 0.2;
export const COIN_SOUND_PATH = "assets/coin.flac";

// Canvas Configuration
export const MAX_CANVAS_WIDTH = 1600;
