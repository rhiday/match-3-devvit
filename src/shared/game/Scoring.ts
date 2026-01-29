import type { Match } from '../types.js';

/**
 * Scoring System
 * Calculates points based on match size and chain depth
 */

/**
 * Calculate score for a single match
 * Base formula: matchSize * 10 points
 * Examples:
 * - Match-3 = 30 points
 * - Match-4 = 40 points
 * - Match-5 = 50 points
 */
function calculateMatchScore(matchSize: number): number {
    return matchSize * 10;
}

/**
 * Calculate chain multiplier based on cascade depth
 * 1st chain = x1 (no multiplier)
 * 2nd chain = x2
 * 3rd chain = x3
 * etc.
 */
function getChainMultiplier(chainDepth: number): number {
    return Math.max(1, chainDepth);
}

/**
 * Calculate total score for all matches in a single chain
 * With chain multiplier applied
 */
export function calculateScore(
    matches: Match[],
    chainDepth: number
): number {
    const baseScore = matches.reduce((total, match) => {
        return total + calculateMatchScore(match.size);
    }, 0);

    const multiplier = getChainMultiplier(chainDepth);
    return baseScore * multiplier;
}

/**
 * Calculate bonus points for long chains
 * Awards bonus for 3+ consecutive chains
 */
export function calculateChainBonus(totalChains: number): number {
    if (totalChains < 3) return 0;

    // Bonus: 100 points for each chain beyond 2
    return (totalChains - 2) * 100;
}

/**
 * Calculate final game score with all bonuses
 */
export function calculateFinalScore(
    baseScore: number,
    totalChains: number
): number {
    const chainBonus = calculateChainBonus(totalChains);
    return baseScore + chainBonus;
}
