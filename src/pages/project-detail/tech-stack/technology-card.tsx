import { cn } from '@/lib/utils';

import type { TechnologyCardProps } from './types';

export const TechnologyCard = ({
  technology,
  isHighlighted,
  isFiltered,
  selectedCategory,
  getCategoryColor
}: TechnologyCardProps) => {
  const Icon = technology.icon;

  return (
    <div
      className={cn(
        'group relative transition-all duration-500',
        isFiltered ? 'opacity-20 scale-90 blur-sm' : 'opacity-100 scale-100 blur-0',
        isHighlighted ? 'hover:scale-110' : 'hover:scale-105'
      )}>
      {/* Glow effect for highlighted items */}
      {isHighlighted && (
        <div
          className="absolute -inset-2 rounded-2xl blur-lg opacity-30 animate-pulse"
          style={{ backgroundColor: technology.color }}
        />
      )}

      <div
        className={cn(
          'relative w-full aspect-square rounded-2xl border-2 transition-all duration-300',
          isHighlighted && ' bg-card/70 shadow-lg hover:shadow-xl',
          'backdrop-blur-sm',
          isFiltered && 'bg-background'
        )}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Icon */}
          <div className={cn('transition-all duration-300', isHighlighted ? 'mb-3' : 'mb-2', 'group-hover:scale-110')}>
            <div
              style={technology.bgColor ? { backgroundColor: technology.bgColor } : {}}
              className={cn(technology.bgColor ? 'rounded-md flex items-center justify-center' : '', 'inline-flex')}>
              <Icon
                color={isHighlighted ? technology.color : '#9CA3AF'}
                className={cn(
                  'transition-all duration-300',
                  isHighlighted ? 'size-8' : 'size-6',
                  technology.bgColor && 'p-1 size-8'
                )}
              />
            </div>
          </div>

          {/* Name */}
          <div
            className={cn(
              'text-center transition-all duration-300',
              isHighlighted
                ? 'text-gray-900 dark:text-gray-100 font-semibold text-sm'
                : 'text-gray-500 dark:text-gray-600 font-medium text-xs'
            )}>
            {technology.name}
          </div>

          {/* Category badge for highlighted items */}
          {isHighlighted && selectedCategory === 'All' && (
            <div
              className={cn(
                'absolute bottom-4 left-0 right-0 px-2 py-1 mx-auto w-max rounded-full text-xs font-medium bg-gradient-to-r',
                getCategoryColor(technology.category),
                'text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              )}>
              {technology.category}
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300',
            isHighlighted ? `bg-gradient-to-br ${getCategoryColor(technology.category)}` : 'bg-gray-500'
          )}
        />
      </div>
    </div>
  );
};
