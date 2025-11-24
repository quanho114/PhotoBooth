import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Filter } from '../types';

interface CameraProps {
  filter: Filter;
  onCapture: (dataUrl: string) => void;
  isCountDown: boolean;
  countDownValue: number;
}

export interface CameraHandle {
  capturePhoto: () => void;
}

export const Camera = forwardRef<CameraHandle, CameraProps>(({ filter, onCapture, isCountDown, countDownValue }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }, // Request landscape resolution
            aspectRatio: 4/3, // Request landscape
            facingMode: 'user'
          },
          audio: false,
        });
        setStream(currentStream);
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Không thể truy cập camera. Vui lòng cấp quyền.");
      }
    };

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    capturePhoto: () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Set canvas to 4:3 landscape ratio
        const targetRatio = 4/3;
        
        let sWidth = video.videoWidth;
        let sHeight = video.videoHeight;
        let sx = 0;
        let sy = 0;

        // Calculate crop to maintain aspect ratio 4:3
        if (sWidth / sHeight > targetRatio) {
          // Video is too wide, crop width
          const newWidth = sHeight * targetRatio;
          sx = (sWidth - newWidth) / 2;
          sWidth = newWidth;
        } else {
          // Video is too tall, crop height
          const newHeight = sWidth / targetRatio;
          sy = (sHeight - newHeight) / 2;
          sHeight = newHeight;
        }

        canvas.width = 800; // Width > Height for landscape
        canvas.height = 600; // 4:3 ratio

        context.filter = getComputedStyle(video).filter;
        
        // Mirror effect
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        // Draw cropped image
        context.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
        
        context.setTransform(1, 0, 0, 1, 0, 0);

        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        const dataUrl = canvas.toDataURL('image/png', 0.95);
        onCapture(dataUrl);
      }
    }
  }));

  const getFilterStyle = () => {
    return {};
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
      {error ? (
        <div className="flex items-center justify-center h-full text-red-400 p-4 text-center">
          {error}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform scale-x-[-1] transition-all duration-300 ${filter.cssClass}`}
            style={getFilterStyle()}
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Flash Effect */}
          {flash && <div className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none" />}
          
          {/* Countdown Overlay */}
          {isCountDown && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 backdrop-blur-sm">
              <span className="text-9xl font-black text-white animate-pulse drop-shadow-[0_0_15px_rgba(255,0,204,0.8)]">
                {countDownValue}
              </span>
            </div>
          )}
          
          {/* Grid Lines for 4:3 composition */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-1/3 border-b border-white/50 absolute top-0"></div>
            <div className="w-full h-1/3 border-b border-white/50 absolute top-1/3"></div>
            <div className="h-full w-1/3 border-r border-white/50 absolute left-0"></div>
            <div className="h-full w-1/3 border-r border-white/50 absolute left-1/3"></div>
          </div>
        </>
      )}
    </div>
  );
});

Camera.displayName = 'Camera';