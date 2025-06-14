import { cn } from '@/lib/utils';

import type { HighlightCardProps } from './types';

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const Icon = highlight.icon;

  return (
    <div
      key={index}
      className={cn(
        'group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl',
        'rounded-3xl hover:rounded-t-3xl hover:rounded-b-sm p-8',
        'shadow-xl border border-white/50 dark:border-gray-700/50',
        'hover:shadow-2xl transition-all duration-500 hover:scale-105'
      )}>
      {/* Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5',
          'rounded-3xl group-hover:rounded-t-3xl group-hover:rounded-b-sm',
          'transition-all duration-500',
          highlight.color
        )}
      />

      <div className="relative">
        {/* Icon and Stats */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={cn(
              'w-16 h-16 bg-gradient-to-r rounded-2xl flex items-center justify-center',
              'group-hover:scale-110 transition-transform duration-300 shadow-lg',
              highlight.color
            )}>
            <Icon className="text-white" size={28} />
          </div>
          <div className="text-right">
            <div className={cn('text-lg font-black bg-gradient-to-r bg-clip-text text-transparent', highlight.color)}>
              {highlight.stats}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Achievement</div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-3">{highlight.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{highlight.description}</p>
      </div>

      {/* Hover Effect Line */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r',
          'transform scale-x-0 group-hover:scale-x-100',
          'transition-transform duration-300 rounded-b-3xl',
          highlight.color
        )}
      />
    </div>
  );
};
