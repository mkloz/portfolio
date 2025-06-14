import type { TechStackHeaderProps } from './types';

export const TechStackHeader = ({ title, description }: TechStackHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
        {title.split(' ')[0]}{' '}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {title.split(' ')[1]}
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{description}</p>
    </div>
  );
};
