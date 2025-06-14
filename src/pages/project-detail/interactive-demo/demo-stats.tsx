import { cn } from '@/lib/utils';

import { buttonGradients } from '../../../components/ui/button';
import type { DemoStatsProps } from './types';

export const DemoStats = ({ stats, gradient }: DemoStatsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Demo Stats</h3>
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              'p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
              'flex justify-between items-center'
            )}>
            <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
            <span
              className={cn(
                buttonGradients[gradient],
                'text-xl font-black bg-gradient-to-r bg-clip-text text-transparent shadow-none'
              )}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
