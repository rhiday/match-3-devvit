interface ScoreDisplayProps {
    score: number;
    totalChains: number;
}

export function ScoreDisplay({ score, totalChains }: ScoreDisplayProps) {
    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            {/* Score */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 px-4 sm:px-5 py-2 shadow-xl">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-purple-200">
                        Score
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                        {score.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Chain counter */}
            {totalChains > 0 && (
                <div className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 px-3 py-2 shadow-lg animate-bounce">
                    <div className="flex items-center gap-0.5">
                        <span className="text-xl sm:text-2xl">⚡</span>
                        <span className="text-xl sm:text-2xl font-black text-white">
                            ×{totalChains}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
