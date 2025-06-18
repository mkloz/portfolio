import { Play } from 'lucide-react';
import { HiStatusOnline } from 'react-icons/hi';

import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

import { Image } from '../../../components/common/image';
import { Link } from '../../../components/common/link';
import { useScrollIntoView } from '../../../hooks/use-scroll-into-view';

interface HeroImageProps {
  src: string;
  alt: string;
  projectType: Project['category'];
  isOnline?: boolean;
  className?: string;
}

const getProjectTypeConfig = (type: Project['category']) => {
  switch (type) {
    case 'Frontend':
      return {
        label: 'Frontend',
        gradient: 'from-purple-500/70 to-pink-500/70',
        borderColor: 'border-purple-400/50'
      };
    case 'Backend':
      return {
        label: 'Backend',
        gradient: 'from-green-500/70 to-emerald-500/70',
        borderColor: 'border-green-400/50'
      };
    case 'Full-Stack':
      return {
        label: 'Full Stack',
        gradient: 'from-blue-500/70 to-indigo-500/70',
        borderColor: 'border-blue-400/50'
      };
    case 'Other':
      return {
        label: 'Project',
        gradient: 'from-gray-500/70 to-slate-500/70',
        borderColor: 'border-gray-400/50'
      };
    case 'Mobile':
      return {
        label: 'Mobile',
        gradient: 'from-red-500/70 to-orange-500/70',
        borderColor: 'border-red-400/50'
      };
    case 'Desktop':
      return {
        label: 'Desktop',
        gradient: 'from-blue-500/70 to-indigo-500/70',
        borderColor: 'border-blue-400/50'
      };
    case 'AI':
      return {
        label: 'AI',
        gradient: 'from-purple-500/70 to-pink-500/70',
        borderColor: 'border-purple-400/50'
      };
    case 'DevOps':
      return {
        label: 'DevOps',
        gradient: 'from-gray-500/70 to-slate-500/70',
        borderColor: 'border-gray-400/50'
      };
  }
};

export const HeroImage = ({ src, alt, projectType, isOnline = false, className }: HeroImageProps) => {
  const typeConfig = getProjectTypeConfig(projectType);
  const scrollTo = useScrollIntoView();
  return (
    <Link
      to={`#demo`}
      unstyled
      className={cn('relative px-2 py-8 sm:p-12 ', className)}
      onClick={(e) => {
        e.preventDefault();
        scrollTo('demo');
      }}>
      <div className="relative group">
        {/* Subtle border glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-300/40 via-gray-200/30 to-gray-300/40 dark:from-gray-600/40 dark:via-gray-500/30 dark:to-gray-600/40 rounded-2xl blur-sm" />

        {/* Main Image Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-102 transition-transform duration-500">
          <Image src={src || '/placeholder.svg'} alt={alt} className="w-full  h-auto" />

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

        {/* Floating Project Type Badge */}
        <div
          className={cn(
            'absolute bottom-0 left-0 bg-gradient-to-r backdrop-blur-sm border text-white rounded-lg px-4 py-2 shadow-md transform group-hover:scale-105 transition-transform duration-300 -translate-x-1/2 translate-y-1/2 hidden sm:flex',
            typeConfig.gradient,
            typeConfig.borderColor
          )}>
          <div className="text-sm font-bold">{typeConfig.label}</div>
        </div>
      </div>
    </Link>
  );
};
