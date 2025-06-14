'use client';

import { useCallback, useEffect } from 'react';

import { Image } from '@/components/common/image';
import { cn } from '@/lib/utils';

import { LightboxControls } from './lightbox-controls';
import type { LightboxProps } from './types';

export const Lightbox = ({ gallery, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  const currentItem = gallery[currentIndex];
  const showNavigation = gallery.length > 1;

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    },
    [onNext, onPrev, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className={cn('fixed inset-0 z-50', 'bg-black/95', 'flex items-center justify-center p-4')}>
      <div className="relative max-w-6xl max-h-full w-full">
        <LightboxControls onClose={onClose} onNext={onNext} onPrev={onPrev} showNavigation={showNavigation} />

        {/* Image */}
        <div className="relative">
          <Image
            src={currentItem.image || '/placeholder.svg'}
            alt={currentItem.title}
            className={cn('max-w-full max-h-[90vh] object-contain', 'rounded-lg mx-auto')}
          />

          {/* Compact Image Info */}
          <div
            className={cn(
              'absolute top-4 left-4',
              'bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2',
              'border border-white/20'
            )}>
            <div className="flex items-center gap-3">
              <h4 className="text-white font-medium text-sm">{currentItem.title}</h4>
              <div className="text-white/70 text-xs">
                {currentIndex + 1} / {gallery.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
