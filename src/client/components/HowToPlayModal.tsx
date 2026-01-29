interface HowToPlayModalProps {
    onClose: () => void;
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-4xl font-bold text-white">
                        🎮 How to Play
                    </h2>
                </div>

                {/* Instructions */}
                <div className="mb-6 space-y-4 text-gray-300">
                    <div className="rounded-xl bg-gray-800/50 p-4">
                        <h3 className="mb-2 font-bold text-white">🎯 Goal</h3>
                        <p className="text-sm">
                            Score as many points as possible in 60 seconds by matching 3+ tiles of the same color.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-800/50 p-4">
                        <h3 className="mb-2 font-bold text-white">🎲 How to Match</h3>
                        <p className="text-sm">
                            Click a tile, then click an <strong>adjacent</strong> tile (up, down, left, or right) to swap them.
                            The swap only works if it creates a match of 3+ same-colored tiles in a row or column.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-800/50 p-4">
                        <h3 className="mb-2 font-bold text-white">⚡ Combos & Chains</h3>
                        <p className="text-sm">
                            When tiles disappear, new ones fall down and can create <strong>chain reactions</strong>.
                            Each chain multiplies your score: 1st match = ×1, 2nd = ×2, 3rd = ×3, and so on!
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-800/50 p-4">
                        <h3 className="mb-2 font-bold text-white">🏆 Compete</h3>
                        <p className="text-sm">
                            Everyone plays the same daily puzzle. Beat your friends on the global leaderboard!
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="
                        w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600
                        px-6 py-4 font-bold text-white shadow-lg
                        transition-transform hover:scale-105 active:scale-95
                    "
                >
                    Got it! Let's Play 🚀
                </button>
            </div>
        </div>
    );
}
