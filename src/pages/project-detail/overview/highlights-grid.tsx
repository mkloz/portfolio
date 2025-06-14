import { cn } from '@/lib/utils';

import { HighlightCard } from './highlight-card';
import type { HighlightsGridProps } from './types';

export const HighlightsGrid = ({ highlights }: HighlightsGridProps) => {
  return (
    <div className={cn('grid md:grid-cols-2 gap-8')}>
      {highlights.map((highlight, index) => (
        <HighlightCard key={index} highlight={highlight} index={index} />
      ))}
    </div>
  );
};
