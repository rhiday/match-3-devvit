import type { TileColor } from '../../shared/types';

interface TileProps {
    color: TileColor | null;
    onClick: () => void;
    isSelected?: boolean;
    isMatched?: boolean;
    isShaking?: boolean;
}

const TILE_COLORS: Record<TileColor, { from: string; to: string }> = {
    red: { from: '#ef4444', to: '#b91c1c' },
    blue: { from: '#3b82f6', to: '#1d4ed8' },
    green: { from: '#22c55e', to: '#15803d' },
    yellow: { from: '#facc15', to: '#ca8a04' },
    purple: { from: '#a855f7', to: '#7e22ce' },
};

export function Tile({ color, onClick, isSelected, isMatched, isShaking }: TileProps) {
    if (!color) {
        return <div className="h-full w-full bg-gray-700 rounded-xl" />;
    }

    // Solid colors as fallback for mobile
    const solidColors: Record<TileColor, string> = {
        red: '#ef4444',
        blue: '#3b82f6',
        green: '#22c55e',
        yellow: '#facc15',
        purple: '#a855f7',
    };

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            style={{
                backgroundColor: solidColors[color],
                background: `linear-gradient(135deg, ${TILE_COLORS[color].from} 0%, ${TILE_COLORS[color].to} 100%)`,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
            }}
            className={`
        relative h-full w-full rounded-xl
        transition-all duration-300 ease-out
        ${isSelected ? 'scale-110 ring-4 ring-white shadow-2xl' : 'scale-100'}
        ${isMatched ? 'explode-animation' : 'opacity-100'}
        ${isShaking ? 'shake-animation' : ''}
        hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
      `}
            aria-label={`${color} tile`}
        >
            {/* Inner glow effect - removed for better mobile visibility */}
            {/* <div className="absolute inset-2 rounded-lg bg-white/20" /> */}

            {/* Highlight shine */}
            <div className="absolute left-2 top-2 size-3 rounded-full bg-white/30" />

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
        </div>
    );
}
