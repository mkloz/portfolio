import { Technology } from '@/data/technologies';
import { cn } from '@/lib/utils';

interface TechCardProps {
  tech: Technology;
  categoryColors: Record<string, string>;
}

export const TechCard = ({ tech, categoryColors }: TechCardProps) => {
  const Icon = tech.icon;
  // Extract the first color from the gradient for the icon
  const iconColor = tech.color.split(' ')[0].replace('from-[', '').replace(']', '');

  return (
    <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-xl p-1 hover:bg-white dark:hover:bg-gray-800 transition-transform duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl aspect-square flex flex-col justify-center">
      <div className="text-center px-1">
        <div className="text-2xl mb-1 group-hover:scale-125 transition-transform duration-300">
          <div
            style={tech.bgColor ? { backgroundColor: tech.bgColor } : {}}
            className={cn(tech.bgColor ? 'rounded-full flex items-center justify-center' : '', 'inline-flex')}>
            <Icon className={cn('mx-auto size-6', tech.bgColor && 'p-1')} style={{ color: iconColor }} size={24} />
          </div>
        </div>
        <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-0.5 leading-tight px-0.5">
          {tech.name}
        </div>
        <div
          className={cn(
            'text-xs font-medium bg-clip-text text-transparent',
            `bg-gradient-to-r ${categoryColors[tech.category]}`
          )}>
          {tech.category}
        </div>
      </div>
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300',
          `bg-gradient-to-r ${tech.color}`
        )}></div>
    </div>
  );
};
