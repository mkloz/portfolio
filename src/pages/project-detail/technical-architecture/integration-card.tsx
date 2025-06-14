'use client';

import { cn } from '@/lib/utils';

import type { IntegrationCardProps } from './types';

export const IntegrationCard = ({ title, icon: Icon, color, isParentActive, onClick }: IntegrationCardProps) => {
  return (
    <div
      className={cn('cursor-pointer transition-all duration-500', isParentActive ? 'scale-105' : 'hover:scale-102')}
      onClick={onClick}>
      <div className="w-24 h-24 relative">
        {/* Glow effect when parent layer is active */}
        {isParentActive && <div className="absolute inset-0 bg-yellow-400/30 rounded-xl blur-lg animate-pulse"></div>}

        <div
          className={cn(
            'relative w-full h-full rounded-xl border-2 transition-all duration-500 backdrop-blur-sm',
            isParentActive
              ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-400/20'
              : 'border-white/20 bg-gradient-to-br from-white/5 to-white/10 hover:border-white/30'
          )}>
          <div className="p-3 h-full flex flex-col items-center justify-center text-center">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-300',
                isParentActive ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : `bg-gradient-to-r ${color}`
              )}>
              <Icon className="text-white" size={14} />
            </div>
            <span
              className={cn(
                'relative font-bold transition-colors text-sm lg:text-base',
                isParentActive ? 'text-yellow-400' : 'text-white'
              )}>
              {title}
            </span>
          </div>

          {isParentActive && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping ml-2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
