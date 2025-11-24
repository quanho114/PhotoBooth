
import React, { forwardRef } from 'react';
import { PhotoData, Sticker, FrameStyle } from '../types';

interface PhotoStripProps {
  photos: PhotoData[];
  frameStyle: FrameStyle;
  stickers: Sticker[];
  onStickerMove?: (id: string, x: number, y: number) => void;
  onStickerRemove?: (id: string) => void;
}

export const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(({ 
  photos, frameStyle, stickers, onStickerMove, onStickerRemove 
}, ref) => {

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('stickerId', id);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    e.dataTransfer.setData('offsetX', (e.clientX - rect.left).toString());
    e.dataTransfer.setData('offsetY', (e.clientY - rect.top).toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('stickerId');
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));
    
    if (id && onStickerMove) {
      const containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - containerRect.left - offsetX) / containerRect.width) * 100;
      const y = ((e.clientY - containerRect.top - offsetY) / containerRect.height) * 100;
      onStickerMove(id, x, y);
    }
  };

  // Construct background style based on frame type
  const getBackgroundStyle = () => {
    const { type, cssBackground, colors, icon } = frameStyle;
    
    if (type === 'solid' || type === 'gradient') {
      return { background: cssBackground };
    }
    
    if (type === 'pattern-dot') {
       return { 
         backgroundColor: colors[0], 
         backgroundImage: `radial-gradient(${colors[1]} 2px, transparent 2px)`, 
         backgroundSize: '20px 20px' 
       };
    }
    
    if (type === 'pattern-check') {
       return {
         backgroundColor: colors[0],
         backgroundImage: `linear-gradient(45deg, ${colors[1]} 25%, transparent 25%, transparent 75%, ${colors[1]} 75%, ${colors[1]}), linear-gradient(45deg, ${colors[1]} 25%, transparent 25%, transparent 75%, ${colors[1]} 75%, ${colors[1]})`,
         backgroundPosition: '0 0, 10px 10px',
         backgroundSize: '20px 20px'
       };
    }

    if (type === 'pattern-grid') {
      return {
        backgroundColor: colors[0],
        backgroundImage: `linear-gradient(${colors[1]} 1px, transparent 1px), linear-gradient(90deg, ${colors[1]} 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      };
    }

    if (type === 'pattern-stripe') {
      return {
        backgroundColor: colors[0],
        backgroundImage: `repeating-linear-gradient(45deg, ${colors[0]}, ${colors[0]} 10px, ${colors[1]} 10px, ${colors[1]} 20px)`
      };
    }

    if (type === 'pattern-icon' && icon) {
      // Create SVG data URI for emoji background
      const svg = encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20'>${icon}</text>
        </svg>
      `.trim());
      return {
        backgroundColor: colors[0],
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: '30px 30px'
      };
    }

    return { background: 'white' };
  };

  return (
    <div 
      ref={ref}
      className="shadow-xl transition-all duration-300 mx-auto relative overflow-hidden select-none"
      style={{ 
        ...getBackgroundStyle(),
        width: '300px',
        minHeight: 'auto', 
        paddingBottom: '20px'
      }} 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-4 flex flex-col items-center h-full relative z-10">
        {/* Header */}
         <div className="w-full text-center pb-2">
          <h2 
            className="font-bold text-2xl tracking-wide uppercase drop-shadow-sm" 
            style={{ color: frameStyle.textColor }}
          >
            VIBEBOOTH
          </h2>
        </div>

        {/* Photos Grid - Vertical Stack */}
        <div className="flex flex-col gap-3 w-full">
          {Array.from({ length: 4 }).map((_, i) => {
            const photo = photos[i];
            return (
               <div 
                key={i} 
                className="w-full aspect-[4/3] bg-black/5 overflow-hidden relative shadow-sm"
                style={{ border: `4px solid white` }}
              >
                {photo ? (
                  <img 
                    src={photo.dataUrl} 
                    alt={`Capture ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
                    <span className="text-xl font-bold opacity-50" style={{ color: frameStyle.textColor }}>{i + 1}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div 
          className="mt-3 w-full text-center flex justify-between items-end px-1"
          style={{ color: frameStyle.textColor }}
        >
          <div className="text-left leading-tight">
            <p className="text-[9px] font-bold tracking-widest opacity-80 uppercase">Date</p>
            <p className="text-[11px] font-bold opacity-90">{new Date().toLocaleDateString('vi-VN')}</p>
          </div>
           <div className="text-right leading-tight">
             <p className="text-[9px] opacity-60">Made with ❤️</p>
             <div className="flex gap-1 mt-1 justify-end opacity-70">
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
             </div>
           </div>
        </div>
      </div>

      {/* Stickers Overlay */}
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          draggable
          onDragStart={(e) => handleDragStart(e, sticker.id)}
          onClick={(e) => { e.stopPropagation(); }}
          onContextMenu={(e) => {
             e.preventDefault();
             onStickerRemove && onStickerRemove(sticker.id);
          }}
          className="absolute cursor-move hover:scale-110 transition-transform z-20 drop-shadow-md"
          style={{ 
            left: `${sticker.x}%`, 
            top: `${sticker.y}%`, 
            fontSize: `${32 * sticker.scale}px`,
            transform: `rotate(${sticker.rotation}deg)`
          }}
          title="Right click to remove"
        >
          {sticker.content}
        </div>
      ))}
    </div>
  );
});

PhotoStrip.displayName = 'PhotoStrip';
