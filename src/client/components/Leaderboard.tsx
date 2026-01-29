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
        <div className="flex flex-col gap-3">
            <div className="text-center mb-3">
                <div className="text-4xl mb-1">🏆</div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                    Daily Leaderboard
                </h2>
            </div>

            {entries.map((entry) => {
                const isCurrentUser = entry.userId === currentUserId;
                const medal = getMedalEmoji(entry.rank);

                return (
                    <div
                        key={entry.userId}
                        className={`
              flex items-center justify-between rounded-2xl p-4
              transition-all duration-200 border-2
              ${isCurrentUser
                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-white/40 shadow-2xl shadow-purple-500/50 scale-105'
                                : medal
                                    ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-yellow-500/30 hover:border-yellow-500/60 hover:scale-[1.02]'
                                    : 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70 hover:border-gray-600/50 hover:scale-[1.02]'
                            }
            `}
                    >
                        <div className="flex items-center gap-3">
                            {/* Rank */}
                            <div className="flex w-14 items-center justify-center">
                                {medal ? (
                                    <span className="text-4xl drop-shadow-lg">{medal}</span>
                                ) : (
                                    <span className="text-xl font-black text-gray-400">
                                        #{entry.rank}
                                    </span>
                                )}
                            </div>

                            {/* Username */}
                            <div className="flex flex-col">
                                <span className={`font-bold ${isCurrentUser ? 'text-white text-lg' : 'text-gray-200'}`}>
                                    {entry.username}
                                    {isCurrentUser && (
                                        <span className="ml-2 text-xs font-black text-yellow-300 bg-white/20 px-2 py-0.5 rounded-full">(YOU)</span>
                                    )}
                                </span>
                                {entry.isPersonalBest && (
                                    <span className="text-xs font-bold text-yellow-300 flex items-center gap-1">
                                        ✨ Personal Best!
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <span className={`text-2xl font-black ${isCurrentUser ? 'text-white' : medal ? 'text-yellow-400' : 'text-purple-400'}`}>
                                {entry.score.toLocaleString()}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
