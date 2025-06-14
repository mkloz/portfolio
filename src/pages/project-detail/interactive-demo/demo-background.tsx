import { cn } from '@/lib/utils';

interface DemoBackgroundProps {
  className?: string;
}

export const DemoBackground = ({ className }: DemoBackgroundProps) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500/5 rounded-full blur-lg" />
    </div>
  );
};
