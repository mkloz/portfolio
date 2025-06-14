import { cn } from '@/lib/utils';

import type { ProjectStats } from './types';

interface QuickStatsProps {
  stats: ProjectStats;
  className?: string;
}

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="text-3xl font-black text-white drop-shadow-lg">{value}</div>
    <div className="text-sm text-white/80 font-medium">{label}</div>
  </div>
);

export const QuickStats = ({ stats, className }: QuickStatsProps) => {
  const statsData = [
    {
      value: stats.technologies,
      label: 'Technologies'
    },
    {
      value: stats.features,
      label: 'Features'
    },
    {
      value: stats.linesOfCode,
      label: 'Lines of Code'
    },
    {
      value: stats.commits,
      label: 'Commits'
    }
  ];

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/30', className)}>
      {statsData.map((stat) => (
        <StatItem key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
};
