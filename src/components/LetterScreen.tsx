import React, { useState } from 'react';
import { Heart, Sparkles, Camera, Edit3, Check } from 'lucide-react';
import { playSparkleSound, playPopSound } from '../utils/soundEffects';

interface LetterScreenProps {
  birthdayGirlName: string;
  onContinue: () => void;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({
  birthdayGirlName,
  onContinue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterContent, setLetterContent] = useState(
    `Happy Birthday, my girl! 🤍\n\nSome people come into our lives and quietly become a very special part of it, and you’re definitely one of those people. I’m genuinely grateful for all the memories, laughter, conversations, and little moments we’ve shared.\n\nI hope this new year of your life brings you endless happiness, beautiful experiences, peace of mind, and everything your heart wishes for. May Allah always keep you safe, happy, and surrounded by good people. 🥹🤍\n\nNo matter how much life changes, I hope our friendship always stays the same. Love you and miss you! ❤️\n\nHappy Birthday once again, dear. 🫶`
  );
  const [signoff, setSignoff] = useState('With all my love,\nYour dearest Friend 💝');

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      playSparkleSound();
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between px-4 py-6 max-w-md mx-auto relative">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#831843] italic">
          A letter from my heart...
        </h2>
        <p className="text-xs text-pink-600/70 mt-1 font-body">
          Words written especially for you, sealed with warmth
        </p>
      </div>

      {/* Main Interactive Envelope & Letter Container */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-4">
        {!isOpen ? (
          /* Sealed Envelope (Waiting for Tap) */
          <div
            id="envelope-unopened"
            onClick={handleOpenEnvelope}
            className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-300"
          >
            <div className="relative w-72 sm:w-80 h-48 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 rounded-2xl shadow-xl shadow-pink-900/20 flex items-center justify-center border-2 border-rose-400/40 overflow-hidden">
              {/* Envelope flap folds styling */}
              <div
                className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-rose-600 to-rose-700 opacity-90 shadow-sm"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-rose-600/60"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)',
                }}
              />

              {/* Gold Heart Wax Seal in the center */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 shadow-md flex items-center justify-center border-2 border-amber-100 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-amber-900 fill-amber-800 drop-shadow-xs" />
                <div className="absolute inset-0 rounded-full border border-amber-300/60" />
              </div>

              {/* Sparkle badge */}
              <div className="absolute bottom-3 right-3 text-white/40 text-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <p className="mt-4 text-xs font-medium text-pink-700 bg-pink-100/90 border border-pink-200 px-4 py-1.5 rounded-full shadow-xs animate-bounce flex items-center gap-1.5">
              <span>Tap to open 💌</span>
            </p>
          </div>
        ) : (
          /* Opened Letter sliding out */
          <div
            id="envelope-opened"
            className="w-full relative transition-all duration-700 ease-out animate-in fade-in zoom-in-95"
          >
            {/* Elegant Letter Paper */}
            <div className="relative bg-[#fffdfa] rounded-2xl p-6 sm:p-7 shadow-xl border border-[#f5e6d3] text-[#4a3b44] overflow-hidden">
              {/* Aesthetic paper clip with ribbon / butterfly in top right corner */}
              <div className="absolute top-2 right-4 z-10 flex items-center">
                <div className="w-5 h-10 border-2 border-pink-400 rounded-full bg-transparent transform -rotate-12 shadow-xs" />
                <span className="text-xl -ml-2 select-none">🦋</span>
              </div>

              {/* Faint vintage postal watermark in background */}
              <div className="absolute -bottom-6 -left-6 text-pink-100 text-8xl opacity-30 select-none font-serif-display pointer-events-none">
                ✉
              </div>

              {/* Greeting */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#831843]">
                  To My Dearest {birthdayGirlName}...
                </h3>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[11px] text-pink-500 hover:text-pink-700 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-pink-50 transition-colors"
                  title="Customize letter"
                >
                  {isEditing ? <Check className="w-3 h-3 text-emerald-600" /> : <Edit3 className="w-3 h-3" />}
                  <span>{isEditing ? 'Done' : 'Edit'}</span>
                </button>
              </div>

              {/* Letter Body */}
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    rows={6}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 font-serif-display bg-pink-50/30"
                  />
                  <input
                    type="text"
                    value={signoff}
                    onChange={(e) => setSignoff(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-pink-200 font-handwriting"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-serif-display text-sm sm:text-base leading-relaxed text-[#5c3e4f] whitespace-pre-line">
                    {letterContent}
                  </p>

                  <div className="pt-2 text-right">
                    <p className="font-serif-display italic text-xs text-pink-700/80">
                      With all my love,
                    </p>
                    <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 mt-1 whitespace-pre-line font-bold">
                      {signoff}
                    </p>
                  </div>
                </div>
              )}

              {/* Subtle bottom heart decor */}
              <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-center gap-1.5 text-pink-300 text-xs">
                <span>✦</span>
                <Heart className="w-3 h-3 fill-pink-300" />
                <span>✦</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation button */}
      <div className="w-full pt-4 pb-2">
        <button
          id="our-memories-btn"
          onClick={() => {
            playPopSound();
            onContinue();
          }}
          className="w-full py-3.5 px-6 rounded-full font-medium text-sm tracking-wide bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white shadow-md shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Our Memories 📸</span>
        </button>

        <p className="text-center text-[11px] text-pink-400 mt-2 font-light">
          Step 3 of 5 • Cherished moments and polaroids
        </p>
      </div>
    </div>
  );
};
