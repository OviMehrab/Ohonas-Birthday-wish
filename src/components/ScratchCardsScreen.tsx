import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Heart, Check, ArrowRight, Wand2 } from 'lucide-react';
import { playSparkleSound, playPopSound } from '../utils/soundEffects';

interface CardItem {
  id: number;
  message: string;
  isRevealed: boolean;
  accent: string;
  gradient: string;
}

interface ScratchCardsScreenProps {
  birthdayGirlName: string;
  onContinue: () => void;
}

// Single Scratch Canvas Card
const ScratchableCard: React.FC<{
  card: CardItem;
  onReveal: (id: number) => void;
}> = ({ card, onReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealed, setRevealed] = useState(card.isRevealed);
  const scratchedPixelsRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Create dreamy pastel foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fbcfe8'); // soft pink
    grad.addColorStop(0.5, '#fed7aa'); // peach
    grad.addColorStop(1, '#ddd6fe'); // soft lavender

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw sparkle dots and patterns on foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 24; i++) {
      const x = (i * 37) % width;
      const y = (i * 29) % height;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3) + 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw foil text
    ctx.font = '600 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#9d174d';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to reveal ✦', width / 2, height / 2);
  }, []);

  useEffect(() => {
    if (!revealed) {
      initCanvas();
    }
  }, [initCanvas, revealed]);

  const handleScratch = (clientX: number, clientY: number) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixelsRef.current += 1;

    // After reasonable amount of scratches, complete reveal
    if (scratchedPixelsRef.current > 18 && !revealed) {
      triggerFullReveal();
    }
  };

  const triggerFullReveal = () => {
    if (revealed) return;
    setRevealed(true);
    playSparkleSound();
    onReveal(card.id);
  };

  return (
    <div
      ref={containerRef}
      id={`scratch-card-${card.id}`}
      className="relative w-full min-h-[92px] rounded-2xl overflow-hidden shadow-sm border border-pink-200/80 bg-white transition-all transform hover:shadow-md"
    >
      {/* Hidden Message inside */}
      <div className="absolute inset-0 p-4 flex items-center justify-center text-center bg-gradient-to-br from-pink-50/90 via-rose-50/70 to-pink-50/90">
        <div className="flex flex-col items-center">
          <Sparkles className="w-4 h-4 text-pink-400 mb-1 animate-pulse" />
          <p className="font-serif-display text-sm sm:text-base font-medium text-[#831843] leading-snug px-2">
            {card.message}
          </p>
        </div>
      </div>

      {/* Foil Scratch Layer */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={(e) => {
            if (isDrawing) {
              handleScratch(e.clientX, e.clientY);
            }
          }}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handleScratch(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onClick={triggerFullReveal}
        />
      )}

      {/* Quick Scratch Tap action for easy touch */}
      {!revealed && (
        <button
          onClick={triggerFullReveal}
          className="absolute bottom-1.5 right-2 z-20 text-[10px] text-pink-700 bg-white/60 backdrop-blur-xs px-2 py-0.5 rounded-full hover:bg-white transition-colors"
          title="Click to peel instantly"
        >
          Tap to Peel ✨
        </button>
      )}

      {/* Revealed Badge */}
      {revealed && (
        <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shadow-xs animate-bounce">
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
        </div>
      )}
    </div>
  );
};

export const ScratchCardsScreen: React.FC<ScratchCardsScreenProps> = ({
  birthdayGirlName,
  onContinue,
}) => {
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: 1,
      message: 'No matter how much life changes, you’ll always have a special place in my heart. ✨',
      isRevealed: false,
      accent: 'pink',
      gradient: 'from-pink-100 to-rose-200',
    },
    {
      id: 2,
      message: 'Your heart is genuinely beautiful, and I hope life always treats it gently.',
      isRevealed: false,
      accent: 'purple',
      gradient: 'from-purple-100 to-pink-200',
    },
    {
      id: 3,
      message: 'You’re one of those rare people who make life a little warmer just by being in it. 🤍 🌸',
      isRevealed: false,
      accent: 'rose',
      gradient: 'from-rose-100 to-amber-100',
    },
    {
      id: 4,
      message: `Some friendships are simply meant to stay, and I hope ours is one of them. 💕`,
      isRevealed: false,
      accent: 'pink',
      gradient: 'from-pink-100 to-fuchsia-200',
    },
  ]);

  const revealedCount = cards.filter((c) => c.isRevealed).length;
  const isAllRevealed = revealedCount === cards.length;

  const handleReveal = (id: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRevealed: true } : c))
    );
  };

  const handleRevealAll = () => {
    setCards((prev) => prev.map((c) => ({ ...c, isRevealed: true })));
    playSparkleSound();
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between px-4 py-6 max-w-md mx-auto relative">
      {/* Header section */}
      <div className="w-full text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs mb-2">
          <span>🎀 Secret Wishes</span>
        </div>
        <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#831843]">
          Scratch the cards to reveal hidden messages 🎀
        </h2>
        <p className="text-xs text-pink-600/70 mt-1">
          Rub each card gently or tap to unveil heartfelt notes
        </p>

        {/* Progress indicator matching video */}
        <div className="mt-4 flex items-center justify-between text-xs text-pink-700 font-medium px-1">
          <span>Revealed {revealedCount}/{cards.length}</span>
          {!isAllRevealed && (
            <button
              onClick={handleRevealAll}
              className="text-[11px] text-pink-500 hover:text-pink-700 underline flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> Reveal all
            </button>
          )}
        </div>
        <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${(revealedCount / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Cards list */}
      <div className="w-full space-y-3.5 my-2">
        {cards.map((card) => (
          <ScratchableCard key={card.id} card={card} onReveal={handleReveal} />
        ))}
      </div>

      {/* Bottom Continue button */}
      <div className="w-full pt-4 pb-2">
        <button
          id="continue-journey-btn"
          onClick={() => {
            playPopSound();
            onContinue();
          }}
          className={`w-full py-3.5 px-6 rounded-full font-medium text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
            revealedCount > 0
              ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white shadow-pink-200 hover:scale-[1.02] active:scale-95'
              : 'bg-pink-200 text-pink-400 cursor-not-allowed'
          }`}
        >
          <span>Continue Journey 🦋</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[11px] text-pink-400 mt-2 font-light">
          Step 2 of 5 • A heartfelt letter awaits you next
        </p>
      </div>
    </div>
  );
};
