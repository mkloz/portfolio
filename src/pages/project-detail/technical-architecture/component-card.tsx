import { cn } from '@/lib/utils';

import type { ComponentCardProps } from './types';

// Define category colors outside component
const CATEGORY_COLORS: Record<string, string> = {
  Compute: 'from-blue-500 to-blue-600',
  Network: 'from-green-500 to-green-600',
  Monitoring: 'from-purple-500 to-purple-600',
  Database: 'from-red-500 to-red-600',
  Cache: 'from-orange-500 to-orange-600',
  Storage: 'from-yellow-500 to-yellow-600',
  Management: 'from-indigo-500 to-indigo-600',
  Framework: 'from-cyan-500 to-cyan-600',
  Styling: 'from-pink-500 to-pink-600',
  Animation: 'from-violet-500 to-violet-600',
  State: 'from-emerald-500 to-emerald-600',
  Language: 'from-blue-600 to-blue-700',
  Performance: 'from-green-600 to-green-700',
  Build: 'from-gray-500 to-gray-600',
  Runtime: 'from-slate-500 to-slate-600',
  Security: 'from-red-600 to-red-700',
  API: 'from-teal-500 to-teal-600',
  Queue: 'from-amber-500 to-amber-600',
  Logging: 'from-stone-500 to-stone-600',
  Search: 'from-lime-500 to-lime-600',
  Connection: 'from-sky-500 to-sky-600',
  Backup: 'from-rose-500 to-rose-600',
  Migration: 'from-fuchsia-500 to-fuchsia-600'
};

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const categoryColor = CATEGORY_COLORS[component.category] || 'from-gray-500 to-gray-600';

  return (
    <div className="group relative p-4 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-cyan-400/50 hover:bg-white/15 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg shadow-black/20">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center shrink-0 shadow-lg',
            categoryColor
          )}>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{component.category}</div>
          <div className="text-sm font-bold text-white leading-tight">{component.name}</div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
