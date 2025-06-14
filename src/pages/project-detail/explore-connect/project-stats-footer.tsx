import { cn } from '@/lib/utils';

import type { ProjectStats } from './types';

const PROJECT_STATS: ProjectStats[] = [
  {
    value: '100%',
    label: 'Open Source',
    gradient: 'from-cyan-200 to-blue-200'
  },
  {
    value: 'Live',
    label: 'Production Ready',
    gradient: 'from-green-200 to-emerald-200'
  },
  {
    value: 'Modern',
    label: 'Tech Stack',
    gradient: 'from-blue-200 to-cyan-200'
  },
  {
    value: 'Scalable',
    label: 'Architecture',
    gradient: 'from-cyan-200 to-teal-200'
  }
];

interface ProjectStatsFooterProps {
  className?: string;
}

export const ProjectStatsFooter = ({ className }: ProjectStatsFooterProps) => {
  return (
    <div className={cn('mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center', className)}>
      {PROJECT_STATS.map((stat, index) => (
        <div key={index} className="space-y-2">
          <div
            className={cn(
              'text-3xl font-black bg-clip-text text-transparent drop-shadow',
              `bg-gradient-to-r ${stat.gradient}`
            )}>
            {stat.value}
          </div>
          <div className="text-blue-100 text-sm drop-shadow-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
