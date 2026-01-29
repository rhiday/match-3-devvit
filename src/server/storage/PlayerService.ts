import type { Context } from '@devvit/web';
import type { PlayerProfile } from '../../shared/types.js';

/**
 * Player Service
 * Manages player profiles and statistics
 */

/**
 * Get or create player profile
 */
export async function getPlayerProfile(
    context: Context,
    userId: string,
    username: string
): Promise<PlayerProfile> {
    const { redis } = context;
    const profileKey = `player:${userId}`;

    const existingProfile = await redis.get(profileKey);

    if (existingProfile) {
        return JSON.parse(existingProfile);
    }

    // Create new profile
    const newProfile: PlayerProfile = {
        userId,
        username,
        totalGamesPlayed: 0,
        totalScore: 0,
        bestScore: 0,
        averageScore: 0,
    };

    await redis.set(profileKey, JSON.stringify(newProfile));

    return newProfile;
}

/**
 * Update player statistics after a game
 */
export async function updatePlayerStats(
    context: Context,
    userId: string,
    gameScore: number
): Promise<void> {
    const { redis } = context;
    const profileKey = `player:${userId}`;

    const profileData = await redis.get(profileKey);

    if (!profileData) {
        console.error(`Player profile not found for ${userId}`);
        return;
    }

    const profile: PlayerProfile = JSON.parse(profileData);

    // Update stats
    profile.totalGamesPlayed += 1;
    profile.totalScore += gameScore;
    profile.bestScore = Math.max(profile.bestScore, gameScore);
    profile.averageScore = Math.round(profile.totalScore / profile.totalGamesPlayed);

    await redis.set(profileKey, JSON.stringify(profile));
}

/**
 * Get top players by total score (all-time leaderboard)
 */
export async function getTopPlayers(
    context: Context,
    limit: number = 10
): Promise<PlayerProfile[]> {
    const { redis } = context;

    // Scan for all player profiles
    // Note: In production, would use a separate sorted set for performance
    const keys = await redis.keys('player:*');
    const profiles: PlayerProfile[] = [];

    for (const key of keys) {
        const profileData = await redis.get(key);
        if (profileData) {
            profiles.push(JSON.parse(profileData));
        }
    }

    // Sort by best score
    profiles.sort((a, b) => b.bestScore - a.bestScore);

    return profiles.slice(0, limit);
}
