import React from 'react';
import { Sparkles, Gift, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  birthdayGirlName: string;
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  birthdayGirlName,
  onStart,
}) => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center relative overflow-hidden">
      {/* Decorative floating ribbon bows and hearts in background */}
      <div className="absolute -top-6 -left-6 text-3xl opacity-30 select-none animate-float">🎀</div>
      <div className="absolute top-1/4 right-3 text-2xl opacity-40 select-none animate-float" style={{ animationDelay: '1.2s' }}>✨</div>
      <div className="absolute bottom-1/3 left-4 text-2xl opacity-30 select-none animate-float" style={{ animationDelay: '2.4s' }}>🌸</div>
      <div className="absolute bottom-10 right-6 text-3xl opacity-35 select-none animate-float" style={{ animationDelay: '0.8s' }}>🎀</div>

      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Soft glowing badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200/70 text-pink-600 text-xs font-medium tracking-wide mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>For My Favorite Girl • Birthday Special</span>
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
        </div>

        {/* Cute Mascot Cat with cupcakes (SVG illustration matching the video's aesthetic) */}
        <div className="relative w-56 h-56 mb-6 flex items-center justify-center">
          {/* Glowing aura */}
          <div className="absolute inset-0 bg-pink-200/40 rounded-full blur-2xl animate-pulse-glow" />

          {/* Detailed cute cartoon cat holding cupcakes */}
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full relative z-10 drop-shadow-md animate-float"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sparkles around cat */}
            <path d="M40 70 L43 78 L51 81 L43 84 L40 92 L37 84 L29 81 L37 78 Z" fill="#FBBF24" opacity="0.9" />
            <path d="M200 65 L202 71 L208 73 L202 75 L200 81 L198 75 L192 73 L198 71 Z" fill="#F472B6" opacity="0.8" />
            <path d="M195 150 L197 155 L202 157 L197 159 L195 164 L193 159 L188 157 L193 155 Z" fill="#FBBF24" opacity="0.8" />
            <path d="M45 165 L47 170 L52 172 L47 174 L45 179 L43 174 L38 172 L43 170 Z" fill="#FB7185" opacity="0.8" />

            {/* Little party hat */}
            <polygon points="120,25 105,70 135,70" fill="#F472B6" />
            <polygon points="120,25 112,70 128,70" fill="#FBBF24" />
            {/* Hat pompom */}
            <circle cx="120" cy="24" r="7" fill="#FDF2F8" stroke="#F43F5E" strokeWidth="1.5" />
            {/* Hat stripes */}
            <path d="M110 52 Q120 56 130 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M114 40 Q120 43 126 40" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />

            {/* Cat Ears */}
            <polygon points="82,65 95,100 68,95" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
            <polygon points="84,72 93,96 73,92" fill="#FCE7F3" />
            <polygon points="158,65 172,95 145,100" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
            <polygon points="156,72 167,92 147,96" fill="#FCE7F3" />

            {/* Cat Head */}
            <ellipse cx="120" cy="115" rx="46" ry="40" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />

            {/* Cat Cheeks Blush */}
            <ellipse cx="96" cy="124" rx="7" ry="5" fill="#FDA4AF" opacity="0.65" />
            <ellipse cx="144" cy="124" rx="7" ry="5" fill="#FDA4AF" opacity="0.65" />

            {/* Cat Eyes (Happy curved arcs) */}
            <path d="M96 112 Q103 104 110 112" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M130 112 Q137 104 144 112" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Cat Cute Nose & Mouth */}
            <polygon points="117,120 123,120 120,123" fill="#F43F5E" />
            <path d="M115 125 Q120 129 120 124 Q120 129 125 125" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Whiskers */}
            <line x1="72" y1="116" x2="88" y2="119" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="72" y1="124" x2="87" y2="124" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="152" y1="119" x2="168" y2="116" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="153" y1="124" x2="168" y2="124" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />

            {/* Cat Body */}
            <path d="M92 145 C86 175 88 198 120 198 C152 198 154 175 148 145 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />

            {/* Cat Paws stretched out holding cupcakes */}
            {/* Left Arm & Paw */}
            <path d="M94 150 C80 148 65 158 60 168 C58 174 65 178 72 172 C78 166 88 160 96 158" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
            {/* Right Arm & Paw */}
            <path d="M146 150 C160 148 175 158 180 168 C182 174 175 178 168 172 C162 166 152 160 144 158" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />

            {/* Left Cupcake */}
            <g transform="translate(42, 142)">
              <polygon points="12,22 8,36 28,36 24,22" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1.5" />
              <path d="M8 22 Q18 10 28 22 Z" fill="#FDA4AF" />
              <circle cx="18" cy="12" r="3.5" fill="#EF4444" />
              {/* Candle on cupcake */}
              <line x1="18" y1="12" x2="18" y2="4" stroke="#FEF08A" strokeWidth="2" />
              <ellipse cx="18" cy="2" rx="2" ry="3" fill="#F59E0B" />
            </g>

            {/* Right Cupcake */}
            <g transform="translate(162, 142)">
              <polygon points="12,22 8,36 28,36 24,22" fill="#FED7AA" stroke="#FB923C" strokeWidth="1.5" />
              <path d="M8 22 Q18 10 28 22 Z" fill="#F472B6" />
              <circle cx="18" cy="12" r="3.5" fill="#EF4444" />
              {/* Candle on cupcake */}
              <line x1="18" y1="12" x2="18" y2="4" stroke="#FEF08A" strokeWidth="2" />
              <ellipse cx="18" cy="2" rx="2" ry="3" fill="#F59E0B" />
            </g>

            {/* Ribbon Bow on cat's chest */}
            <g transform="translate(120, 150)">
              <circle cx="0" cy="0" r="3" fill="#E11D48" />
              <ellipse cx="-8" cy="-1" rx="7" ry="4" fill="#FB7185" transform="rotate(-15)" />
              <ellipse cx="8" cy="-1" rx="7" ry="4" fill="#FB7185" transform="rotate(15)" />
              <path d="M-3 2 L-6 10" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 2 L6 10" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Title and typography */}
        <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#831843] mb-2 leading-tight">
          Happy Birthday, <br />
          <span className="font-handwriting text-3xl sm:text-4xl text-pink-600 block mt-1 drop-shadow-xs">
            {birthdayGirlName}
          </span>
        </h1>

        {/* Main interactive button */}
        <button
          id="open-wishes-btn"
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-pink-300/60 hover:shadow-pink-400/80 hover:scale-105 active:scale-95 transition-all cursor-pointer overflow-hidden border border-pink-200/50"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <Gift className="w-4 h-4 text-pink-100 group-hover:rotate-12 transition-transform" />
          <span>Open Your Wishes 🎁</span>
        </button>

        {/* Small hint */}
        <p className="text-[11px] text-pink-400 mt-4 font-light">
          Tap the button above to begin your journey 🌸
        </p>
      </div>
    </div>
  );
};
