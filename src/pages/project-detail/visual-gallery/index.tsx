'use client';

import { useCallback, useState } from 'react';

import { GalleryBackground } from './gallery-background';
import { GalleryGrid } from './gallery-grid';
import { GalleryHeader } from './gallery-header';
import { Lightbox } from './lightbox';
import type { VisualGalleryProps } from './types';

export const VisualGallery = ({ gallery, gradient }: VisualGalleryProps) => {
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxImage(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxImage !== null && gallery.length > 1) {
      setLightboxImage((lightboxImage + 1) % gallery.length);
    }
  }, [lightboxImage, gallery.length]);

  const prevImage = useCallback(() => {
    if (lightboxImage !== null && gallery.length > 1) {
      setLightboxImage(lightboxImage === 0 ? gallery.length - 1 : lightboxImage - 1);
    }
  }, [lightboxImage, gallery.length]);

  return (
    <section id="gallery" className="relative overflow-hidden">
      <GalleryBackground>
        <GalleryHeader gradient={gradient} />
        <GalleryGrid gallery={gallery} onOpenLightbox={openLightbox} />
      </GalleryBackground>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <Lightbox
          gallery={gallery}
          currentIndex={lightboxImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
};
