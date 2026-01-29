interface ScoreDisplayProps {
    score: number;
    totalChains: number;
}

export function ScoreDisplay({ score, totalChains }: ScoreDisplayProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            {/* Score */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 px-6 py-3 shadow-xl">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-medium uppercase tracking-wide text-purple-200">
                        Score
                    </span>
                    <span className="text-4xl font-bold text-white tabular-nums">
                        {score.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Chain counter */}
            {totalChains > 0 && (
                <div className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase text-orange-100">
                            Max Chain
                        </span>
                        <span className="text-2xl font-bold text-white">
                            ×{totalChains}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
