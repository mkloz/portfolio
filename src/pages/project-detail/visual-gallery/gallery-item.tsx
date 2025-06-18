'use client';

import { ZoomIn } from 'lucide-react';

import { cn } from '@/lib/utils';

import { GalleryImage } from '../../../components/common/gallery-image';
import type { GalleryItemProps } from './types';

export const GalleryItem = ({ item, index, onOpenLightbox }: GalleryItemProps) => {
  const handleClick = () => {
    onOpenLightbox(index);
  };

  return (
    <div
      className={cn(
        'group relative cursor-pointer',
        'bg-white dark:bg-gray-800',
        'rounded-2xl overflow-hidden shadow-lg',
        'border border-gray-200 dark:border-gray-700',
        'hover:shadow-2xl',
        'transition-all duration-500',
        'transform',
        'hover:scale-105'
      )}
      onClick={handleClick}>
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <GalleryImage src={item.image} alt={item.title} className={cn('w-full h-full z-0')} />

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 z-10',
            'bg-gradient-to-t from-black/80 via-black/20 to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300'
          )}
        />

        {/* Zoom Icon */}
        <div
          className={cn(
            'absolute top-4 right-4 z-20',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-300',
            'transform translate-y-2 group-hover:translate-y-0'
          )}>
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              'bg-white/20 backdrop-blur-sm',
              'border border-white/30',
              'hover:bg-white/30 transition-colors duration-200'
            )}>
            <ZoomIn className="text-white" size={20} />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-lg font-bold text-white [text-shadow:_0_0_10px_rgba(0,0,0,0.9)]">{item.title}</h3>
        </div>
      </div>
    </div>
  );
};
