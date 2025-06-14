'use client';

import { cn } from '@/lib/utils';

import type { CategoryFilterProps } from './types';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  getCategoryCount,
  getCategoryColor
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            'group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300',
            selectedCategory === category
              ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg scale-105`
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-105'
          )}>
          <span className="relative z-10 flex items-center gap-2">
            {category}
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full',
                selectedCategory === category
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              )}>
              {getCategoryCount(category)}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};
