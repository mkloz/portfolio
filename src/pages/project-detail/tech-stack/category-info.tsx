import type { CategoryInfoProps } from './types';

export const CategoryInfo = ({ selectedCategory, filteredTechnologies, getCategoryColor }: CategoryInfoProps) => {
  if (selectedCategory === 'All') {
    return null;
  }

  return (
    <div className="mt-12 text-center">
      <div
        className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${getCategoryColor(
          selectedCategory
        )} text-white shadow-lg`}>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="font-semibold">
          Showing {filteredTechnologies.length} {selectedCategory} technologies
        </span>
      </div>
    </div>
  );
};
