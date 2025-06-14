'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { LightboxControlsProps } from './types';

export const LightboxControls = ({ onClose, onNext, onPrev, showNavigation }: LightboxControlsProps) => {
  return (
    <>
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('absolute top-4 right-4 z-10', 'text-white hover:bg-white/20', 'w-12 h-12')}
        onClick={onClose}>
        <X size={24} />
      </Button>

      {/* Navigation Buttons */}
      {showNavigation && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn('absolute left-4 top-1/2 -translate-y-1/2 z-10', 'text-white hover:bg-white/20', 'w-12 h-12')}
            onClick={onPrev}>
            <ChevronLeft size={24} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'text-white hover:bg-white/20',
              'w-12 h-12'
            )}
            onClick={onNext}>
            <ChevronRight size={24} />
          </Button>
        </>
      )}
    </>
  );
};
