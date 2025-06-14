import { Calendar, Clock, Code } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectMetaProps {
  status: string;
  year: number;
  duration: string;
  category: string;
  className?: string;
}

export const ProjectMeta = ({ status, year, duration, category, className }: ProjectMetaProps) => {
  return (
    <div className={cn('flex flex-wrap items-center justify-center lg:justify-start gap-4', className)}>
      <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30 px-4 py-2">
        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2 animate-pulse" />
        {status}
      </Badge>

      <Badge
        variant="outline"
        className="text-gray-700 dark:text-gray-200 border-gray-500 dark:border-gray-400 px-4 py-2 bg-white/10 dark:bg-white/5">
        <Calendar className="w-4 h-4 mr-2" />
        {year}
      </Badge>

      <Badge
        variant="outline"
        className="text-gray-700 dark:text-gray-200 border-gray-500 dark:border-gray-400 px-4 py-2 bg-white/10 dark:bg-white/5">
        <Clock className="w-4 h-4 mr-2" />
        {duration}
      </Badge>

      <Badge
        variant="outline"
        className="text-gray-700 dark:text-gray-200 border-gray-500 dark:border-gray-400 px-4 py-2 bg-white/10 dark:bg-white/5">
        <Code className="w-4 h-4 mr-2" />
        {category}
      </Badge>
    </div>
  );
};
