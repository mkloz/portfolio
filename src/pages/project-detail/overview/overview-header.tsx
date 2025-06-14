import { cn } from '@/lib/utils';

import { ButtonGradient, buttonGradients } from '../../../components/ui/button';

interface OverviewHeaderProps {
  gradient: ButtonGradient;
  description: string;
}

export const OverviewHeader = ({ description, gradient }: OverviewHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className={cn('text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6')}>
        Project{' '}
        <span className={cn(buttonGradients[gradient], 'bg-gradient-to-r bg-clip-text text-transparent shadow-none')}>
          Highlights
        </span>
      </h2>
      <p className={cn('text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed')}>{description}</p>
    </div>
  );
};
