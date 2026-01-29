import type { Board, Tile } from '../types.js';
import { generateNewTile } from './Board.js';

/**
 * Cascade Engine
 * Handles dropping tiles down after matches are cleared
 * and spawning new tiles at the top
 */

const BOARD_SIZE = 5;

/**
 * Remove matched tiles from the board (set to null)
 */
export function clearMatches(
    board: Board,
    matchedTiles: Set<string>
): Board {
    const newTiles = board.tiles.map((row) => [...row]);

    for (const posStr of matchedTiles) {
        const [row, col] = posStr.split(',').map(Number);
        newTiles[row][col] = {
            ...newTiles[row][col],
            color: null,
        };
    }

    return {
        ...board,
        tiles: newTiles,
    };
}

/**
 * Drop tiles down to fill empty spaces
 * Returns updated board and whether any changes occurred
 */
export function dropTiles(board: Board): {
    board: Board;
    changed: boolean;
} {
    const newTiles = board.tiles.map((row) => [...row]);
    let changed = false;

    // Process each column from bottom to top
    for (let col = 0; col < BOARD_SIZE; col++) {
        // Collect all non-null tiles in this column
        const column: Tile[] = [];
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (newTiles[row][col].color !== null) {
                column.push(newTiles[row][col]);
            }
        }

        // Fill column from bottom
        let writeRow = BOARD_SIZE - 1;
        for (const tile of column) {
            if (writeRow !== tile.row) {
                changed = true;
            }
            newTiles[writeRow][col] = {
                ...tile,
                row: writeRow,
            };
            writeRow--;
        }

        // Fill remaining top spaces with null (will be filled later)
        while (writeRow >= 0) {
            if (newTiles[writeRow][col].color !== null) {
                changed = true;
            }
            newTiles[writeRow][col] = {
                ...newTiles[writeRow][col],
                color: null,
            };
            writeRow--;
        }
    }

    return {
        board: { ...board, tiles: newTiles },
        changed,
    };
}

/**
 * Spawn new tiles at the top to fill empty spaces
 */
export function spawnNewTiles(board: Board): Board {
    const newTiles = board.tiles.map((row) => [...row]);

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (newTiles[row][col].color === null) {
                newTiles[row][col] = generateNewTile(row, col);
            }
        }
    }

    return {
        ...board,
        tiles: newTiles,
    };
}

/**
 * Full cascade: clear matches, drop tiles, spawn new tiles
 * Returns updated board
 */
export function cascadeBoard(
    board: Board,
    matchedTiles: Set<string>
): Board {
    // Step 1: Clear matched tiles
    let currentBoard = clearMatches(board, matchedTiles);

    // Step 2: Drop existing tiles down
    const dropResult = dropTiles(currentBoard);
    currentBoard = dropResult.board;

    // Step 3: Spawn new tiles at top
    currentBoard = spawnNewTiles(currentBoard);

    return currentBoard;
}
