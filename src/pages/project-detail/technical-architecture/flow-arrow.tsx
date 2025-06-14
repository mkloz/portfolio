import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { FlowArrowProps } from './types';

export const FlowArrow = ({ direction = 'right', isActive, className = '' }: FlowArrowProps) => {
  const getRotation = () => {
    switch (direction) {
      case 'down':
        return 'rotate-90';
      case 'up':
        return '-rotate-90';
      case 'left':
        return 'rotate-180';
      default:
        return 'rotate-0';
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center transition-all duration-500',
        isActive ? 'text-yellow-400 scale-110' : 'text-cyan-400',
        className
      )}>
      <ArrowRight
        size={32}
        className={cn(getRotation(), isActive ? 'animate-pulse' : '', 'transition-transform duration-300')}
      />
    </div>
  );
};
