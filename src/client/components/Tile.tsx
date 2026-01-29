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

// Custom yellow tile SVG
const yellowTileSVG = `<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_122_72)">
<rect width="800" height="800" rx="120" fill="url(#paint0_linear_122_72)"/>
<g filter="url(#filter0_i_122_72)">
<rect x="80" y="80" width="640" height="640" rx="80" fill="white" fill-opacity="0.2"/>
</g>
<g filter="url(#filter1_f_122_72)">
<ellipse cx="270" cy="270" rx="150" ry="150" fill="white" fill-opacity="0.4"/>
</g>
<g style="mix-blend-mode:overlay" opacity="0.2">
<circle cx="400" cy="400" r="400" fill="url(#paint1_radial_122_72)"/>
</g>
</g>
<defs>
<filter id="filter0_i_122_72" x="80" y="80" width="640" height="648" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="8"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_122_72"/>
</filter>
<filter id="filter1_f_122_72" x="40" y="40" width="460" height="460" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_122_72"/>
</filter>
<linearGradient id="paint0_linear_122_72" x1="400" y1="0" x2="400" y2="800" gradientUnits="userSpaceOnUse">
<stop stop-color="#FCD34D"/>
<stop offset="1" stop-color="#F59E0B"/>
</linearGradient>
<radialGradient id="paint1_radial_122_72" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</radialGradient>
<clipPath id="clip0_122_72">
<rect width="800" height="800" rx="120" fill="white"/>
</clipPath>
</defs>
</svg>`;

const TILE_IMAGES: Record<TileColor, string> = {
    red: generateSVG('#ef4444', '#b91c1c'),
    blue: generateSVG('#3b82f6', '#1d4ed8'),
    green: generateSVG('#22c55e', '#15803d'),
    yellow: `data:image/svg+xml;base64,${btoa(yellowTileSVG)}`,
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
