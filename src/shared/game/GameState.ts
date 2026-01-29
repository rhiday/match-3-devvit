import type { Board, GameState } from '../types.js';
import { generateDailyBoard } from './Board.js';
import { findMatches } from './MatchDetector.js';
import { cascadeBoard } from './Cascade.js';
import { calculateScore } from './Scoring.js';

/**
 * Game State Manager
 * Orchestrates game logic and state updates
 */

const INITIAL_TIME = 60; // 60 seconds per game

/**
 * Initialize a new game with a daily board
 */
export function initializeGame(dateString: string): GameState {
    const board = generateDailyBoard(dateString);

    return {
        board,
        score: 0,
        moves: 0,
        timeRemaining: INITIAL_TIME,
        gameOver: false,
        gameStarted: false,
        totalChains: 0,
        currentChainDepth: 0,
    };
}

/**
 * Check if player's move is valid (swap creates matches)
 */
export function isValidMove(
    board: Board,
    from: { row: number; col: number },
    to: { row: number; col: number }
): boolean {
    // Check if tiles are adjacent
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);

    if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
        return false;
    }

    // Can't swap with empty tiles
    const fromTile = board.tiles[from.row]?.[from.col];
    const toTile = board.tiles[to.row]?.[to.col];
    
    if (!fromTile || !toTile || !fromTile.color || !toTile.color) {
        return false;
    }

    // Simulate the swap
    const swappedBoard = swapTiles(board, from, to);

    // Check if swap creates any matches
    const { matches } = findMatches(swappedBoard);
    return matches.length > 0;
}

/**
 * Swap two tiles on the board
 */
export function swapTiles(
    board: Board,
    tile1: { row: number; col: number },
    tile2: { row: number; col: number }
): Board {
    const newTiles = board.tiles.map((row) => [...row]);

    const temp = newTiles[tile1.row][tile1.col];
    newTiles[tile1.row][tile1.col] = newTiles[tile2.row][tile2.col];
    newTiles[tile2.row][tile2.col] = temp;

    // Update row/col properties
    newTiles[tile1.row][tile1.col] = {
        ...newTiles[tile1.row][tile1.col],
        row: tile1.row,
        col: tile1.col,
    };
    newTiles[tile2.row][tile2.col] = {
        ...newTiles[tile2.row][tile2.col],
        row: tile2.row,
        col: tile2.col,
    };

    return { ...board, tiles: newTiles };
}

/**
 * Process cascades and update score
 * Returns updated game state, whether cascading continues, matched tile positions, and points earned
 */
export function processCascade(state: GameState): {
    newState: GameState;
    hasMoreCascades: boolean;
    matchedTilePositions: Set<string>;
    pointsEarned: number;
    chainDepth: number;
    maxMatchSize: number;
} {
    let currentBoard = state.board;
    let currentScore = state.score;
    let chainDepth = state.currentChainDepth;

    // Find matches
    const { matches, matchedTiles } = findMatches(currentBoard);

    if (matches.length === 0) {
        // No more cascades
        return {
            newState: {
                ...state,
                currentChainDepth: 0,
            },
            hasMoreCascades: false,
            matchedTilePositions: new Set(),
            pointsEarned: 0,
            chainDepth: 0,
            maxMatchSize: 0,
        };
    }

    // Increment chain depth
    chainDepth++;

    // Find the largest match size
    const maxMatchSize = Math.max(...matches.map(m => m.size));

    // Calculate score with multiplier
    const points = calculateScore(matches, chainDepth);
    currentScore += points;

    // Cascade the board
    currentBoard = cascadeBoard(currentBoard, matchedTiles);

    return {
        newState: {
            ...state,
            board: currentBoard,
            score: currentScore,
            currentChainDepth: chainDepth,
            totalChains: Math.max(state.totalChains, chainDepth),
        },
        hasMoreCascades: true,
        matchedTilePositions: matchedTiles,
        pointsEarned: points,
        chainDepth,
        maxMatchSize,
    };
}

/**
 * Start the game (begins the timer)
 */
export function startGame(state: GameState): GameState {
    return {
        ...state,
        gameStarted: true,
    };
}

/**
 * Update game time (called every second)
 */
export function updateTime(state: GameState, deltaSeconds: number): GameState {
    const newTimeRemaining = Math.max(0, state.timeRemaining - deltaSeconds);

    return {
        ...state,
        timeRemaining: newTimeRemaining,
        gameOver: newTimeRemaining === 0,
    };
}

/**
 * Make a move (swap tiles and process resulting cascades)
 * Returns updated state or null if move is invalid
 */
export function makeMove(
    state: GameState,
    from: { row: number; col: number },
    to: { row: number; col: number }
): GameState | null {
    if (state.gameOver) return null;
    if (!isValidMove(state.board, from, to)) return null;

    // Swap tiles
    const newBoard = swapTiles(state.board, from, to);

    return {
        ...state,
        board: newBoard,
        moves: state.moves + 1,
    };
}
