import type { TileColor } from '../../shared/types';

interface TileProps {
    color: TileColor | null;
    onClick: () => void;
    isSelected?: boolean;
    isMatched?: boolean;
    isShaking?: boolean;
}

const TILE_COLORS: Record<TileColor, string> = {
    red: 'bg-gradient-to-br from-red-500 to-red-700',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-700',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
};

export function Tile({ color, onClick, isSelected, isMatched, isShaking }: TileProps) {
    if (!color) {
        return <div className="h-full w-full bg-transparent" />;
    }

    return (
        <button
            onClick={onClick}
            className={`
        relative h-full w-full rounded-xl
        transition-all duration-300 ease-out
        ${TILE_COLORS[color]}
        ${isSelected ? 'scale-110 ring-4 ring-white shadow-2xl' : 'scale-100'}
        ${isMatched ? 'explode-animation' : 'opacity-100'}
        ${isShaking ? 'shake-animation' : ''}
        hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
      `}
            aria-label={`${color} tile`}
        >
            {/* Inner glow effect */}
            <div className="absolute inset-2 rounded-lg bg-white/20" />

            {/* Highlight shine */}
            <div className="absolute left-2 top-2 size-4 rounded-full bg-white/40 blur-sm" />

            {/* Explosion particles */}
            {isMatched && (
                <>
                    {[...Array(8)].map((_, i) => {
                        const angle = (i * 45) * Math.PI / 180;
                        const distance = 40;
                        const tx = Math.cos(angle) * distance;
                        const ty = Math.sin(angle) * distance;
                        
                        return (
                            <div
                                key={i}
                                className="absolute left-1/2 top-1/2 size-2 rounded-full bg-white"
                                style={{
                                    '--tx': `${tx}px`,
                                    '--ty': `${ty}px`,
                                    animation: 'particle-burst 0.5s ease-out forwards',
                                } as React.CSSProperties}
                            />
                        );
                    })}
                </>
            )}
        </button>
    );
}
