import { Technology } from '../../../data/technologies';
import { TechCard } from './tech-card';

interface TechnologiesGridProps {
  technologies: Technology[];
  categoryColors: Record<string, string>;
}

export const TechnologiesGrid = ({ technologies, categoryColors }: TechnologiesGridProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {technologies.map((tech, index) => (
          <TechCard key={index} tech={tech} categoryColors={categoryColors} />
        ))}
      </div>
    </div>
  );
};
