interface TimerProps {
    timeRemaining: number;
}

export function Timer({ timeRemaining }: TimerProps) {
    const percentage = (timeRemaining / 60) * 100;

    // Color changes based on time remaining
    const getColor = () => {
        if (timeRemaining > 40) return 'from-green-500 to-emerald-600';
        if (timeRemaining > 20) return 'from-yellow-500 to-orange-600';
        return 'from-red-500 to-rose-600';
    };

    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            {/* Digital timer display */}
            <div className={`
        relative rounded-2xl bg-gradient-to-br px-4 sm:px-5 py-2
        ${getColor()}
        shadow-xl
        ${timeRemaining <= 10 ? 'animate-pulse' : ''}
      `}>
                <div className="absolute inset-0 rounded-2xl bg-white/10" />
                <div className="relative flex items-baseline gap-1.5">
                    <span className="text-xs font-bold uppercase text-white/80">⏱</span>
                    <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                        {Math.ceil(timeRemaining)}s
                    </span>
                </div>
            </div>

            {/* Progress bar - hidden on small screens */}
            <div className="hidden sm:block h-3 w-20 overflow-hidden rounded-full bg-gray-800 shadow-inner">
                <div
                    className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-linear shadow-lg`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
