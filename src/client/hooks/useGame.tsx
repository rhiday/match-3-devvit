import { useState, useEffect } from 'react';

interface GameInitData {
    username: string;
    userId: string;
    puzzle: {
        date: string;
        seed: number;
        difficulty: string;
    };
}

export function useGame() {
    const [loading, setLoading] = useState(true);
    const [initData, setInitData] = useState<GameInitData | null>(null);

    // Initialize game on mount
    useEffect(() => {
        async function fetchInitData() {
            try {
                const response = await fetch('/api/init');
                const data = await response.json();

                setInitData({
                    username: data.username,
                    userId: data.userId,
                    puzzle: data.puzzle,
                });
            } catch (error) {
                console.error('Failed to initialize game:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchInitData();
    }, []);

    // Submit score function
    const submitScore = async (score: number, totalChains: number) => {
        try {
            const response = await fetch('/api/submit-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score, totalChains }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to submit score:', error);
            throw error;
        }
    };

    return {
        loading,
        username: initData?.username ?? '',
        userId: initData?.userId ?? '',
        puzzle: initData?.puzzle,
        submitScore,
    };
}
