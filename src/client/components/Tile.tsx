import type { TileColor } from '../../shared/types';

interface TileProps {
    color: TileColor | null;
    onClick: () => void;
    isSelected?: boolean;
    isMatched?: boolean;
    isShaking?: boolean;
}

// Generate SVG data URLs for each color
const generateSVG = (color1: string, color2: string) => {
    const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grad)" rx="12"/>
        <ellipse cx="25" cy="25" rx="8" ry="8" fill="white" opacity="0.3"/>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const TILE_IMAGES: Record<TileColor, string> = {
    red: generateSVG('#ef4444', '#b91c1c'),
    blue: generateSVG('#3b82f6', '#1d4ed8'),
    green: generateSVG('#22c55e', '#15803d'),
    yellow: generateSVG('#facc15', '#ca8a04'),
    purple: generateSVG('#a855f7', '#7e22ce'),
};

export function Tile({ color, onClick, isSelected, isMatched, isShaking }: TileProps) {
    if (!color) {
        return <div style={{ width: '100%', height: '100%', background: '#374151', borderRadius: '12px' }} />;
    }

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
                src={TILE_IMAGES[color]}
                alt={color}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
                draggable={false}
            />
            {/* Inner glow effect - removed for better mobile visibility */}
            {/* <div className="absolute inset-2 rounded-lg bg-white/20" /> */}

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
