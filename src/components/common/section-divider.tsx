// Create a new component for the section divider
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider = ({ className }: SectionDividerProps) => {
  return (
    <div className={cn('flex items-center justify-center mb-10', className)}>
      <div className="flex items-center justify-center grow">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full animate-pulse shadow-sm shadow-blue-500/25 dark:shadow-blue-400/25 shrink-0"></div>
        <div className="max-w-100 w-full h-1 mx-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 dark:from-pink-400 dark:to-red-400 rounded-full animate-pulse delay-300 shadow-sm shadow-pink-500/25 dark:shadow-pink-400/25 shrink-0"></div>
      </div>
    </div>
  );
};
