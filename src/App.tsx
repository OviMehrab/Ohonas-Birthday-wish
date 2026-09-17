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
import { Camera, ChevronLeft, ChevronRight, Heart, Lock, Unlock, Settings, Check } from 'lucide-react';

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
  
  // Owner Edit Mode: Default FALSE for visitors. Only true if ?edit=true or unlocked via owner PIN
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('edit') === 'true' || params.get('admin') === 'true') {
          return true;
        }
        return localStorage.getItem('ohona_is_admin_mode') === 'true';
      }
    } catch (e) {}
    return false;
  });

  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

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
    if (!isMusicPlaying) {
      startBackgroundMusic((playing) => setIsMusicPlaying(playing));
    }
    goToStep('scratch');
  };

  const handleUnlockAdmin = () => {
    // Default PIN: 1234 or empty
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin' || pinInput.toLowerCase() === 'ohona') {
      setIsEditMode(true);
      try {
        localStorage.setItem('ohona_is_admin_mode', 'true');
      } catch (e) {}
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      playPopSound();
    } else {
      setPinError('Incorrect PIN. (Default owner PIN is 1234)');
    }
  };

  const handleLockAdmin = () => {
    setIsEditMode(false);
    try {
      localStorage.removeItem('ohona_is_admin_mode');
    } catch (e) {}
    playPopSound();
  };

  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-aesthetic-pattern flex flex-col items-center justify-start text-[#4a3b44] font-body relative selection:bg-pink-200">
      {/* Top Banner when Owner Edit Mode is ON */}
      {isEditMode && (
        <div className="w-full bg-pink-600 text-white text-xs py-2 px-4 flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-1.5 font-medium">
            <Unlock className="w-3.5 h-3.5 text-pink-200" />
            <span>Owner Edit Mode Active (You can upload photos and edit captions)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Camera className="w-3 h-3" />
              <span>All Photos</span>
            </button>
            <button
              onClick={handleLockAdmin}
              className="bg-white text-pink-700 hover:bg-pink-50 text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs cursor-pointer transition-colors"
            >
              Finish & Lock 🔒
            </button>
          </div>
        </div>
      )}

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

            {/* Quick Button to upload Ohona's photos - ONLY SHOWN IN EDIT MODE */}
            {isEditMode ? (
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
            ) : (
              <div className="w-4" />
            )}
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
              isEditMode={isEditMode}
            />
          )}

          {currentStep === 'memories' && (
            <CoreMemoriesScreen
              birthdayGirlName={birthdayGirlName}
              onContinue={() => goToStep('clouds')}
              isEditMode={isEditMode}
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

      {/* Discreet Owner Login trigger at the bottom */}
      <footer className="w-full max-w-md py-3 text-center text-xs text-pink-400/80 flex items-center justify-center gap-2 mb-4">
        {!isEditMode ? (
          <button
            onClick={() => {
              setShowPinModal(true);
              setPinError('');
              setPinInput('');
            }}
            className="flex items-center gap-1 text-[11px] text-pink-400/60 hover:text-pink-600 transition-colors py-1 px-2.5 rounded-full hover:bg-pink-100/50"
            title="Owner Edit Mode"
          >
            <Lock className="w-3 h-3" />
            <span>Owner Access</span>
          </button>
        ) : (
          <button
            onClick={handleLockAdmin}
            className="flex items-center gap-1 text-[11px] text-pink-700 bg-pink-100 py-1 px-3 rounded-full hover:bg-pink-200 transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Lock as Viewer Mode</span>
          </button>
        )}
      </footer>

      {/* Passcode Modal for Owner Access */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-pink-200 text-center">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 mx-auto flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-serif-display font-bold text-[#831843] text-base mb-1">
              Owner Access
            </h4>
            <p className="text-xs text-pink-600/80 mb-4">
              Enter owner PIN to enable photo and memory editing (Default PIN: <b>1234</b>)
            </p>

            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUnlockAdmin();
              }}
              placeholder="Enter PIN"
              className="w-full text-center text-sm p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2"
              autoFocus
            />

            {pinError && (
              <p className="text-[11px] text-rose-500 mb-2 font-medium">
                {pinError}
              </p>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlockAdmin}
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-pink-500 hover:bg-pink-600 text-white shadow-xs transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

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

