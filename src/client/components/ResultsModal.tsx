interface ResultsModalProps {
    score: number;
    rank: number | null;
    personalBest: boolean;
    totalChains: number;
    onPlayAgain: () => void;
    onViewLeaderboard: () => void;
    onShare: () => void;
}

export function ResultsModal({
    score,
    rank,
    personalBest,
    totalChains,
    onPlayAgain,
    onViewLeaderboard,
    onShare,
}: ResultsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="mb-2 text-4xl font-bold text-white">
                        🎮 Game Over!
                    </h2>
                    {personalBest && (
                        <div className="animate-pulse rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2">
                            <span className="text-lg font-bold text-white">
                                🎉 NEW PERSONAL BEST!
                            </span>
                        </div>
                    )}
                </div>

                {/* Score */}
                <div className="mb-6 text-center">
                    <p className="mb-2 text-sm uppercase tracking-wide text-gray-400">
                        Final Score
                    </p>
                    <p className="text-6xl font-bold text-white tabular-nums">
                        {score.toLocaleString()}
                    </p>
                </div>

                {/* Rank */}
                {rank !== null && (
                    <div className="mb-6 text-center">
                        <p className="mb-2 text-sm uppercase tracking-wide text-gray-400">
                            Your Rank
                        </p>
                        <div className="inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3">
                            <p className="text-3xl font-bold text-white">
                                #{rank}
                            </p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onShare}
                        className="
              rounded-xl bg-gradient-to-r from-green-600 to-emerald-600
              px-6 py-4 font-bold text-white shadow-lg
              transition-transform hover:scale-105 active:scale-95
              cursor-pointer
            "
                    >
                        📢 Share Score
                    </button>

                    <button
                        onClick={onViewLeaderboard}
                        className="
              rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
              px-6 py-4 font-bold text-white shadow-lg
              transition-transform hover:scale-105 active:scale-95
              cursor-pointer
            "
                    >
                        📊 View Leaderboard
                    </button>

                    <button
                        onClick={onPlayAgain}
                        className="
              rounded-xl border-2 border-gray-600 bg-gray-800
              px-6 py-4 font-bold text-white shadow-lg
              transition-transform hover:scale-105 hover:border-gray-500
              active:scale-95
              cursor-pointer
            "
                    >
                        🔄 Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}
