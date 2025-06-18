import { Technology } from '../../../data/projects';

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  getCategoryCount: (category: string) => number;
  getCategoryColor: (category: string) => string;
}

export interface TechnologyCardProps {
  technology: Technology;
  isHighlighted: boolean;
  isFiltered: boolean;
  selectedCategory: string;
  getCategoryColor: (category: string) => string;
}

export interface TechnologyGridProps {
  technologies: Technology[];
  selectedCategory: string;
  getCategoryColor: (category: string) => string;
}

export interface CategoryInfoProps {
  selectedCategory: string;
  filteredTechnologies: Technology[];
  getCategoryColor: (category: string) => string;
}

export interface TechStackHeaderProps {
  title: string;
  description: string;
}

export interface TechStackBackgroundProps {
  dotCount?: number;
}

export interface TechStackShowcaseProps {
  technologies: Technology[];
}
