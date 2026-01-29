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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl border-2 border-purple-500/30 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="text-6xl mb-3">🎮</div>
                    <h2 className="mb-4 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                        Game Over!
                    </h2>
                    {personalBest && (
                        <div className="animate-bounce rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 px-6 py-3 border-2 border-white/20 shadow-xl">
                            <span className="text-xl font-black text-white">
                                🎉 NEW PERSONAL BEST! 🎉
                            </span>
                        </div>
                    )}
                </div>

                {/* Score */}
                <div className="mb-6 text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-300">
                        Final Score
                    </p>
                    <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 tabular-nums">
                        {score.toLocaleString()}
                    </p>
                    {totalChains > 0 && (
                        <p className="mt-3 text-lg font-bold text-orange-400">
                            ⚡ Max Chain: ×{totalChains}
                        </p>
                    )}
                </div>

                {/* Rank */}
                {rank !== null && (
                    <div className="mb-6 text-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-300">
                            Your Rank
                        </p>
                        <div className="inline-block rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 px-8 py-4 border-2 border-white/20 shadow-xl">
                            <p className="text-4xl font-black text-white">
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
              rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600
              px-6 py-4 font-black text-lg text-white shadow-2xl
              hover:scale-105 active:scale-95 transition-all
              cursor-pointer border-2 border-white/20 hover:shadow-green-500/50
            "
                    >
                        📢 Share Score
                    </button>

                    <button
                        onClick={onViewLeaderboard}
                        className="
              rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600
              px-6 py-4 font-black text-lg text-white shadow-2xl
              hover:scale-105 active:scale-95 transition-all
              cursor-pointer border-2 border-white/20 hover:shadow-blue-500/50
            "
                    >
                        📊 View Leaderboard
                    </button>

                    <button
                        onClick={onPlayAgain}
                        className="
              rounded-2xl border-2 border-gray-500 bg-gray-800/50
              px-6 py-4 font-black text-lg text-white shadow-xl
              hover:scale-105 hover:border-gray-400 hover:bg-gray-700/50
              active:scale-95 transition-all
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
