import { cn } from '@/lib/utils';

interface OverviewBackgroundProps {
  className?: string;
}

export const OverviewBackground = ({ className }: OverviewBackgroundProps) => {
  return (
    <>
      {/* Main Background */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800',
          className
        )}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl" />
      </div>
    </>
  );
};
