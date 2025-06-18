import * as React from 'react';

import { Image, ImageProps } from './image';

/**
 * GalleryImage component displays an image with object-contain and a blurred background version of the same image.
 * The main image stays centered and maintains its aspect ratio.
 */
export interface GalleryImageProps extends ImageProps {
  // Optionally override the blur amount for the background
  backgroundBlurAmount?: string;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  className,
  backgroundBlurAmount = '2rem',
  wrapperClassName,
  ...props
}) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${wrapperClassName || ''}`}>
      {/* Blurred background image */}
      {src && (
        <>
          <img
            src={src}
            alt={alt}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-[var(--blur-amount)] z-0 select-none pointer-events-none"
            style={{ filter: `blur(${backgroundBlurAmount})`, zIndex: 0 }}
          />
          {/* Dark overlay for depth */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
              backgroundColor: 'rgba(0,0,0,0.25)',
              zIndex: 1
            }}
          />
        </>
      )}
      {/* Main contained image */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Image
          src={src}
          alt={alt}
          className={`object-contain w-full h-full ${className || ''}`}
          wrapperClassName="w-full h-full"
          {...props}
        />
      </div>
    </div>
  );
};
