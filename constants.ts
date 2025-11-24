
import { Filter, FrameStyle } from './types';

export const FILTERS: Filter[] = [
  { id: 'normal', name: 'Original', cssClass: '', color: 'bg-gray-500' },
  
  // Film Series
  { id: 'fuji', name: 'Fuji', cssClass: 'contrast-125 saturate-125 hue-rotate-[-5deg] brightness-105', color: 'bg-green-600' },
  { id: 'kodak', name: 'Kodak', cssClass: 'contrast-110 saturate-150 sepia-[0.2] brightness-110', color: 'bg-yellow-500' },
  { id: 'polaroid', name: 'Polaroid', cssClass: 'contrast-90 brightness-110 saturate-[0.8] sepia-[0.1] blur-[0.2px]', color: 'bg-indigo-300' },
  { id: 'lomo', name: 'Lomo', cssClass: 'contrast-150 saturate-125 brightness-90 sepia-[0.1]', color: 'bg-blue-900' },
  { id: 'film-color', name: 'Film', cssClass: 'contrast-125 saturate-[0.9] brightness-110 sepia-[0.1]', color: 'bg-red-400' },
  
  // New Trendy Series (Hàn Quốc/Instagram)
  { id: 'latte', name: 'Latte', cssClass: 'sepia-[0.4] contrast-110 brightness-105 saturate-[0.6] hue-rotate-[-10deg]', color: 'bg-[#C4A484]' },
  { id: 'matcha', name: 'Matcha', cssClass: 'sepia-[0.2] hue-rotate-[80deg] contrast-95 brightness-110 saturate-[0.8]', color: 'bg-[#98bf64]' },
  { id: 'vamp', name: 'Vamp', cssClass: 'contrast-125 saturate-[0.5] brightness-120 hue-rotate-[-10deg]', color: 'bg-rose-900' },
  { id: 'oceanic', name: 'Oceanic', cssClass: 'sepia-[0.3] hue-rotate-[190deg] contrast-110 brightness-90 saturate-[1.2]', color: 'bg-cyan-800' },
  { id: 'haze', name: 'Haze', cssClass: 'contrast-[0.9] brightness-110 sepia-[0.2] hue-rotate-[230deg] saturate-[0.8]', color: 'bg-purple-200' },
  { id: 'sunny', name: 'Sunny', cssClass: 'brightness-125 contrast-110 saturate-150 sepia-[0.1]', color: 'bg-yellow-400' },
  { id: 'noir-blue', name: 'Cinema', cssClass: 'grayscale contrast-125 brightness-90 sepia-[0.5] hue-rotate-[180deg]', color: 'bg-slate-700' },
  { id: 'vivid', name: 'Vivid', cssClass: 'saturate-[2.0] contrast-110 brightness-105', color: 'bg-pink-600' },

  // Retro/Vintage Series
  { id: 'vintage', name: '1980s', cssClass: 'sepia-[0.5] contrast-110 brightness-90 hue-rotate-[-10deg]', color: 'bg-orange-700' },
  { id: 'retro-warm', name: 'Warm', cssClass: 'sepia-[0.3] saturate-150 contrast-90 brightness-105', color: 'bg-orange-400' },
  { id: 'retro-cool', name: 'Cool', cssClass: 'sepia-[0.2] hue-rotate-[180deg] contrast-90 brightness-110 saturate-[0.8]', color: 'bg-blue-300' },
  { id: 'washed', name: 'Washed', cssClass: 'contrast-[0.8] brightness-125 saturate-[0.8] sepia-[0.1]', color: 'bg-zinc-300' },
  { id: 'bw-soft', name: 'B&W', cssClass: 'grayscale contrast-90 brightness-110', color: 'bg-gray-400' },
  { id: 'bw-contrast', name: 'Noir', cssClass: 'grayscale contrast-150 brightness-90', color: 'bg-gray-900' },
  { id: 'sepia', name: 'Sepia', cssClass: 'sepia-[0.8] contrast-110 brightness-90', color: 'bg-amber-700' },
  
  // Artistic/Color Series
  { id: 'pinky', name: 'Pinky', cssClass: 'sepia-[0.2] hue-rotate-[320deg] contrast-110 saturate-150', color: 'bg-pink-400' },
  { id: 'peach', name: 'Peach', cssClass: 'sepia-[0.4] hue-rotate-[-30deg] saturate-150 brightness-110', color: 'bg-orange-300' },
  { id: 'dreamy', name: 'Dreamy', cssClass: 'blur-[0.5px] brightness-[1.1] saturate-[1.2] contrast-[0.9]', color: 'bg-purple-300' },
  { id: 'matte', name: 'Matte', cssClass: 'contrast-75 brightness-110 saturate-110', color: 'bg-stone-400' },
  { id: 'glow', name: 'Glow', cssClass: 'brightness-125 saturate-125 contrast-90', color: 'bg-yellow-200' },
  { id: 'cyber', name: 'Cyber', cssClass: 'saturate-200 contrast-125 hue-rotate-[190deg] brightness-110', color: 'bg-cyan-400' },
  { id: 'drama', name: 'Drama', cssClass: 'contrast-150 saturate-[0.8] sepia-[0.2] brightness-90', color: 'bg-red-900' },
  { id: 'pastel', name: 'Pastel', cssClass: 'brightness-110 contrast-[0.9] saturate-150 sepia-[0.1]', color: 'bg-lime-200' },
];

export const FRAME_STYLES: FrameStyle[] = [
  // --- New Additions (Cute & Diverse) ---
  { id: 'bunny', name: 'Bunny', type: 'pattern-icon', icon: '🐰', cssBackground: '#ffe6f2', textColor: '#ff69b4', colors: ['#ffe6f2'] },
  { id: 'frog', name: 'Froggy', type: 'pattern-icon', icon: '🐸', cssBackground: '#e8f5e9', textColor: '#2e7d32', colors: ['#e8f5e9'] },
  { id: 'chick', name: 'Chick', type: 'pattern-icon', icon: '🐣', cssBackground: '#fff9c4', textColor: '#fbc02d', colors: ['#fff9c4'] },
  { id: 'panda', name: 'Panda', type: 'pattern-icon', icon: '🐼', cssBackground: '#f5f5f5', textColor: '#000000', colors: ['#f5f5f5'] },
  { id: 'cow', name: 'Moo', type: 'pattern-icon', icon: '🐄', cssBackground: '#ffffff', textColor: '#000000', colors: ['#ffffff'] },
  { id: 'pizza', name: 'Pizza', type: 'pattern-icon', icon: '🍕', cssBackground: '#fff3e0', textColor: '#e64a19', colors: ['#fff3e0'] },
  { id: 'boba', name: 'Boba', type: 'pattern-icon', icon: '🧋', cssBackground: '#efebe9', textColor: '#5d4037', colors: ['#efebe9'] },
  { id: 'avocado', name: 'Avo', type: 'pattern-icon', icon: '🥑', cssBackground: '#f1f8e9', textColor: '#558b2f', colors: ['#f1f8e9'] },
  { id: 'egg', name: 'Eggy', type: 'pattern-icon', icon: '🍳', cssBackground: '#fffde7', textColor: '#fdd835', colors: ['#fffde7'] },
  { id: 'alien', name: 'Alien', type: 'pattern-icon', icon: '👽', cssBackground: '#000000', textColor: '#00e676', colors: ['#000000'] },
  { id: 'planet', name: 'Space', type: 'pattern-icon', icon: '🪐', cssBackground: '#1a237e', textColor: '#e8eaf6', colors: ['#1a237e'] },
  { id: 'fire', name: 'Lit', type: 'pattern-icon', icon: '🔥', cssBackground: '#212121', textColor: '#ff3d00', colors: ['#212121'] },
  { id: 'rainbow', name: 'Rainbow', type: 'pattern-icon', icon: '🌈', cssBackground: '#e1f5fe', textColor: '#0288d1', colors: ['#e1f5fe'] },
  { id: 'cd', name: 'Y2K CD', type: 'pattern-icon', icon: '💿', cssBackground: '#e0e0e0', textColor: '#616161', colors: ['#e0e0e0'] },
  { id: 'butterfly-blue', name: 'Fly', type: 'pattern-icon', icon: '🦋', cssBackground: '#e3f2fd', textColor: '#1565c0', colors: ['#e3f2fd'] },
  { id: 'ghost', name: 'Boo', type: 'pattern-icon', icon: '👻', cssBackground: '#311b92', textColor: '#ede7f6', colors: ['#311b92'] },
  { id: 'snowman', name: 'Snow', type: 'pattern-icon', icon: '⛄', cssBackground: '#e0f7fa', textColor: '#006064', colors: ['#e0f7fa'] },
  
  // New Solids/Gradients
  { id: 'lilac', name: 'Lilac', type: 'solid', cssBackground: '#e6e6fa', textColor: '#483d8b', colors: ['#e6e6fa'] },
  { id: 'baby-blue', name: 'Baby Blue', type: 'solid', cssBackground: '#d1ecf1', textColor: '#0c5460', colors: ['#d1ecf1'] },
  { id: 'sage', name: 'Sage', type: 'solid', cssBackground: '#d4edda', textColor: '#155724', colors: ['#d4edda'] },
  { id: 'cotton-candy', name: 'Cotton', type: 'gradient', cssBackground: 'linear-gradient(to right, #f8bbd0, #e1bee7)', textColor: '#880e4f', colors: ['#f8bbd0', '#e1bee7'] },
  { id: 'midnight', name: 'Midnight', type: 'gradient', cssBackground: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', textColor: '#ffffff', colors: ['#0f2027', '#2c5364'] },
  
  // --- Original Frames ---
  // Basics
  { id: 'white', name: 'White', type: 'solid', cssBackground: '#ffffff', textColor: '#000', colors: ['#ffffff'] },
  { id: 'black', name: 'Black', type: 'solid', cssBackground: '#1a1a1a', textColor: '#fff', colors: ['#1a1a1a'] },
  { id: 'cream', name: 'Cream', type: 'solid', cssBackground: '#fffdd0', textColor: '#5c4b35', colors: ['#fffdd0'] },
  
  // Gradients
  { id: 'sunset', name: 'Sunset', type: 'gradient', cssBackground: 'linear-gradient(to bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', textColor: '#fff', colors: ['#ff9a9e', '#fecfef'] },
  { id: 'ocean', name: 'Ocean', type: 'gradient', cssBackground: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', textColor: '#fff', colors: ['#84fab0', '#8fd3f4'] },
  { id: 'aura', name: 'Aura', type: 'gradient', cssBackground: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', textColor: '#555', colors: ['#a18cd1', '#fbc2eb'] },
  
  // Textures / Notebook
  { id: 'grid-white', name: 'Notebook', type: 'pattern-grid', cssBackground: 'white', textColor: '#1a1a1a', colors: ['#ffffff', '#e5e5e5'] },
  { id: 'grid-pink', name: 'Pink Grid', type: 'pattern-grid', cssBackground: '#fff0f5', textColor: '#ff69b4', colors: ['#fff0f5', '#ffb6c1'] },
  { id: 'stripe-mint', name: 'Mint Stripe', type: 'pattern-stripe', cssBackground: '#e0f2f1', textColor: '#00695c', colors: ['#e0f2f1', '#b2dfdb'] },
  { id: 'stripe-candy', name: 'Candy', type: 'pattern-stripe', cssBackground: '#ffebee', textColor: '#c62828', colors: ['#ffebee', '#ffcdd2'] },

  // Patterns
  { id: 'dot-pink', name: 'Polka Pink', type: 'pattern-dot', cssBackground: 'radial-gradient(#ff758c 2px, transparent 2px)', textColor: '#ff758c', colors: ['#ffe6ea', '#ff758c'] },
  { id: 'check-blue', name: 'Picnic', type: 'pattern-check', cssBackground: 'repeating-linear-gradient(45deg, #80d0c7 25%, transparent 25%, transparent 75%, #80d0c7 75%, #80d0c7)', textColor: '#13547a', colors: ['#e0ffff', '#87ceeb'] },
  { id: 'check-black', name: 'Ska', type: 'pattern-check', cssBackground: '', textColor: '#000', colors: ['#ffffff', '#000000'] },
  
  // Icons Cute
  { id: 'icon-bear', name: 'Bear', type: 'pattern-icon', icon: '🧸', cssBackground: '#f5f5dc', textColor: '#8b4513', colors: ['#f5f5dc'] },
  { id: 'icon-bow', name: 'Coquette', type: 'pattern-icon', icon: '🎀', cssBackground: '#fff0f5', textColor: '#ff69b4', colors: ['#fff0f5'] },
  { id: 'icon-strawberry', name: 'Berry', type: 'pattern-icon', icon: '🍓', cssBackground: '#ffe4e1', textColor: '#d81b60', colors: ['#ffe4e1'] },
  { id: 'icon-cloud', name: 'Cloudy', type: 'pattern-icon', icon: '☁️', cssBackground: '#e0f7fa', textColor: '#0277bd', colors: ['#e0f7fa'] },
  { id: 'icon-star', name: 'Y2K Star', type: 'pattern-icon', icon: '⭐', cssBackground: '#000000', textColor: '#ffff00', colors: ['#000000'] },
  { id: 'icon-flower', name: 'Daisy', type: 'pattern-icon', icon: '🌼', cssBackground: '#f0fff0', textColor: '#2e8b57', colors: ['#f0fff0'] },
  { id: 'icon-cherry', name: 'Cherry', type: 'pattern-icon', icon: '🍒', cssBackground: '#fffacd', textColor: '#b22222', colors: ['#fffacd'] },
  { id: 'icon-cat', name: 'Meow', type: 'pattern-icon', icon: '🐱', cssBackground: '#fff', textColor: '#333', colors: ['#ffffff'] },
];


export const STICKER_LIST = [
  "🎀", "✨", "💖", "🔥", "😎", "👑", "🌈", "🍒", "🍑", "🍓", 
  "☁️", "🌙", "⭐", "👽", "💿", "📷", "💋", "💯", "🍀", "💎",
  "🐾", "🦋", "🌸", "🌻", "🍕", "🍔", "🍦", "🍭", "👀", "👻",
  "🐶", "🐱", "🐰", "🐻", "🐼", "🦄", "🐣", "🐸", "🐷", "🙊"
];
