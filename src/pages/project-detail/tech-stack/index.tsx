'use client';

import { useState } from 'react';

import { CategoryFilter } from './category-filter';
import { CategoryInfo } from './category-info';
import { TechStackBackground } from './tech-stack-background';
import { TechStackHeader } from './tech-stack-header';
import { TechnologyGrid } from './technology-grid';
import type { TechStackShowcaseProps } from './types';

// Category color mapping - defined outside component to prevent recreation
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'from-blue-500/80 to-cyan-500/80',
  Backend: 'from-green-500/80 to-emerald-500/80',
  Database: 'from-purple-500/80 to-violet-500/80',
  DevOps: 'from-orange-500/80 to-red-500/80',
  default: 'from-gray-500/80 to-gray-700/80'
};

export const TechStackShowcase = ({ technologies = [] }: TechStackShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories and add "All" at the beginning
  const categories = ['All', ...new Set(technologies.map((tech) => tech.category))];

  const filteredTechnologies =
    selectedCategory === 'All' ? technologies : technologies.filter((tech) => tech.category === selectedCategory);

  const getCategoryColor = (category: string): string => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  };

  const getCategoryCount = (category: string): number => {
    if (category === 'All') return technologies.length;
    return technologies.filter((tech) => tech.category === category).length;
  };

  return (
    <section
      id="tech-stack"
      className="py-20 bg-gradient-to-br from-green-300/20 via-teal-300/20 to-sky-500/20 relative overflow-hidden">
      {/* Background Elements */}
      <TechStackBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <TechStackHeader
            title="Technology Stack"
            description="The powerful technologies that bring this project to life"
          />

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            getCategoryCount={getCategoryCount}
            getCategoryColor={getCategoryColor}
          />

          {/* Technologies Grid */}
          <TechnologyGrid
            technologies={technologies}
            selectedCategory={selectedCategory}
            getCategoryColor={getCategoryColor}
          />

          {/* Selected Category Info */}
          <CategoryInfo
            selectedCategory={selectedCategory}
            filteredTechnologies={filteredTechnologies}
            getCategoryColor={getCategoryColor}
          />
        </div>
      </div>
    </section>
  );
};
