import React, { useEffect, useCallback } from 'react';
import { useProperty } from '../context/PropertyContext';
import { X, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ZoomIn } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const { lightboxState, closeLightbox, openLightbox } = useProperty();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxState) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        const nextIndex =
          (lightboxState.activeIndex - 1 + lightboxState.images.length) %
          lightboxState.images.length;
        openLightbox(lightboxState.images, nextIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex =
          (lightboxState.activeIndex + 1) % lightboxState.images.length;
        openLightbox(lightboxState.images, nextIndex);
      }
    },
    [lightboxState, closeLightbox, openLightbox]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!lightboxState || !lightboxState.isOpen) return null;

  const currentImage = lightboxState.images[lightboxState.activeIndex];
  if (!currentImage) return null;

  const handlePrev = () => {
    const nextIndex =
      (lightboxState.activeIndex - 1 + lightboxState.images.length) %
      lightboxState.images.length;
    openLightbox(lightboxState.images, nextIndex);
  };

  const handleNext = () => {
    const nextIndex =
      (lightboxState.activeIndex + 1) % lightboxState.images.length;
    openLightbox(lightboxState.images, nextIndex);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between text-white border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#C8A25D] font-mono">
            {lightboxState.activeIndex + 1} of {lightboxState.images.length}
          </span>
          <span className="text-white/30">|</span>
          <span className="text-sm font-semibold truncate max-w-xs sm:max-w-md">
            {currentImage.roomLabel || (currentImage.isExterior ? 'Exterior View' : 'Interior View')}
          </span>
          {currentImage.isIllustrative ? (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Illustrative Inspiration</span>
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified On-Site Photography</span>
            </span>
          )}
        </div>

        <button
          onClick={closeLightbox}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close full-screen image viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Stage with Prev/Next Navigation */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-transform hover:scale-110 cursor-pointer border border-white/10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Active High-Res Image Container */}
        <div className="max-w-5xl max-h-full flex flex-col items-center justify-center">
          <img
            src={currentImage.url}
            alt={currentImage.caption || currentImage.roomLabel || 'Property photograph'}
            referrerPolicy="no-referrer"
            className="max-h-[68vh] sm:max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
          />

          {/* Caption */}
          {currentImage.caption && (
            <p className="mt-3 text-center text-xs sm:text-sm text-slate-300 max-w-2xl px-4 line-clamp-2">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-transform hover:scale-110 cursor-pointer border border-white/10"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="p-3 sm:p-4 bg-black/70 border-t border-white/10 overflow-x-auto">
        <div className="flex items-center justify-center gap-2 min-w-max mx-auto px-4">
          {lightboxState.images.map((img, idx) => {
            const isActive = idx === lightboxState.activeIndex;
            return (
              <button
                key={img.id || idx}
                onClick={() => openLightbox(lightboxState.images, idx)}
                className={`relative w-16 h-12 rounded overflow-hidden cursor-pointer transition-all ${
                  isActive
                    ? 'ring-2 ring-[#C8A25D] scale-105 opacity-100'
                    : 'opacity-50 hover:opacity-90'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.roomLabel || `Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
