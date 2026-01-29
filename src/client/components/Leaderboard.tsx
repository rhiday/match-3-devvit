import type { LeaderboardEntry } from '../../shared/types';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
    currentUserId?: string;
    loading?: boolean;
}

export function Leaderboard({ entries, currentUserId, loading }: LeaderboardProps) {
    if (loading) {
        return (
            <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-14 animate-pulse rounded-xl bg-gray-800"
                    />
                ))}
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 text-center backdrop-blur-sm">
                <p className="text-gray-400">No scores yet. Be the first to play!</p>
            </div>
        );
    }

    const getMedalEmoji = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return null;
    };

    return (
        <div className="flex flex-col gap-2">
            <h2 className="mb-2 text-xl font-bold text-white">
                🏆 Daily Leaderboard
            </h2>

            {entries.map((entry) => {
                const isCurrentUser = entry.userId === currentUserId;
                const medal = getMedalEmoji(entry.rank);

                return (
                    <div
                        key={entry.userId}
                        className={`
              flex items-center justify-between rounded-xl p-4
              transition-all duration-200
              ${isCurrentUser
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 ring-2 ring-white shadow-xl'
                                : 'bg-gray-800/70 hover:bg-gray-700/70'
                            }
            `}
                    >
                        <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className="flex w-12 items-center justify-center">
                                {medal ? (
                                    <span className="text-3xl">{medal}</span>
                                ) : (
                                    <span className="text-xl font-bold text-gray-400">
                                        #{entry.rank}
                                    </span>
                                )}
                            </div>

                            {/* Username */}
                            <div className="flex flex-col">
                                <span className={`font-medium ${isCurrentUser ? 'text-white' : 'text-gray-200'}`}>
                                    {entry.username}
                                    {isCurrentUser && (
                                        <span className="ml-2 text-xs text-blue-200">(You)</span>
                                    )}
                                </span>
                                {entry.isPersonalBest && (
                                    <span className="text-xs font-medium text-yellow-300">
                                        🎉 Personal Best!
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <span className={`text-2xl font-bold ${isCurrentUser ? 'text-white' : 'text-purple-400'}`}>
                                {entry.score.toLocaleString()}
                            </span>
                            <span className="ml-1 text-sm text-gray-400">pts</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
