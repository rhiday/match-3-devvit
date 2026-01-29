import type { TileColor } from '../../shared/types';

interface TileProps {
    color: TileColor | null;
    onClick: () => void;
    isSelected?: boolean;
    isMatched?: boolean;
    isShaking?: boolean;
    score?: number;
}

// Tile theme sets based on difficulty/score
const TILE_THEMES = {
    // Beginner themes (0-599 score) - friendly, colorful
    beginner: ['candy', 'crystal', 'emerald', 'gem', 'gold', 'wood'],
    // Advanced themes (600+ score) - challenging, intense
    advanced: ['metal', 'volcano', 'cheese', 'goo'],
};

// Map colors to their themed tile images
function getTileImage(color: TileColor, score: number): string {
    const colorIndex = ['red', 'blue', 'green', 'yellow', 'purple'].indexOf(color);
    
    // Determine theme based on score
    if (score >= 600) {
        // Advanced level - use advanced themes
        const themeIndex = colorIndex % TILE_THEMES.advanced.length;
        const theme = TILE_THEMES.advanced[themeIndex];
        return `tiles/${theme}.png`;
    } else {
        // Beginner level - use beginner themes
        const themeIndex = colorIndex % TILE_THEMES.beginner.length;
        const theme = TILE_THEMES.beginner[themeIndex];
        return `tiles/${theme}.png`;
    }
}

export function Tile({ color, onClick, isSelected, isMatched, isShaking, score = 0 }: TileProps) {
    if (!color) {
        return <div style={{ width: '100%', height: '100%', background: '#374151', borderRadius: '12px' }} />;
    }

    const tileImage = getTileImage(color, score);

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
                position: 'relative',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                opacity: isMatched ? 0 : 1,
                transition: 'all 0.3s ease-out',
                filter: isSelected ? 'drop-shadow(0 0 8px white)' : 'none',
                WebkitTapHighlightColor: 'transparent',
            }}
            className={isShaking ? 'shake-animation' : ''}
            aria-label={`${color} tile`}
        >
            <img 
                src={tileImage}
                alt={color}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    borderRadius: '12px',
                    objectFit: 'cover',
                }}
                draggable={false}
            />

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
