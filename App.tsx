
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, CameraHandle } from './components/Camera';
import { FilterSelector } from './components/FilterSelector';
import { PhotoStrip } from './components/PhotoStrip';
import { FILTERS, FRAME_STYLES, STICKER_LIST } from './constants';
import { Filter, PhotoData, Sticker, FrameStyle } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function App() {
  const cameraRef = useRef<CameraHandle>(null);
  
  const [currentFilter, setCurrentFilter] = useState<Filter>(FILTERS[0]);
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [currentFrame, setCurrentFrame] = useState<FrameStyle>(FRAME_STYLES[0]);
  
  const [isCountDown, setIsCountDown] = useState(false);
  const [countDownValue, setCountDownValue] = useState(3);

  // Sticker State
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [activeTab, setActiveTab] = useState<'filter' | 'sticker' | 'frame'>('filter');

  const handleCaptureStart = () => {
    if (photos.length >= 4) return;
    setIsCountDown(true);
    setCountDownValue(3);
  };

  useEffect(() => {
    if (!isCountDown) return;
    if (countDownValue > 0) {
      const timer = setTimeout(() => setCountDownValue((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountDown(false);
      cameraRef.current?.capturePhoto();
    }
  }, [isCountDown, countDownValue]);

  const onPhotoCaptured = useCallback((dataUrl: string) => {
    const newPhoto: PhotoData = {
      id: generateId(),
      dataUrl,
      timestamp: Date.now(),
    };
    setPhotos((prev) => [...prev, newPhoto]);
  }, []);

  const resetBooth = () => {
    setPhotos([]);
    setStickers([]);
  };

  // Sticker Logic
  const addSticker = (content: string) => {
    const newSticker: Sticker = {
      id: generateId(),
      content,
      x: 50 + (Math.random() * 20 - 10),
      y: 50 + (Math.random() * 20 - 10),
      scale: 1.5,
      rotation: (Math.random() * 40 - 20)
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const updateStickerPosition = (id: string, x: number, y: number) => {
     setStickers(prev => prev.map(s => s.id === id ? { ...s, x, y } : s));
  };

  const removeSticker = (id: string) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  // Download Logic - Updated for Vertical Strip
  const downloadStrip = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Settings for High Res
    const scale = 2; 
    const baseWidth = 320 * scale; 
    
    // Layout Constants
    const padding = 16 * scale;
    const gap = 12 * scale;
    const headerHeight = 60 * scale;
    const footerHeight = 40 * scale;
    
    // Photo dimensions (1 col)
    const photoWidth = baseWidth - (padding * 2);
    const photoHeight = photoWidth * (3/4); // 4:3 Aspect Ratio (Landscape)

    // Calculate strict height to avoid whitespace
    const totalHeight = headerHeight + (photoHeight * 4) + (gap * 3) + footerHeight;
    
    canvas.width = baseWidth;
    canvas.height = totalHeight;

    // 1. Draw Background based on FrameStyle
    const drawBackground = () => {
      // Base Color
      if (currentFrame.type === 'gradient') {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, currentFrame.colors[0]);
        grad.addColorStop(1, currentFrame.colors[1] || currentFrame.colors[0]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = currentFrame.colors[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Patterns
      if (currentFrame.type === 'pattern-dot') {
        ctx.fillStyle = currentFrame.colors[1];
        const dotSize = 4 * scale;
        const spacing = 40 * scale;
        for (let x = 0; x < canvas.width; x += spacing) {
          for (let y = 0; y < canvas.height; y += spacing) {
             ctx.beginPath();
             ctx.arc(x, y, dotSize, 0, Math.PI * 2);
             ctx.fill();
          }
        }
      } else if (currentFrame.type === 'pattern-check') {
        const size = 40 * scale;
        for (let x = 0; x < canvas.width; x += size) {
          for (let y = 0; y < canvas.height; y += size) {
             if ((x/size + y/size) % 2 !== 0) {
               ctx.fillStyle = currentFrame.colors[1];
               ctx.fillRect(x, y, size, size);
             }
          }
        }
      } else if (currentFrame.type === 'pattern-grid') {
        ctx.strokeStyle = currentFrame.colors[1];
        ctx.lineWidth = 1 * scale;
        const gridSize = 40 * scale;
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
      } else if (currentFrame.type === 'pattern-stripe') {
        ctx.fillStyle = currentFrame.colors[1];
        const stripeWidth = 20 * scale;
        const offset = 40 * scale;
        
        ctx.beginPath();
        // Naive diagonal stripe drawing
        for (let i = -canvas.height; i < canvas.width + canvas.height; i += offset) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i + stripeWidth, 0);
          ctx.lineTo(i + stripeWidth - canvas.height, canvas.height);
          ctx.lineTo(i - canvas.height, canvas.height);
          ctx.closePath();
        }
        ctx.fill();
      } else if (currentFrame.type === 'pattern-icon' && currentFrame.icon) {
        ctx.font = `${30 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const spacing = 60 * scale;
        
        for (let x = 0; x < canvas.width; x += spacing) {
          for (let y = 0; y < canvas.height; y += spacing) {
            ctx.save();
            ctx.translate(x + spacing/2, y + spacing/2);
            // Add some random rotation for cuteness
            // ctx.rotate((Math.random() * 0.5) - 0.25); 
            ctx.fillText(currentFrame.icon, 0, 0);
            ctx.restore();
          }
        }
      }
    };

    drawBackground();

    // 2. Draw Title
    ctx.fillStyle = currentFrame.textColor;
    ctx.font = `bold ${32 * scale}px Fredoka, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 4;
    ctx.fillText("VIBEBOOTH", baseWidth / 2, headerHeight / 2);
    ctx.shadowBlur = 0;

    // 3. Draw Photos in Vertical Stack
    const imgs = photos.map(p => {
      const img = new Image();
      img.src = p.dataUrl;
      return img;
    });

    const drawContent = () => {
      const borderWidth = 4 * scale;

      imgs.forEach((img, index) => {
        const x = padding;
        const y = headerHeight + (index * (photoHeight + gap));

        // Draw White Border
        ctx.fillStyle = "white";
        ctx.fillRect(x - borderWidth, y - borderWidth, photoWidth + (borderWidth * 2), photoHeight + (borderWidth * 2));
        
        // Draw Image
        ctx.drawImage(img, x, y, photoWidth, photoHeight);
      });

      // 4. Draw Footer
      const footerY = totalHeight - (footerHeight / 2) + (5 * scale); // Adjusted for better baseline
      ctx.fillStyle = currentFrame.textColor;
      
      // Date Left
      ctx.textAlign = 'left';
      ctx.font = `bold ${12 * scale}px Fredoka, sans-serif`;
      ctx.fillText("DATE", padding, footerY - (12*scale));
      ctx.font = `bold ${14 * scale}px Fredoka, sans-serif`;
      ctx.fillText(new Date().toLocaleDateString('vi-VN'), padding, footerY + (5*scale));
      
      // Credit Right
      ctx.textAlign = 'right';
      ctx.font = `${12 * scale}px Fredoka, sans-serif`;
      ctx.globalAlpha = 0.7;
      ctx.fillText("Made with ❤️", baseWidth - padding, footerY);
      
      // Little Dots Decoration
      ctx.globalAlpha = 0.5;
      const dotR = 3 * scale;
      const dotY = footerY + (10*scale);
      ctx.beginPath();
      ctx.arc(baseWidth - padding - (dotR * 8), dotY, dotR, 0, Math.PI*2);
      ctx.arc(baseWidth - padding - (dotR * 4), dotY, dotR, 0, Math.PI*2);
      ctx.arc(baseWidth - padding, dotY, dotR, 0, Math.PI*2);
      ctx.fill();
      
      ctx.globalAlpha = 1.0;

      // 5. Draw Stickers
      stickers.forEach(s => {
        ctx.save();
        const posX = (s.x / 100) * baseWidth;
        const posY = (s.y / 100) * totalHeight;
        
        ctx.translate(posX, posY);
        ctx.rotate((s.rotation * Math.PI) / 180);
        ctx.font = `${32 * scale * s.scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 4;
        ctx.fillText(s.content, 0, 0);
        ctx.restore();
      });

      const link = document.createElement('a');
      link.download = `vibebooth-vertical-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    let loaded = 0;
    if (imgs.length === 0) {
      drawContent(); 
      return;
    }
    imgs.forEach(img => {
      img.onload = () => {
        loaded++;
        if (loaded === imgs.length) drawContent();
      };
      if (img.complete) img.onload!(new Event('load'));
    });
  };

  return (
    <div className="h-full bg-gray-900 flex items-center justify-center p-2 lg:p-6 font-sans text-white overflow-hidden selection:bg-brand-pink">
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[95vh]">
        
        {/* Left Panel: Camera & Controls */}
        <div className="lg:col-span-8 flex flex-col gap-4 h-full min-h-0">
          
          {/* Header */}
          <header className="flex-shrink-0 flex justify-between items-center bg-gray-800/80 p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-2xl animate-bounce-slow">
                 📸
               </div>
               <div>
                 <h1 className="text-3xl font-bold text-brand-pink tracking-wide">VibeBooth</h1>
                 <p className="text-xs text-gray-400 font-medium tracking-wider">Chụp ảnh siêu xinh</p>
               </div>
             </div>
             <div className="flex gap-2">
                {Array.from({length: 4}).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i < photos.length ? 'bg-brand-pink scale-125' : 'bg-gray-700'}`} />
                ))}
             </div>
          </header>

          {/* Main Camera Area */}
          <main className="flex-1 min-h-0 bg-black rounded-[2rem] overflow-hidden relative shadow-2xl border-4 border-gray-800 group flex items-center justify-center">
             <Camera 
              ref={cameraRef} 
              filter={currentFilter} 
              onCapture={onPhotoCaptured} 
              isCountDown={isCountDown}
              countDownValue={countDownValue}
            />
          </main>

          {/* Controls Area */}
          <div className="flex-shrink-0 bg-gray-800/90 backdrop-blur-xl rounded-3xl p-4 border border-white/5 flex flex-col gap-3 shadow-xl">
            
            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('filter')}
                className={`text-base font-bold uppercase tracking-wide pb-1 transition-all whitespace-nowrap ${activeTab === 'filter' ? 'text-brand-pop border-b-2 border-brand-pop scale-105' : 'text-gray-500 hover:text-white'}`}
              >
                🎨 Màu Film ({FILTERS.length})
              </button>
              <button 
                onClick={() => setActiveTab('frame')}
                className={`text-base font-bold uppercase tracking-wide pb-1 transition-all whitespace-nowrap ${activeTab === 'frame' ? 'text-brand-pop border-b-2 border-brand-pop scale-105' : 'text-gray-500 hover:text-white'}`}
              >
                🖼️ Khung Ảnh
              </button>
              <button 
                onClick={() => setActiveTab('sticker')}
                className={`text-base font-bold uppercase tracking-wide pb-1 transition-all whitespace-nowrap ${activeTab === 'sticker' ? 'text-brand-pop border-b-2 border-brand-pop scale-105' : 'text-gray-500 hover:text-white'}`}
              >
                🦄 Sticker
              </button>
            </div>

            {/* Content based on Tab */}
            <div className="h-20">
              {activeTab === 'filter' && (
                 <FilterSelector currentFilter={currentFilter} onSelect={setCurrentFilter} />
              )}
              
              {activeTab === 'frame' && (
                <div className="flex gap-3 overflow-x-auto pb-4 px-2 no-scrollbar h-full items-center">
                  {FRAME_STYLES.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setCurrentFrame(frame)}
                      className={`flex flex-col items-center flex-shrink-0 transition-all ${
                        currentFrame.id === frame.id ? 'scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full border-2 mb-1 shadow-md flex items-center justify-center overflow-hidden text-lg ${currentFrame.id === frame.id ? 'border-white ring-2 ring-brand-pop' : 'border-gray-600'}`}
                        style={{ background: frame.cssBackground, backgroundSize: 'cover' }}
                      >
                         {/* Show icon for icon pattern types if css background is simple color */}
                         {frame.type === 'pattern-icon' && frame.icon}
                      </div>
                      <span className="text-[10px] font-medium">{frame.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'sticker' && (
                <div className="flex gap-2 overflow-x-auto pb-2 px-1 no-scrollbar items-center h-full">
                  {STICKER_LIST.map((sticker, idx) => (
                    <button
                      key={idx}
                      onClick={() => addSticker(sticker)}
                      className="text-3xl hover:scale-125 transition-transform active:scale-95 p-1 bg-white/5 rounded-xl hover:bg-white/20 min-w-[50px]"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-12 gap-3 mt-1">
               <button 
                 onClick={handleCaptureStart}
                 disabled={photos.length >= 4 || isCountDown}
                 className={`col-span-6 py-3 rounded-2xl text-xl font-black uppercase tracking-wider shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2
                   ${photos.length >= 4 
                     ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                     : 'bg-gradient-to-r from-brand-pink to-brand-pop hover:brightness-110 text-white shadow-brand-pop/50'
                   }`}
               >
                 <span className="text-2xl">{isCountDown ? '⏱️' : '📸'}</span>
                 {isCountDown ? `${countDownValue}` : photos.length >= 4 ? 'Đủ 4 tấm' : 'Chụp'}
               </button>

               <button 
                 onClick={resetBooth}
                 disabled={photos.length === 0}
                 className="col-span-3 bg-gray-700 hover:bg-gray-600 rounded-2xl font-bold text-white flex items-center justify-center transition-all text-sm lg:text-base"
               >
                 🗑️ Xóa
               </button>

               <button 
                  onClick={downloadStrip}
                  disabled={photos.length === 0}
                  className="col-span-3 bg-white text-gray-900 hover:bg-brand-peach hover:text-gray-900 rounded-2xl font-bold transition-all flex items-center justify-center gap-1 text-sm lg:text-base shadow-lg"
               >
                 💾 Lưu
               </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Strip Preview - FIXED SCROLLING */}
        <div className="lg:col-span-4 h-full min-h-0 flex flex-col bg-gray-800/50 backdrop-blur-md rounded-[2rem] border border-white/5 relative shadow-2xl overflow-hidden">
           <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/5 flex justify-between items-center z-10">
             <h3 className="font-bold flex items-center gap-2 text-brand-peach">
               🎞️ Preview
             </h3>
             {photos.length > 0 && (
               <span className="text-xs bg-brand-pop px-2 py-1 rounded-full text-white font-bold">
                 {photos.length}/4
               </span>
             )}
           </div>

           {/* Scroll Container - Explicit block display, no flex in parent to prevent squash */}
           <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-black/20 relative">
              <div className="min-h-full p-4 pb-48 w-full flex flex-col items-center justify-start">
                  <PhotoStrip 
                    photos={photos} 
                    frameStyle={currentFrame}
                    stickers={stickers}
                    onStickerMove={updateStickerPosition}
                    onStickerRemove={removeSticker}
                  />
              </div>
           </div>
           
           {/* Hint Overlay - Moved to be safe */}
           {stickers.length > 0 && (
             <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none animate-pulse z-20">
               <span className="bg-black/80 text-white text-[10px] px-4 py-2 rounded-full backdrop-blur-md shadow-lg border border-white/20">
                 💡 Kéo sticker để di chuyển
               </span>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
