import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Share2, Flame, Gift } from 'lucide-react';
import { CloudWish } from '../types';
import { playPopSound, playSparkleSound, playBlowSound } from '../utils/soundEffects';

interface WishCloudsScreenProps {
  birthdayGirlName: string;
  onRestart: () => void;
}

const DEFAULT_CLOUDS: CloudWish[] = [
  {
    id: 1,
    numberLabel: 1,
    wishText: 'Endless Joy',
    emoji: '🌈',
    isOpened: false,
    color: 'from-pink-100 to-rose-200',
  },
  {
    id: 2,
    numberLabel: 2,
    wishText: 'Bliss & Peace',
    emoji: '🌸',
    isOpened: false,
    color: 'from-purple-100 to-pink-200',
  },
  {
    id: 3,
    numberLabel: 3,
    wishText: 'Dream Big',
    emoji: '💫',
    isOpened: false,
    color: 'from-amber-100 to-pink-100',
  },
  {
    id: 4,
    numberLabel: 4,
    wishText: 'Shine Always',
    emoji: '⭐',
    isOpened: false,
    color: 'from-rose-100 to-yellow-100',
  },
  {
    id: 5,
    numberLabel: 5,
    wishText: 'Everlasting Love',
    emoji: '💖',
    isOpened: false,
    color: 'from-fuchsia-100 to-pink-200',
  },
];

export const WishCloudsScreen: React.FC<WishCloudsScreenProps> = ({
  birthdayGirlName,
  onRestart,
}) => {
  const [clouds, setClouds] = useState<CloudWish[]>(DEFAULT_CLOUDS);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fbcfe8', '#fbbf24', '#c084fc'],
    });
  };

  const handleCloudClick = (id: number) => {
    playPopSound();
    playSparkleSound();
    setClouds((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isOpened: true } : c))
    );
  };

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      playBlowSound();
      setTimeout(() => {
        playSparkleSound();
        fireConfetti();
        setTimeout(fireConfetti, 400);
      }, 250);
    } else {
      // Re-light for fun
      setCandlesBlown(false);
      playPopSound();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2500);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between px-4 py-6 max-w-md mx-auto relative">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#831843]">
          Click each cloud to unwrap a wish ✨
        </h2>
        <p className="text-xs text-pink-600/70 mt-1">
          Tap every cloud to reveal a special blessing for your year ahead
        </p>
      </div>

      {/* Fluffy Clouds Canvas / Sky area */}
      <div className="w-full relative min-h-[220px] bg-gradient-to-b from-pink-100/50 via-rose-50/40 to-pink-100/60 rounded-3xl p-4 border border-pink-200/60 flex flex-col justify-around overflow-hidden shadow-inner">
        {/* Floating background clouds decor */}
        <div className="absolute top-2 left-3 opacity-20 text-4xl select-none">☁️</div>
        <div className="absolute bottom-3 right-4 opacity-20 text-3xl select-none">☁️</div>

        {/* Row 1: Cloud 1 & Cloud 2 */}
        <div className="flex justify-around items-center">
          {[clouds[0], clouds[1]].map((cloud) => (
            <button
              key={cloud.id}
              onClick={() => handleCloudClick(cloud.id)}
              className={`group relative transition-all duration-300 transform active:scale-95 cursor-pointer ${
                cloud.isOpened ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {cloud.isOpened ? (
                /* Revealed Wish Pill/Cloud */
                <div className="px-4 py-2.5 rounded-full bg-white/95 border-2 border-pink-300 shadow-md flex items-center gap-1.5 animate-in zoom-in-90">
                  <span className="text-base">{cloud.emoji}</span>
                  <span className="font-serif-display text-xs sm:text-sm font-bold text-pink-700 whitespace-nowrap">
                    {cloud.wishText}
                  </span>
                  <Sparkles className="w-3 h-3 text-pink-400" />
                </div>
              ) : (
                /* Fluffy Numbered Cloud Button */
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 flex items-center justify-center filter drop-shadow-sm group-hover:drop-shadow-md">
                  {/* Fluffy SVG Cloud */}
                  <svg viewBox="0 0 100 65" className="absolute inset-0 w-full h-full fill-white">
                    <path
                      d="M 20 50 
                         A 15 15 0 0 1 25 22 
                         A 20 20 0 0 1 70 18 
                         A 18 18 0 0 1 85 45 
                         A 12 12 0 0 1 80 55 
                         Z"
                      fill="#ffffff"
                      stroke="#fbcfe8"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="relative z-10 font-bold text-pink-600 text-sm sm:text-base font-serif-display">
                    {cloud.numberLabel}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Row 2: Cloud 3 (Center) */}
        <div className="flex justify-center items-center my-1">
          {clouds[2] && (
            <button
              onClick={() => handleCloudClick(clouds[2].id)}
              className={`group relative transition-all duration-300 transform active:scale-95 cursor-pointer ${
                clouds[2].isOpened ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {clouds[2].isOpened ? (
                <div className="px-5 py-2.5 rounded-full bg-white/95 border-2 border-pink-300 shadow-md flex items-center gap-1.5 animate-in zoom-in-90">
                  <span className="text-base">{clouds[2].emoji}</span>
                  <span className="font-serif-display text-xs sm:text-sm font-bold text-pink-700 whitespace-nowrap">
                    {clouds[2].wishText}
                  </span>
                  <Sparkles className="w-3 h-3 text-pink-400" />
                </div>
              ) : (
                <div className="relative w-22 h-15 sm:w-26 sm:h-18 flex items-center justify-center filter drop-shadow-sm group-hover:drop-shadow-md">
                  <svg viewBox="0 0 100 65" className="absolute inset-0 w-full h-full fill-white">
                    <path
                      d="M 20 50 
                         A 15 15 0 0 1 25 22 
                         A 20 20 0 0 1 70 18 
                         A 18 18 0 0 1 85 45 
                         A 12 12 0 0 1 80 55 
                         Z"
                      fill="#ffffff"
                      stroke="#fbcfe8"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="relative z-10 font-bold text-pink-600 text-sm sm:text-base font-serif-display">
                    {clouds[2].numberLabel}
                  </span>
                </div>
              )}
            </button>
          )}
        </div>

        {/* Row 3: Cloud 4 & Cloud 5 */}
        <div className="flex justify-around items-center">
          {[clouds[3], clouds[4]].map((cloud) => (
            <button
              key={cloud.id}
              onClick={() => handleCloudClick(cloud.id)}
              className={`group relative transition-all duration-300 transform active:scale-95 cursor-pointer ${
                cloud.isOpened ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {cloud.isOpened ? (
                <div className="px-4 py-2.5 rounded-full bg-white/95 border-2 border-pink-300 shadow-md flex items-center gap-1.5 animate-in zoom-in-90">
                  <span className="text-base">{cloud.emoji}</span>
                  <span className="font-serif-display text-xs sm:text-sm font-bold text-pink-700 whitespace-nowrap">
                    {cloud.wishText}
                  </span>
                  <Sparkles className="w-3 h-3 text-pink-400" />
                </div>
              ) : (
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 flex items-center justify-center filter drop-shadow-sm group-hover:drop-shadow-md">
                  <svg viewBox="0 0 100 65" className="absolute inset-0 w-full h-full fill-white">
                    <path
                      d="M 20 50 
                         A 15 15 0 0 1 25 22 
                         A 20 20 0 0 1 70 18 
                         A 18 18 0 0 1 85 45 
                         A 12 12 0 0 1 80 55 
                         Z"
                      fill="#ffffff"
                      stroke="#fbcfe8"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="relative z-10 font-bold text-pink-600 text-sm sm:text-base font-serif-display">
                    {cloud.numberLabel}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Birthday Cake with Blowable Candles */}
      <div className="w-full flex flex-col items-center my-5">
        <button
          id="blow-candles-btn"
          onClick={handleBlowCandles}
          className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title={candlesBlown ? 'Tap to re-light candles' : 'Tap to blow out candles and make a wish!'}
        >
          {/* Cake SVG Illustration */}
          <div className="relative w-44 h-36 flex items-center justify-center">
            <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
              {/* Cake Stand */}
              <ellipse cx="100" cy="145" rx="65" ry="10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
              <path d="M92 145 L88 155 L112 155 L108 145 Z" fill="#f472b6" />

              {/* Bottom Tier */}
              <rect x="50" y="100" width="100" height="40" rx="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
              {/* Bottom Frosting drips */}
              <path
                d="M50 110 Q60 118 70 110 Q80 118 90 110 Q100 118 110 110 Q120 118 130 110 Q140 118 150 110"
                stroke="#F43F5E"
                strokeWidth="3"
                fill="none"
              />

              {/* Top Tier */}
              <rect x="65" y="70" width="70" height="32" rx="6" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2" />
              {/* Top Frosting drips */}
              <path
                d="M65 78 Q74 84 82 78 Q91 84 100 78 Q109 84 118 78 Q127 84 135 78"
                stroke="#FB7185"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Strawberries / decor */}
              <circle cx="75" cy="70" r="4" fill="#E11D48" />
              <circle cx="100" cy="68" r="4" fill="#E11D48" />
              <circle cx="125" cy="70" r="4" fill="#E11D48" />

              {/* Candles (3 candles) */}
              {/* Left Candle */}
              <rect x="78" y="46" width="4" height="24" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
              {/* Center Candle */}
              <rect x="98" y="42" width="4" height="26" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
              {/* Right Candle */}
              <rect x="118" y="46" width="4" height="24" rx="2" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1" />

              {/* Candle Flames or Smoke */}
              {!candlesBlown ? (
                <g className="animate-candle">
                  {/* Left Flame */}
                  <ellipse cx="80" cy="40" rx="3.5" ry="6" fill="#F59E0B" />
                  <ellipse cx="80" cy="41" rx="2" ry="3.5" fill="#FEF08A" />

                  {/* Center Flame */}
                  <ellipse cx="100" cy="36" rx="4" ry="7" fill="#F59E0B" />
                  <ellipse cx="100" cy="37" rx="2" ry="4" fill="#FEF08A" />

                  {/* Right Flame */}
                  <ellipse cx="120" cy="40" rx="3.5" ry="6" fill="#F59E0B" />
                  <ellipse cx="120" cy="41" rx="2" ry="3.5" fill="#FEF08A" />
                </g>
              ) : (
                /* Smoke Wisps */
                <g className="opacity-60">
                  <path d="M80 42 Q76 34 82 28" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M100 38 Q104 30 98 24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M120 42 Q116 34 122 28" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium shadow-xs">
            {!candlesBlown ? (
              <>
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                <span>Tap cake to blow out candles & make a wish! 🕯️</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Your wish has been sent to the stars! ✨ (Tap to re-light)</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Sweet heartfelt wish card from the video */}
      <div className="w-full bg-white/90 rounded-2xl p-5 shadow-sm border border-pink-100 text-center relative overflow-hidden">
        <p className="font-serif-display italic text-xs sm:text-sm text-[#6b4c5d] leading-relaxed mb-3">
          "May every dream you have come true, and may I always be there to celebrate each one with you. You are my forever favorite. Happy Birthday Ohona"
        </p>
        <h3 className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold tracking-wide">
          💖 Happy Birthday, {birthdayGirlName} 💖
        </h3>
      </div>

      {/* Action buttons */}
      <div className="w-full pt-5 pb-2 flex flex-col gap-2.5">
        <div className="flex gap-2">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-full font-medium text-xs sm:text-sm bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over 🔄</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-full font-medium text-xs sm:text-sm bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Copy Link 🎀</span>
          </button>
        </div>

        {showCopiedToast && (
          <p className="text-center text-xs text-pink-600 font-medium bg-pink-50 py-1.5 px-3 rounded-lg border border-pink-200 animate-in fade-in shadow-xs">
            Link copied to clipboard! Share or revisit this anytime 💕
          </p>
        )}

        <p className="text-center text-[11px] text-pink-400 font-light">
          Crafted with love for Sayeada Ohona Islam ✨
        </p>
      </div>
    </div>
  );
};
