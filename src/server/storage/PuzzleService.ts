import type { Context } from '@devvit/web';
import type { DailyPuzzle } from '../../shared/types.js';
import { generateSeedFromDate } from '../../shared/game/Board.js';

/**
 * Puzzle Service
 * Manages daily puzzle generation and storage
 */

/**
 * Get or create today's puzzle
 * Ensures all players get the same puzzle seed for a given date
 */
export async function getTodaysPuzzle(context: Context): Promise<DailyPuzzle> {
    const { redis } = context;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const puzzleKey = `puzzle:${today}`;

    // Check if puzzle already exists
    const existingPuzzle = await redis.get(puzzleKey);

    if (existingPuzzle) {
        return JSON.parse(existingPuzzle);
    }

    // Generate new puzzle
    const seed = generateSeedFromDate(today);
    const puzzle: DailyPuzzle = {
        date: today,
        seed,
        difficulty: 'medium', // Can be dynamic in future
    };

    // Store puzzle (expires in 2 days)
    await redis.set(puzzleKey, JSON.stringify(puzzle));
    await redis.expire(puzzleKey, 2 * 24 * 60 * 60);

    return puzzle;
}

/**
 * Get puzzle for specific date
 */
export async function getPuzzleByDate(
    context: Context,
    dateString: string
): Promise<DailyPuzzle> {
    const { redis } = context;
    const puzzleKey = `puzzle:${dateString}`;

    const existingPuzzle = await redis.get(puzzleKey);

    if (existingPuzzle) {
        return JSON.parse(existingPuzzle);
    }

    // Generate puzzle for that date
    const seed = generateSeedFromDate(dateString);
    const puzzle: DailyPuzzle = {
        date: dateString,
        seed,
        difficulty: 'medium',
    };

    await redis.set(puzzleKey, JSON.stringify(puzzle));
    await redis.expire(puzzleKey, 2 * 24 * 60 * 60);

    return puzzle;
}
