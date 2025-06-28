export interface VoiceEntry {
  id: string;
  audioBlob: Blob;
  audioUrl: string;
  emotion: EmotionType;
  theme: string;
  timestamp: Date;
  duration: number;
  poeticReflection?: string;
  bloomPattern: BloomPattern;
}

export type EmotionType = 'calm' | 'happy' | 'sad' | 'angry' | 'excited' | 'peaceful';

export interface BloomPattern {
  type: EmotionType;
  intensity: number;
  colors: string[];
  size: number;
}

export interface AppSettings {
  darkMode: boolean;
  autoGeneratePoetry: boolean;
  openaiApiKey?: string;
  elevenlabsApiKey?: string;
}