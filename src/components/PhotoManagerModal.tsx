import React, { useRef } from 'react';
import { X, Upload, Camera, Sparkles, Check } from 'lucide-react';
import { MemoryItem } from '../types';
import { playPopSound, playSparkleSound } from '../utils/soundEffects';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: MemoryItem[];
  onUpdateMemories: (updated: MemoryItem[]) => void;
  birthdayGirlName: string;
  onUpdateName: (name: string) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  memories,
  onUpdateMemories,
  birthdayGirlName,
  onUpdateName,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedMemoryIdRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (id: number) => {
    selectedMemoryIdRef.current = id;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = selectedMemoryIdRef.current;
    if (file && targetId !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          const updated = memories.map((m) =>
            m.id === targetId ? { ...m, imageUrl: base64 } : m
          );
          onUpdateMemories(updated);
          playSparkleSound();
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-pink-500" />
            <h3 className="font-serif-display font-semibold text-lg text-[#831843]">
              Upload Ohona's Pictures
            </h3>
          </div>
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-pink-700 mb-1">
            Birthday Girl Name
          </label>
          <input
            type="text"
            value={birthdayGirlName}
            onChange={(e) => onUpdateName(e.target.value)}
            className="w-full text-sm px-3.5 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 font-serif-display"
          />
        </div>

        {/* Photos list */}
        <p className="text-xs font-semibold text-pink-700 mb-2">
          Memory Polaroid Photos (Tap to replace with real photos):
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {memories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => handleFileSelect(mem.id)}
              className="group cursor-pointer relative aspect-4/5 rounded-2xl overflow-hidden border-2 border-dashed border-pink-200 hover:border-pink-500 bg-pink-50/50 flex flex-col items-center justify-center p-2 text-center transition-all"
            >
              <img
                src={mem.imageUrl}
                alt={mem.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex flex-col items-center justify-center text-white p-2">
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium font-serif-display">{mem.title}</span>
                <span className="text-[10px] opacity-80">Tap to upload</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-medium shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Save & Continue 🌸</span>
        </button>
      </div>
    </div>
  );
};
