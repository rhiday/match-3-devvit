import { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/sounds';

export function VolumeControl() {
  const [volume, setVolume] = useState(soundManager.getMasterVolume());
  const [isMuted, setIsMuted] = useState(!soundManager.isEnabled());
  const [showSlider, setShowSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundManager.setMasterVolume(volume);
  }, [volume]);

  useEffect(() => {
    soundManager.setEnabled(!isMuted);
  }, [isMuted]);

  // Close slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSlider(false);
      }
    };

    if (showSlider) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSlider]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowSlider(!showSlider)}
        onDoubleClick={toggleMute}
        className="text-2xl text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95"
        title={isMuted ? 'Unmute (double-click)' : `Volume: ${Math.round(volume * 100)}% (double-click to mute)`}
      >
        {isMuted ? '🔇' : volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
      </button>

      {/* Dropdown slider */}
      {showSlider && (
        <div className="absolute left-0 mt-2 p-3 rounded-lg border border-gray-700 bg-gray-800/95 backdrop-blur-sm shadow-xl z-10 min-w-[200px]">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-lg text-gray-400 hover:text-white transition-transform hover:scale-110 active:scale-95"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                disabled={isMuted}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         [&::-webkit-slider-thumb]:appearance-none 
                         [&::-webkit-slider-thumb]:w-3 
                         [&::-webkit-slider-thumb]:h-3 
                         [&::-webkit-slider-thumb]:bg-orange-500 
                         [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:hover:bg-orange-600
                         [&::-moz-range-thumb]:w-3 
                         [&::-moz-range-thumb]:h-3 
                         [&::-moz-range-thumb]:bg-orange-500 
                         [&::-moz-range-thumb]:border-0
                         [&::-moz-range-thumb]:rounded-full 
                         [&::-moz-range-thumb]:cursor-pointer
                         [&::-moz-range-thumb]:hover:bg-orange-600"
              />
            </div>
            
            <span className="text-xs text-gray-400 w-8 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
