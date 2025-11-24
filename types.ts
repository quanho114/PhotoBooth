
export interface Filter {
  id: string;
  name: string;
  cssClass: string; // Tailwind filter classes or custom css string
  color: string; // For UI badge
}

export interface PhotoData {
  id: string;
  dataUrl: string;
  timestamp: number;
}

export interface Sticker {
  id: string;
  content: string; // Emoji or Image URL
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  scale: number;
  rotation: number;
}

export type FrameType = 'solid' | 'gradient' | 'pattern-dot' | 'pattern-check' | 'pattern-stripe' | 'pattern-grid' | 'pattern-icon';

export interface FrameStyle {
  id: string;
  name: string;
  type: FrameType;
  cssBackground: string; // Used for UI preview
  textColor: string;
  colors: string[]; // Used for canvas drawing [bg, fg]
  icon?: string; // Used for pattern-icon type
}

export interface AiAnalysisResult {
  caption: string;
  tags: string[];
  emoji: string;
  score: number;
}
