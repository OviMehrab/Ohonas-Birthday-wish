export interface ScratchCardItem {
  id: number;
  message: string;
  isRevealed: boolean;
  accentColor: string;
  icon: string;
}

export interface MemoryItem {
  id: number;
  title: string;
  yearOrTag: string;
  subtitle: string;
  imageUrl: string;
}

export interface CloudWish {
  id: number;
  numberLabel: number;
  wishText: string;
  emoji: string;
  isOpened: boolean;
  color: string;
}

export interface BirthdayData {
  name: string;
  letterGreeting: string;
  letterBody: string;
  letterSignoff: string;
  senderName: string;
  memories: MemoryItem[];
}
