import { Play } from 'lucide-react';
import { HiStatusOnline } from 'react-icons/hi';

import { Image } from '@/components/common/image';
import { cn } from '@/lib/utils';

interface HeroImageProps {
  src: string;
  alt: string;
  isFullStack?: boolean;
  isOnline?: boolean;
  className?: string;
}

export const HeroImage = ({ src, alt, isFullStack = false, isOnline = false, className }: HeroImageProps) => {
  return (
    <div className={cn('relative px-2 py-8 sm:p-12 ', className)}>
      <div className="relative group">
        {/* Subtle border glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-300/40 via-gray-200/30 to-gray-300/40 dark:from-gray-600/40 dark:via-gray-500/30 dark:to-gray-600/40 rounded-2xl blur-sm" />

        {/* Main Image Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-102 transition-transform duration-500">
          <Image src={src || '/placeholder.svg'} alt={alt} className="w-full h-80 lg:h-96 object-cover" />

          {/* Overlay with Play Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Play className="text-white ml-1" size={32} />
            </div>
          </div>
        </div>

        {/* Floating Online Badge */}
        {isOnline && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500/70 to-emerald-500/70 backdrop-blur-sm border border-green-400/50 text-white rounded-lg px-2 py-2 shadow-md transform group-hover:scale-105 transition-transform duration-300 translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-2">
            <HiStatusOnline />
            <div className="text-sm font-bold hidden sm:block">Online</div>
          </div>
        )}

        {/* Floating Full Stack Badge */}
        {isFullStack && (
          <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blue-500/70 to-indigo-500/70 backdrop-blur-sm border border-blue-400/50 text-white rounded-lg px-4 py-2 shadow-md transform group-hover:scale-105 transition-transform duration-300 -translate-x-1/2 translate-y-1/2 hidden sm:flex">
            <div className="text-sm font-bold">Full Stack</div>
          </div>
        )}
      </div>
    </div>
  );
};
