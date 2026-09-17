import React, { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles, Plus, Image as ImageIcon, Heart, Cake, Upload, Check } from 'lucide-react';
import { MemoryItem } from '../types';
import { playPopSound, playSparkleSound } from '../utils/soundEffects';

interface CoreMemoriesScreenProps {
  birthdayGirlName: string;
  onContinue: () => void;
  isEditMode?: boolean;
}

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 1,
    title: 'Where It Started',
    yearOrTag: '2013',
    subtitle: 'We met, became friends, and had no idea that this little beginning would turn into something that would last for years.',
    imageUrl: '/photos/photo1.jpg',
  },
  {
    id: 2,
    title: 'The Memories We Made',
    yearOrTag: 'School Days',
    subtitle: 'School days, endless conversations, laughter, little secrets, and so many moments that became a part of our story.',
    imageUrl: '/photos/photo2.jpg',
  },
  {
    id: 3,
    title: 'Growing Up',
    yearOrTag: 'Through the Years',
    subtitle: 'We grew older, changed, and entered different phases of life, but our friendship grew with us.',
    imageUrl: '/photos/photo3.jpg',
  },
  {
    id: 4,
    title: 'Through Every Chapter',
    yearOrTag: 'Unbreakable Bond',
    subtitle: 'Life kept changing and taking us in different directions, but somehow we always remained a part of each other’s lives.',
    imageUrl: '/photos/photo4.jpg',
  },
  {
    id: 5,
    title: 'Still Us',
    yearOrTag: 'Today',
    subtitle: 'So much has changed since 2013, but after all these years, I’m still grateful to have you as my friend. 🤍',
    imageUrl: '/photos/photo5.jpg',
  },
];

export const CoreMemoriesScreen: React.FC<CoreMemoriesScreenProps> = ({
  birthdayGirlName,
  onContinue,
  isEditMode = false,
}) => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ohona_birthday_memories_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return DEFAULT_MEMORIES;
  });

  const [activeEditingId, setActiveEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetUploadId, setTargetUploadId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ohona_birthday_memories_v2', JSON.stringify(memories));
    } catch (e) {}
  }, [memories]);

  const handleUploadClick = (id: number) => {
    setTargetUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetUploadId !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setMemories((prev) =>
            prev.map((m) => (m.id === targetUploadId ? { ...m, imageUrl: base64 } : m))
          );
          playSparkleSound();
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateMemoryText = (id: number, field: 'title' | 'subtitle' | 'yearOrTag', value: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between px-4 py-6 max-w-md mx-auto relative">
      {/* Hidden file input for uploading Ohona's photos (only available in edit mode) */}
      {isEditMode && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      )}

      {/* Header */}
      <div className="text-center mb-6 w-full">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#831843]">
          Our Core Memories
        </h2>
        <p className="font-serif-display italic text-xs sm:text-sm text-pink-600/80 mt-1">
          The moments that define us ✨
        </p>

        {/* Helpful note for photo upload - ONLY visible to owner when isEditMode is true */}
        {isEditMode && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-300 text-pink-700 text-[11px] shadow-xs">
            <Camera className="w-3 h-3 text-pink-500" />
            <span>Owner Mode: Tap "Change Photo" to upload Ohona's pictures</span>
          </div>
        )}
      </div>

      {/* Memories Stack (Vertical cards matching video) */}
      <div className="w-full space-y-6 my-2">
        {memories.map((mem) => {
          const isEditing = isEditMode && activeEditingId === mem.id;
          return (
            <div
              key={mem.id}
              id={`memory-card-${mem.id}`}
              className="group bg-white rounded-3xl p-4 shadow-sm border border-pink-100 hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Cute washi tape on top */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-pink-200/60 rounded-xs transform -rotate-1 z-10" />

              {/* Photo Container */}
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-pink-50 shadow-inner">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Upload / Replace Photo Button - STRICTLY ONLY VISIBLE IN EDIT MODE */}
                {isEditMode && (
                  <button
                    onClick={() => handleUploadClick(mem.id)}
                    className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium shadow-md transition-all cursor-pointer"
                    title="Upload picture"
                  >
                    <Upload className="w-3.5 h-3.5 text-pink-300" />
                    <span>Change Photo</span>
                  </button>
                )}

                {/* Decorative sparkles */}
                <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-xs p-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                </div>
              </div>

              {/* Memory Details / Caption */}
              <div className="pt-4 pb-1 text-center">
                {isEditing ? (
                  <div className="space-y-2 mt-1">
                    <input
                      type="text"
                      value={mem.title}
                      onChange={(e) => updateMemoryText(mem.id, 'title', e.target.value)}
                      className="w-full text-center font-serif-display font-bold text-sm border border-pink-200 rounded px-2 py-1"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={mem.yearOrTag}
                      onChange={(e) => updateMemoryText(mem.id, 'yearOrTag', e.target.value)}
                      className="w-full text-center text-xs text-pink-400 border border-pink-200 rounded px-2 py-0.5"
                      placeholder="Year"
                    />
                    <textarea
                      value={mem.subtitle}
                      onChange={(e) => updateMemoryText(mem.id, 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full text-center text-xs border border-pink-200 rounded px-2 py-1"
                      placeholder="Caption"
                    />
                    <button
                      onClick={() => setActiveEditingId(null)}
                      className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-serif-display text-lg font-bold text-[#831843] tracking-wide">
                      {mem.title}
                    </h3>
                    <p className="text-[11px] font-medium text-pink-400 tracking-widest uppercase my-0.5">
                      {mem.yearOrTag}
                    </p>
                    <p className="font-serif-display italic text-xs sm:text-sm text-[#6b4c5d] px-2 leading-relaxed">
                      {mem.subtitle}
                    </p>

                    {/* Edit Caption Button - ONLY VISIBLE IN EDIT MODE */}
                    {isEditMode && (
                      <button
                        onClick={() => setActiveEditingId(mem.id)}
                        className="mt-2 text-[10px] text-pink-400 hover:text-pink-600 underline"
                      >
                        Edit Caption
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation button */}
      <div className="w-full pt-6 pb-2">
        <button
          id="final-surprise-btn"
          onClick={() => {
            playPopSound();
            onContinue();
          }}
          className="w-full py-3.5 px-6 rounded-full font-medium text-sm tracking-wide bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white shadow-md shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Cake className="w-4 h-4" />
          <span>Final Surprise 🎂</span>
        </button>

        <p className="text-center text-[11px] text-pink-400 mt-2 font-light">
          Step 4 of 5 • Cloud wishes and birthday cake
        </p>
      </div>
    </div>
  );
};
