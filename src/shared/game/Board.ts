import type { Board, Tile, TileColor } from '../types.js';

/**
 * Generates a deterministic game board using a seed
 * All players with the same seed will get identical boards
 */

const TILE_COLORS: TileColor[] = ['red', 'blue', 'green', 'yellow', 'purple'];
const BOARD_SIZE = 5;

/**
 * Simple seeded random number generator (LCG algorithm)
 * Ensures reproducible "random" numbers for same seed
 */
class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed % 2147483647;
        if (this.seed <= 0) this.seed += 2147483646;
    }

    next(): number {
        this.seed = (this.seed * 16807) % 2147483647;
        return (this.seed - 1) / 2147483646;
    }

    nextInt(max: number): number {
        return Math.floor(this.next() * max);
    }
}

/**
 * Generate board seed from date string
 * Same date = same seed = same board for all players
 */
export function generateSeedFromDate(dateString: string): number {
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Generate a random tile color using seeded RNG
 */
function generateRandomTile(rng: SeededRandom, row: number, col: number): Tile {
    const colorIndex = rng.nextInt(TILE_COLORS.length);
    return {
        color: TILE_COLORS[colorIndex],
        id: `tile-${row}-${col}-${Date.now()}-${Math.random()}`,
        row,
        col,
    };
}

/**
 * Check if a board has any matches (used during generation)
 * We want to avoid starting with pre-existing matches
 */
function hasMatches(tiles: Tile[][]): boolean {
    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
        let consecutiveCount = 1;
        for (let col = 1; col < BOARD_SIZE; col++) {
            if (tiles[row][col].color === tiles[row][col - 1].color) {
                consecutiveCount++;
                if (consecutiveCount >= 3) return true;
            } else {
                consecutiveCount = 1;
            }
        }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
        let consecutiveCount = 1;
        for (let row = 1; row < BOARD_SIZE; row++) {
            if (tiles[row][col].color === tiles[row - 1][col].color) {
                consecutiveCount++;
                if (consecutiveCount >= 3) return true;
            } else {
                consecutiveCount = 1;
            }
        }
    }

    return false;
}

/**
 * Generate a daily board with no initial matches
 * Retries until a valid board is created
 */
export function generateDailyBoard(dateString: string): Board {
    const seed = generateSeedFromDate(dateString);
    const rng = new SeededRandom(seed);

    let tiles: Tile[][];
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    do {
        tiles = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            tiles[row] = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                tiles[row][col] = generateRandomTile(rng, row, col);
            }
        }
        attempts++;
    } while (hasMatches(tiles) && attempts < MAX_ATTEMPTS);

    return { tiles, seed };
}

/**
 * Generate a new tile (used when refilling board after matches)
 */
export function generateNewTile(row: number, col: number): Tile {
    const colorIndex = Math.floor(Math.random() * TILE_COLORS.length);
    return {
        color: TILE_COLORS[colorIndex],
        id: `tile-${row}-${col}-${Date.now()}-${Math.random()}`,
        row,
        col,
    };
}
