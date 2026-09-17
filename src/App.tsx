/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AestheticHeader } from './components/AestheticHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ScratchCardsScreen } from './components/ScratchCardsScreen';
import { LetterScreen } from './components/LetterScreen';
import { CoreMemoriesScreen } from './components/CoreMemoriesScreen';
import { WishCloudsScreen } from './components/WishCloudsScreen';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { MemoryItem } from './types';
import {
  startBackgroundMusic,
  stopBackgroundMusic,
  toggleBackgroundMusic,
  getIsMusicPlaying,
  playPopSound,
} from './utils/soundEffects';
import { Camera, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

type Step = 'welcome' | 'scratch' | 'letter' | 'memories' | 'clouds';

const STEPS: Step[] = ['welcome', 'scratch', 'letter', 'memories', 'clouds'];

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 1,
    title: 'First Hello',
    yearOrTag: '2021',
    subtitle: 'The day my world changed and we became instant soul sisters ✨',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Best Adventure',
    yearOrTag: '2022',
    subtitle: 'Making endless magic together, laughing till our stomachs hurt 🚲',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Core Moment',
    yearOrTag: '2023',
    subtitle: 'Laughter, endless midnight talks, and unconditional support 🌸',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Celebrating You',
    yearOrTag: 'Forever',
    subtitle: 'To many more years of our beautiful friendship, Ohona! 🥂',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [birthdayGirlName, setBirthdayGirlName] = useState<string>('Syeada Ohona Islam');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ohona_birthday_memories');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MEMORIES;
  });

  const handleToggleMusic = () => {
    toggleBackgroundMusic((playing) => {
      setIsMusicPlaying(playing);
    });
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFromWelcome = () => {
    playPopSound();
    // Start sweet background music on first tap if not playing
    if (!isMusicPlaying) {
      startBackgroundMusic((playing) => setIsMusicPlaying(playing));
    }
    goToStep('scratch');
  };

  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-aesthetic-pattern flex flex-col items-center justify-start text-[#4a3b44] font-body relative selection:bg-pink-200">
      {/* Aesthetic Mobile Frame Container (Instagram / App look) */}
      <div className="w-full max-w-md min-h-screen bg-white/40 sm:shadow-2xl sm:my-4 sm:rounded-[38px] sm:border-8 sm:border-white/80 overflow-hidden flex flex-col backdrop-blur-xs relative">
        {/* Top bar with audio & Instagram-like aesthetic */}
        <AestheticHeader
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          title="lovearea.in"
        />

        {/* Step Indicator dots (only show after welcome screen) */}
        {currentStep !== 'welcome' && (
          <div className="w-full px-4 py-2 bg-pink-50/50 flex items-center justify-between border-b border-pink-100/60">
            <button
              onClick={() => {
                if (currentIndex > 0) goToStep(STEPS[currentIndex - 1]);
              }}
              className="p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((step, idx) => (
                <button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-6 bg-pink-500 shadow-xs'
                      : 'w-2 bg-pink-200 hover:bg-pink-300'
                  }`}
                  title={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Quick Button to upload Ohona's photos */}
            <button
              onClick={() => {
                playPopSound();
                setIsPhotoModalOpen(true);
              }}
              className="flex items-center gap-1 text-[11px] font-medium text-pink-600 bg-white/80 hover:bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-xs transition-colors"
              title="Upload Ohona's Photos"
            >
              <Camera className="w-3 h-3 text-pink-500" />
              <span>Photos</span>
            </button>
          </div>
        )}

        {/* Screens flow */}
        <main className="flex-1 w-full">
          {currentStep === 'welcome' && (
            <WelcomeScreen
              birthdayGirlName={birthdayGirlName}
              onStart={handleStartFromWelcome}
            />
          )}

          {currentStep === 'scratch' && (
            <ScratchCardsScreen
              birthdayGirlName={birthdayGirlName}
              onContinue={() => goToStep('letter')}
            />
          )}

          {currentStep === 'letter' && (
            <LetterScreen
              birthdayGirlName={birthdayGirlName}
              onContinue={() => goToStep('memories')}
            />
          )}

          {currentStep === 'memories' && (
            <CoreMemoriesScreen
              birthdayGirlName={birthdayGirlName}
              onContinue={() => goToStep('clouds')}
            />
          )}

          {currentStep === 'clouds' && (
            <WishCloudsScreen
              birthdayGirlName={birthdayGirlName}
              onRestart={() => goToStep('welcome')}
            />
          )}
        </main>
      </div>

      {/* Photo Manager Modal for uploading Ohona's real pictures */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        memories={memories}
        onUpdateMemories={(updated) => {
          setMemories(updated);
          try {
            localStorage.setItem('ohona_birthday_memories', JSON.stringify(updated));
          } catch (e) {}
        }}
        birthdayGirlName={birthdayGirlName}
        onUpdateName={(name) => setBirthdayGirlName(name)}
      />
    </div>
  );
}
