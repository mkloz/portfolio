import { TechnologyCard } from './technology-card';
import type { TechnologyGridProps } from './types';

export const TechnologyGrid = ({ technologies, selectedCategory, getCategoryColor }: TechnologyGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {technologies.map((tech, index) => {
        // Determine if technology should be highlighted based on category selection
        const isHighlighted =
          selectedCategory === 'All' ||
          tech.category === selectedCategory ||
          (tech.category === 'Full-Stack' && (selectedCategory === 'Frontend' || selectedCategory === 'Backend'));

        // Determine if technology should be filtered out
        const isFiltered =
          selectedCategory !== 'All' &&
          tech.category !== selectedCategory &&
          !(tech.category === 'Full-Stack' && (selectedCategory === 'Frontend' || selectedCategory === 'Backend'));

        return (
          <TechnologyCard
            key={index}
            technology={tech}
            isHighlighted={isHighlighted}
            isFiltered={isFiltered}
            selectedCategory={selectedCategory}
            getCategoryColor={getCategoryColor}
          />
        );
      })}
    </div>
  );
};
