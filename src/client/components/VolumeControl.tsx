import { useState, useEffect } from 'react';
import { soundManager } from '../utils/sounds';

export function VolumeControl() {
  const [volume, setVolume] = useState(soundManager.getMasterVolume());
  const [isMuted, setIsMuted] = useState(!soundManager.isEnabled());

  useEffect(() => {
    soundManager.setMasterVolume(volume);
  }, [volume]);

  useEffect(() => {
    soundManager.setEnabled(!isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="text-2xl transition-transform hover:scale-110 active:scale-95"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
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
                     [&::-webkit-slider-thumb]:w-4 
                     [&::-webkit-slider-thumb]:h-4 
                     [&::-webkit-slider-thumb]:bg-orange-500 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:hover:bg-orange-600
                     [&::-moz-range-thumb]:w-4 
                     [&::-moz-range-thumb]:h-4 
                     [&::-moz-range-thumb]:bg-orange-500 
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:hover:bg-orange-600"
          />
        </div>
        
        <span className="text-sm text-gray-400 w-10 text-right">
          {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
        </span>
      </div>
    </div>
  );
}
