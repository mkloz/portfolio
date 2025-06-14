import { cn } from '@/lib/utils';

import { GalleryItem } from './gallery-item';
import type { GalleryGridProps } from './types';

export const GalleryGrid = ({ gallery, onOpenLightbox }: GalleryGridProps) => {
  return (
    <div className={cn('grid gap-8 mb-16', 'md:grid-cols-2 lg:grid-cols-3')}>
      {gallery.map((item, index) => (
        <GalleryItem key={index} item={item} index={index} onOpenLightbox={onOpenLightbox} />
      ))}
    </div>
  );
};
