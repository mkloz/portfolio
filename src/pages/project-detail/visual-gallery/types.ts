import type React from 'react';

import { ButtonGradient } from '../../../components/ui/button';
import { GalleryItem } from '../../../data/projects';

export interface VisualGalleryProps {
  gallery: GalleryItem[];
  gradient: ButtonGradient;
}

export interface GalleryItemProps {
  item: GalleryItem;
  index: number;
  onOpenLightbox: (index: number) => void;
}

export interface GalleryGridProps {
  gallery: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export interface LightboxProps {
  gallery: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export interface LightboxControlsProps {
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  showNavigation: boolean;
}

export interface GalleryHeaderProps {
  title?: string;
  description?: string;
}

export interface GalleryBackgroundProps {
  children: React.ReactNode;
}
