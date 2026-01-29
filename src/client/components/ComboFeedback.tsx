import { useEffect, useState } from 'react';

interface ComboFeedbackProps {
    points: number;
    chainDepth: number;
}

export function ComboFeedback({ points, chainDepth }: ComboFeedbackProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 1000);
        return () => clearTimeout(timer);
    }, [points, chainDepth]);

    if (!visible || points === 0) return null;

    const isCombo = chainDepth > 1;

    return (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
            <div
                className={`
                    animate-bounce text-center font-bold
                    ${isCombo ? 'text-6xl text-yellow-400' : 'text-4xl text-white'}
                    drop-shadow-2xl
                `}
                style={{
                    animation: 'float-up 1s ease-out forwards',
                }}
            >
                {isCombo && (
                    <div className="mb-2 text-5xl text-orange-500">
                        {chainDepth}x CHAIN! 🔥
                    </div>
                )}
                <div className="text-white drop-shadow-lg">
                    +{points} pts
                </div>
            </div>
        </div>
    );
}
