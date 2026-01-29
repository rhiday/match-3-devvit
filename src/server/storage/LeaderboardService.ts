import type { Context } from '@devvit/web';
import type { GameResult, LeaderboardEntry } from '../../shared/types.js';

/**
 * Leaderboard Service
 * Manages Redis operations for daily leaderboards and player rankings
 */

/**
 * Save a player's game result to Redis
 * Stores both individual result and updates daily leaderboard
 */
export async function saveGameResult(
    context: Context,
    result: GameResult
): Promise<void> {
    const { redis } = context;
    const dateKey = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Store individual game result
    const gameKey = `game:${result.boardSeed}:${result.userId}`;
    await redis.set(gameKey, JSON.stringify(result));

    // Add to daily leaderboard (sorted set by score)
    const leaderboardKey = `leaderboard:daily:${dateKey}`;
    await redis.zadd(leaderboardKey, {
        member: result.userId,
        score: result.score,
    });

    // Set expiry on leaderboard (30 days)
    await redis.expire(leaderboardKey, 30 * 24 * 60 * 60);

    // Update personal best if necessary
    const personalBestKey = `personal-best:${result.userId}`;
    const currentBest = await redis.get(personalBestKey);

    if (!currentBest || result.score > parseInt(currentBest)) {
        await redis.set(personalBestKey, result.score.toString());
    }
}

/**
 * Get daily leaderboard (top N players)
 * Returns players ranked by score (highest first)
 */
export async function getDailyLeaderboard(
    context: Context,
    dateKey: string,
    limit: number = 10
): Promise<LeaderboardEntry[]> {
    const { redis } = context;
    const leaderboardKey = `leaderboard:daily:${dateKey}`;

    // Get top players (descending order)
    const entries = await redis.zrange(leaderboardKey, 0, limit - 1, {
        reverse: true,
        by: 'rank',
    });

    const leaderboard: LeaderboardEntry[] = [];

    for (let i = 0; i < entries.length; i++) {
        const { member: userId, score } = entries[i];

        // Get player details from game result
        const gameKey = `game:*:${userId}`;
        const gameData = await redis.get(gameKey);

        if (gameData) {
            const result: GameResult = JSON.parse(gameData);

            leaderboard.push({
                rank: i + 1,
                userId,
                username: result.username,
                score,
                timestamp: result.timestamp,
            });
        }
    }

    return leaderboard;
}

/**
 * Get player's rank on daily leaderboard
 * Returns null if player hasn't played today
 */
export async function getPlayerRank(
    context: Context,
    userId: string,
    dateKey: string
): Promise<number | null> {
    const { redis } = context;
    const leaderboardKey = `leaderboard:daily:${dateKey}`;

    const rank = await redis.zrank(leaderboardKey, userId, { reverse: true });

    if (rank === undefined || rank === null) {
        return null;
    }

    return rank + 1; // Convert 0-indexed to 1-indexed
}

/**
 * Check if score is player's personal best
 */
export async function isPersonalBest(
    context: Context,
    userId: string,
    newScore: number
): Promise<boolean> {
    const { redis } = context;
    const personalBestKey = `personal-best:${userId}`;

    const currentBest = await redis.get(personalBestKey);

    if (!currentBest) {
        return true; // First game is always personal best
    }

    return newScore > parseInt(currentBest);
}

/**
 * Get random opponent from today's leaderboard
 * Used for social features like "beat your friend"
 */
export async function getRandomOpponent(
    context: Context,
    currentUserId: string,
    dateKey: string
): Promise<LeaderboardEntry | null> {
    const leaderboard = await getDailyLeaderboard(context, dateKey, 100);

    // Filter out current user
    const opponents = leaderboard.filter((entry) => entry.userId !== currentUserId);

    if (opponents.length === 0) {
        return null;
    }

    // Return random opponent
    const randomIndex = Math.floor(Math.random() * opponents.length);
    return opponents[randomIndex];
}
