import type React from 'react';

import { cn } from '@/lib/utils';

interface GalleryBackgroundProps {
  children: React.ReactNode;
}

export const GalleryBackground = ({ children }: GalleryBackgroundProps) => {
  return (
    <section className={cn('py-20', 'bg-gradient-to-br from-gray-50 to-white', 'dark:from-gray-900 dark:to-gray-800')}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </section>
  );
};
