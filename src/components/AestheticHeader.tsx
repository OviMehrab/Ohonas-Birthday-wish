import React from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface AestheticHeaderProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  title?: string;
}

export const AestheticHeader: React.FC<AestheticHeaderProps> = ({
  isMusicPlaying,
  onToggleMusic,
  title = 'sweetwishes.love',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-pink-100 px-4 py-2.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-1.5 text-xs text-pink-400 font-medium tracking-wide">
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
        <span className="font-serif-display italic">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="music-toggle-btn"
          onClick={onToggleMusic}
          className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all shadow-xs ${
            isMusicPlaying
              ? 'bg-pink-500 text-white shadow-pink-200'
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200'
          }`}
          title={isMusicPlaying ? 'Pause Music' : 'Play Birthday Song'}
        >
          {isMusicPlaying ? (
            <>
              <Music className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-[11px]">Music Playing</span>
              <Volume2 className="w-3 h-3 ml-0.5 animate-pulse" />
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-pink-400" />
              <span className="text-[11px]">Play Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
