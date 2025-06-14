import { cn } from '@/lib/utils';

import { ButtonGradient, buttonGradients } from '../../../components/ui/button';

interface GalleryHeaderProps {
  title?: string;
  description?: string;
  gradient: ButtonGradient;
}

const DEFAULT_TITLE = 'Project Gallery';
const DEFAULT_DESCRIPTION =
  'Explore the visual journey of this project through carefully curated screenshots and design highlights';

export const GalleryHeader = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  gradient
}: GalleryHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className={cn('text-4xl md:text-5xl font-black mb-4', 'text-gray-900 dark:text-gray-100')}>
        {title.split(' ').map((word, index) =>
          index === 1 ? (
            <span
              key={index}
              className={cn(buttonGradients[gradient], 'bg-gradient-to-r bg-clip-text text-transparent shadow-none')}>
              {word}
            </span>
          ) : (
            <span key={index}>{word} </span>
          )
        )}
      </h2>
      <p className={cn('text-xl max-w-3xl mx-auto', 'text-gray-600 dark:text-gray-400')}>{description}</p>
    </div>
  );
};
