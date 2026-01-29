import '../index.css';

import { navigateTo } from '@devvit/web/client';
import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen py-8 bg-gradient-to-br from-[#0c1821] via-[#1a2634] to-[#0c1821]">
      {/* Top spacer */}
      <div className="flex-1" />
      
      {/* Main content */}
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="relative">
          <img 
            className="object-contain w-48 max-w-[200px] mx-auto rounded-3xl shadow-2xl" 
            src="snapmatch.jpeg" 
            alt="SnapMatch Logo" 
          />
        </div>
        
        {/* Welcome message */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-black text-center text-white tracking-wide">
            Welcome, {context.username ?? 'player'}! 👋
          </h1>
          <p className="text-lg text-center text-gray-300 max-w-md px-4 font-medium">
            Match 3+ tiles · Create combos · Climb the leaderboard
          </p>
        </div>
        
        {/* Start button */}
        <div className="flex items-center justify-center mt-2">
          <button
            className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-black w-auto h-14 rounded-full cursor-pointer transition-all active:scale-95 hover:scale-105 px-8 shadow-2xl animate-pulse hover:animate-none"
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
          >
            🎮 Tap to Start
          </button>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div className="flex-1" />
      
      {/* Footer links */}
      <footer className="flex gap-3 text-sm text-gray-400 pb-4">
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
