import '../index.css';

import { navigateTo } from '@devvit/web/client';
import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-6 bg-gradient-to-br from-[#0c1821] via-[#1a2634] to-[#0c1821]">
      {/* Logo */}
      <div className="relative">
        <img 
          className="object-contain w-64 max-w-[280px] mx-auto rounded-3xl shadow-2xl" 
          src="snapmatch.jpeg" 
          alt="SnapMatch Logo" 
        />
      </div>
      
      {/* Welcome message */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome, {context.username ?? 'player'}! 👋
        </h1>
        <p className="text-lg text-center text-gray-300 max-w-md px-4">
          Match 3+ tiles. Create combos. Climb the leaderboard.
        </p>
        <p className="text-sm text-center text-gray-400">
          Everyone plays the same puzzle today!
        </p>
      </div>
      
      {/* Start button */}
      <div className="flex items-center justify-center mt-2">
        <button
          className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-bold w-auto h-14 rounded-full cursor-pointer transition-all active:scale-95 px-8 shadow-lg"
          onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        >
          🎮 Tap to Start
        </button>
      </div>
      
      {/* Footer links */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 text-sm text-gray-400">
        <button
          className="cursor-pointer hover:text-white transition-colors"
          onClick={() => navigateTo('https://www.reddit.com/r/SnapMatch')}
        >
          r/SnapMatch
        </button>
        <span className="text-gray-600">|</span>
        <button
          className="cursor-pointer hover:text-white transition-colors"
          onClick={() => navigateTo('https://github.com/yourusername/snapmatch/blob/main/PRIVACY.md')}
        >
          Privacy
        </button>
        <span className="text-gray-600">|</span>
        <button
          className="cursor-pointer hover:text-white transition-colors"
          onClick={() => navigateTo('https://github.com/yourusername/snapmatch/issues')}
        >
          Report Issue
        </button>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
