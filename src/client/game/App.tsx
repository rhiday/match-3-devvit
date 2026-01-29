import { useState, useEffect, useCallback, useRef } from 'react';

import type { GameState, LeaderboardEntry } from '../../shared/types';
import { initializeGame, makeMove, processCascade, updateTime, startGame } from '../../shared/game/GameState';
import { GameBoard } from '../components/GameBoard';
import { Timer } from '../components/Timer';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { Leaderboard } from '../components/Leaderboard';
import { ResultsModal } from '../components/ResultsModal';
import { HowToPlayModal } from '../components/HowToPlayModal';
import { ComboFeedback } from '../components/ComboFeedback';
import { VolumeControl } from '../components/VolumeControl';
import { useGame } from '../hooks/useGame';
import { soundManager } from '../utils/sounds';


export function App() {
  const { username, userId, submitScore } = useGame();

  // Game state
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
  const [matchedTiles, setMatchedTiles] = useState<Set<string>>(new Set());
  const [shakingTile, setShakingTile] = useState<{ row: number; col: number } | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [isPersonalBest, setIsPersonalBest] = useState(false);
  const [isCascading, setIsCascading] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [comboPoints, setComboPoints] = useState(0);
  const [comboChain, setComboChain] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cascadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game on mount
  useEffect(() => {
    const todayISO = new Date().toISOString().split('T')[0];
    const initialState = initializeGame(todayISO);
    setGameState(initialState);
  }, []);

  // Timer logic (decrements every second)
  useEffect(() => {
    if (!gameState || !gameState.gameStarted || gameState.gameOver || isCascading) return;

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (!prev || prev.timeRemaining <= 0) return prev;
        return updateTime(prev, 1);
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState?.gameStarted, gameState?.gameOver, isCascading]);

  // Handle game over
  useEffect(() => {
    if (gameState?.gameOver && !showLeaderboard) {
      handleGameOver();
    }
  }, [gameState?.gameOver]);

  // Process cascades recursively
  const processCascades = useCallback((state: GameState) => {
    setIsCascading(true);

    // Find and mark matched tiles immediately
    const result = processCascade(state);
    
    if (result.hasMoreCascades) {
      // Play appropriate sound based on match size
      if (result.maxMatchSize >= 4) {
        soundManager.play('plop', 0.6);
      } else {
        soundManager.play('pop', 0.5);
      }
      
      // Show combo feedback
      setComboPoints(result.pointsEarned);
      setComboChain(result.chainDepth);

      // Show matched tiles with animation
      setMatchedTiles(result.matchedTilePositions);
      
      // Wait for explosion animation to complete
      setTimeout(() => {
        // Clear matches and update board
        setMatchedTiles(new Set());
        setGameState(result.newState);
        
        // Continue cascading after a brief delay
        setTimeout(() => {
          processCascades(result.newState);
        }, 150);
      }, 500); // Match explosion animation duration
    } else {
      // Done cascading
      setMatchedTiles(new Set());
      setGameState(result.newState);
      setIsCascading(false);
      // Reset combo display after a delay
      setTimeout(() => {
        setComboPoints(0);
        setComboChain(0);
      }, 1000);
    }
  }, []);

  // Start the game
  const handleStartGame = useCallback(() => {
    if (!gameState) return;
    // Play a quiet sound to initialize audio context (browser requirement)
    soundManager.play('pop', 0.01);
    setGameState(startGame(gameState));
  }, [gameState]);

  // Handle tile click
  const handleTileClick = useCallback(
    (row: number, col: number) => {
      if (!gameState || !gameState.gameStarted || gameState.gameOver || isCascading) return;

      const tile = gameState.board.tiles[row]?.[col];
      if (!tile || !tile.color) return; // Can't select empty tile

      if (!selectedTile) {
        // First selection
        setSelectedTile({ row, col });
      } else {
        // Second selection - attempt move
        const newState = makeMove(gameState, selectedTile, { row, col });

        if (newState) {
          setGameState(newState);
          setSelectedTile(null);

          // Start cascade processing
          processCascades(newState);
        } else {
          // Invalid move - shake and deselect
          setShakingTile({ row, col });
          setSelectedTile(null);
          
          // Clear shake after animation completes
          setTimeout(() => {
            setShakingTile(null);
          }, 300);
        }
      }
    },
    [gameState, selectedTile, isCascading, processCascades]
  );

  // Submit score and fetch leaderboard
  const handleGameOver = async () => {
    if (!gameState) return;

    try {
      if (userId && username) {
        const result = await submitScore(gameState.score, gameState.totalChains);

        setPlayerRank(result.rank);
        setIsPersonalBest(result.isPersonalBest);
        setLeaderboard(result.leaderboard);
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
      // Show modal anyway, just without rank/leaderboard
    } finally {
      // Always show results modal
      setShowLeaderboard(true);
    }
  };

  // Reset game
  const handlePlayAgain = () => {
    const todayISO = new Date().toISOString().split('T')[0];
    const newState = initializeGame(todayISO);
    setGameState(newState);
    setSelectedTile(null);
    setMatchedTiles(new Set());
    setShowLeaderboard(false);
    setPlayerRank(null);
    setIsPersonalBest(false);
  };

  // Share score to Reddit
  const handleShare = useCallback(() => {
    if (!gameState) return;
    
    const rankText = playerRank ? `Rank #${playerRank}` : 'Just played';
    const chainText = gameState.totalChains > 1 ? `Max chain: ${gameState.totalChains}x 🔥` : '';
    const pbText = isPersonalBest ? '🎉 NEW PERSONAL BEST!' : '';
    
    const shareText = `I scored ${gameState.score} points on SnapMatch! ${rankText}
${chainText}
${pbText}

Can you beat my score? 🎮`.trim();
    
    // Try clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('✅ Score copied to clipboard!\n\nPaste it in a Reddit comment to share with others.');
        })
        .catch(() => {
          // Fallback: show the text in an alert
          alert(`📋 Copy this text:\n\n${shareText}`);
        });
    } else {
      // Fallback: show the text to copy manually
      alert(`📋 Copy this text:\n\n${shareText}`);
    }
  }, [gameState, playerRank, isPersonalBest]);

  // View leaderboard - for now just acknowledge, leaderboard is already visible
  const handleViewLeaderboard = useCallback(() => {
    alert('📊 Check the leaderboard in the right sidebar to see where you ranked!');
  }, []);

  if (!gameState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-5xl font-bold text-white">
              SnapMatch
            </h1>
            <button
              onClick={() => setShowHowToPlay(true)}
              className="text-2xl text-gray-400 hover:text-white transition-colors"
              title="How to play"
            >
              ❓
            </button>
          </div>
          <p className="text-gray-400">
            Match 3+ tiles to score points. Create chains for multipliers!
          </p>
        </div>

        {/* Game area */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left sidebar - Score & Timer */}
          <div className="flex flex-col gap-6 lg:order-1">
            <ScoreDisplay score={gameState.score} totalChains={gameState.totalChains} />
            <Timer timeRemaining={gameState.timeRemaining} />
            <VolumeControl />
          </div>

          {/* Center - Game board */}
          <div className="lg:order-2 relative">
            <GameBoard
              board={gameState.board}
              onTileClick={handleTileClick}
              selectedTile={selectedTile}
              matchedTiles={matchedTiles}
              shakingTile={shakingTile}
            />
            
            {/* Start game overlay */}
            {!gameState.gameStarted && !gameState.gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl">
                <button
                  onClick={handleStartGame}
                  className="px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-2xl hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
                >
                  Tap to Start
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar - Leaderboard */}
          <div className="lg:order-3">
            {showLeaderboard ? (
              <Leaderboard
                entries={leaderboard}
                currentUserId={userId}
                loading={false}
              />
            ) : (
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm">
                <p className="text-center text-gray-400">
                  Leaderboard will appear after game ends
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Results modal */}
        {gameState.gameOver && showLeaderboard && (
          <ResultsModal
            score={gameState.score}
            rank={playerRank}
            personalBest={isPersonalBest}
            totalChains={gameState.totalChains}
            onPlayAgain={handlePlayAgain}
            onViewLeaderboard={handleViewLeaderboard}
            onShare={handleShare}
          />
        )}

        {/* How to Play modal */}
        {showHowToPlay && (
          <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
        )}

        {/* Combo feedback */}
        <ComboFeedback points={comboPoints} chainDepth={comboChain} />
      </div>
    </div>
  );
}
