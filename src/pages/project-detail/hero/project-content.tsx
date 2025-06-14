import { cn } from '@/lib/utils';

interface ProjectContentProps {
  title: string;
  tagline: string;
  description: string;
  className?: string;
}

export const ProjectContent = ({ title, tagline, description, className }: ProjectContentProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none text-white drop-shadow-lg">{title}</h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white/90 drop-shadow-md">{tagline}</h2>

        <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-sm">{description}</p>
      </div>
    </div>
  );
};
