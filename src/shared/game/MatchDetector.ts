import type { Board, Match, TileColor } from '../types.js';

/**
 * Match Detection Engine
 * Finds all matches (3+ consecutive tiles) on the board
 */

const BOARD_SIZE = 5;
const MIN_MATCH_SIZE = 3;

/**
 * Find all horizontal matches (left to right)
 */
function findHorizontalMatches(board: Board): Match[] {
    const matches: Match[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
        let currentColor: TileColor | null = null;
        let consecutiveTiles: { row: number; col: number }[] = [];

        for (let col = 0; col < BOARD_SIZE; col++) {
            const tile = board.tiles[row][col];

            if (tile.color && tile.color === currentColor) {
                // Continue the current match
                consecutiveTiles.push({ row, col });
            } else {
                // Check if previous sequence was a match
                if (consecutiveTiles.length >= MIN_MATCH_SIZE && currentColor) {
                    matches.push({
                        tiles: [...consecutiveTiles],
                        color: currentColor,
                        size: consecutiveTiles.length,
                    });
                }

                // Start new sequence
                currentColor = tile.color;
                consecutiveTiles = tile.color ? [{ row, col }] : [];
            }
        }

        // Check final sequence in row
        if (consecutiveTiles.length >= MIN_MATCH_SIZE && currentColor) {
            matches.push({
                tiles: [...consecutiveTiles],
                color: currentColor,
                size: consecutiveTiles.length,
            });
        }
    }

    return matches;
}

/**
 * Find all vertical matches (top to bottom)
 */
function findVerticalMatches(board: Board): Match[] {
    const matches: Match[] = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
        let currentColor: TileColor | null = null;
        let consecutiveTiles: { row: number; col: number }[] = [];

        for (let row = 0; row < BOARD_SIZE; row++) {
            const tile = board.tiles[row][col];

            if (tile.color && tile.color === currentColor) {
                // Continue the current match
                consecutiveTiles.push({ row, col });
            } else {
                // Check if previous sequence was a match
                if (consecutiveTiles.length >= MIN_MATCH_SIZE && currentColor) {
                    matches.push({
                        tiles: [...consecutiveTiles],
                        color: currentColor,
                        size: consecutiveTiles.length,
                    });
                }

                // Start new sequence
                currentColor = tile.color;
                consecutiveTiles = tile.color ? [{ row, col }] : [];
            }
        }

        // Check final sequence in column
        if (consecutiveTiles.length >= MIN_MATCH_SIZE && currentColor) {
            matches.push({
                tiles: [...consecutiveTiles],
                color: currentColor,
                size: consecutiveTiles.length,
            });
        }
    }

    return matches;
}

/**
 * Merge overlapping matches (e.g., L-shapes, T-shapes)
 * Returns deduplicated list of tile positions
 */
function mergeMatches(matches: Match[]): Set<string> {
    const matchedTiles = new Set<string>();

    for (const match of matches) {
        for (const tile of match.tiles) {
            matchedTiles.add(`${tile.row},${tile.col}`);
        }
    }

    return matchedTiles;
}

/**
 * Main function: Find all matches on the board
 * Returns both the matches array and a set of matched tile positions
 */
export function findMatches(board: Board): {
    matches: Match[];
    matchedTiles: Set<string>;
} {
    const horizontalMatches = findHorizontalMatches(board);
    const verticalMatches = findVerticalMatches(board);

    const allMatches = [...horizontalMatches, ...verticalMatches];
    const matchedTiles = mergeMatches(allMatches);

    return {
        matches: allMatches,
        matchedTiles,
    };
}

/**
 * Check if board has any matches (helper for validation)
 */
export function hasAnyMatches(board: Board): boolean {
    const { matches } = findMatches(board);
    return matches.length > 0;
}
