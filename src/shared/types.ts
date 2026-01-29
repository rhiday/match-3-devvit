/**
 * SnapMatch Game Types
 * Core TypeScript interfaces for the match-3 puzzle game
 */

/** Tile colors available in the game */
export type TileColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';

/** Individual tile on the game board */
export interface Tile {
  color: TileColor | null; // null represents empty space
  id: string; // Unique identifier for animations
  row: number;
  col: number;
}

/** 5x5 game board */
export interface Board {
  tiles: Tile[][];
  seed: number; // For deterministic generation
}

/** A match found on the board (3+ consecutive tiles) */
export interface Match {
  tiles: { row: number; col: number }[];
  color: TileColor;
  size: number; // Number of tiles in the match
}

/** Game state during play */
export interface GameState {
  board: Board;
  score: number;
  moves: number;
  timeRemaining: number; // In seconds
  gameOver: boolean;
  gameStarted: boolean; // Whether the game has been started by the player
  totalChains: number; // For chain multiplier tracking
  currentChainDepth: number;
}

/** Player result saved to Redis */
export interface GameResult {
  userId: string;
  username: string;
  score: number;
  timestamp: number;
  boardSeed: number;
  totalChains: number;
}

/** Leaderboard entry */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  timestamp: number;
  isPersonalBest?: boolean;
}

/** Daily puzzle configuration */
export interface DailyPuzzle {
  date: string; // ISO date string (YYYY-MM-DD)
  seed: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

/** Player profile stats */
export interface PlayerProfile {
  userId: string;
  username: string;
  totalGamesPlayed: number;
  totalScore: number;
  bestScore: number;
  averageScore: number;
}
