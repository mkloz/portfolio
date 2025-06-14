import { cn } from '@/lib/utils';

import { ButtonGradient, buttonGradients } from '../../../components/ui/button';

interface DemoHeaderProps {
  className?: string;
  gradient: ButtonGradient;
}

export const DemoHeader = ({ className, gradient }: DemoHeaderProps) => {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
        Interactive{' '}
        <span className={cn(buttonGradients[gradient], 'bg-gradient-to-r bg-clip-text text-transparent shadow-none')}>
          Demo
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Experience the application in action with this interactive demonstration across different devices
      </p>
    </div>
  );
};
