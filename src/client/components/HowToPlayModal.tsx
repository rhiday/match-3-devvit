interface HowToPlayModalProps {
    onClose: () => void;
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl border-2 border-purple-500/30 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                        How to Play
                    </h2>
                    <div className="text-4xl mt-2">🎮</div>
                </div>

                {/* Instructions */}
                <div className="mb-6 space-y-3 text-gray-300">
                    <div className="rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-[1.02]">
                        <h3 className="mb-2 font-black text-lg text-purple-300 flex items-center gap-2">
                            <span className="text-2xl">🎯</span> Goal
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Score as many points as possible in <strong className="text-white">60 seconds</strong> by matching 3+ tiles of the same color!
                        </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-5 border border-blue-500/20 hover:border-blue-400/40 transition-all hover:scale-[1.02]">
                        <h3 className="mb-2 font-black text-lg text-blue-300 flex items-center gap-2">
                            <span className="text-2xl">🎲</span> How to Match
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Click a tile, then click an <strong className="text-white">adjacent</strong> tile to swap them. Match 3+ same colors in a row!
                        </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-orange-900/40 to-pink-900/40 p-5 border border-orange-500/20 hover:border-orange-400/40 transition-all hover:scale-[1.02]">
                        <h3 className="mb-2 font-black text-lg text-orange-300 flex items-center gap-2">
                            <span className="text-2xl">⚡</span> Combos & Chains
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Chain reactions multiply your score: <strong className="text-white">×1, ×2, ×3...</strong> Keep the combos going!
                        </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-yellow-900/40 to-orange-900/40 p-5 border border-yellow-500/20 hover:border-yellow-400/40 transition-all hover:scale-[1.02]">
                        <h3 className="mb-2 font-black text-lg text-yellow-300 flex items-center gap-2">
                            <span className="text-2xl">🏆</span> Compete
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Everyone plays the same daily puzzle. Beat your friends on the leaderboard!
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="
                        w-full rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
                        px-6 py-5 font-black text-xl text-white shadow-2xl
                        hover:scale-105 active:scale-95 transition-all hover:shadow-orange-500/50
                        border-2 border-white/20
                    "
                >
                    Got it! Let's Play 🚀
                </button>
            </div>
        </div>
    );
}
