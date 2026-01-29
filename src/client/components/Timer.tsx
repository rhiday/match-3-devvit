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
        <div className="flex flex-col items-center gap-2">
            {/* Digital timer display */}
            <div className={`
        relative rounded-2xl bg-gradient-to-br px-6 py-3
        ${getColor()}
        shadow-xl
        ${timeRemaining <= 10 ? 'animate-pulse' : ''}
      `}>
                <div className="absolute inset-0 rounded-2xl bg-white/10" />
                <span className="relative text-4xl font-bold text-white tabular-nums">
                    {Math.ceil(timeRemaining)}s
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-800">
                <div
                    className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-linear`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
