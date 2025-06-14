'use client';

import { cn } from '@/lib/utils';

import type { MainLayerCardProps } from './types';

export const MainLayerCard = ({ id, title, subtitle, icon: Icon, color, onClick, isActive }: MainLayerCardProps) => {
  return (
    <div
      key={id}
      className={cn('relative cursor-pointer transition-all duration-500', isActive ? 'scale-105' : 'hover:scale-102')}
      onClick={onClick}>
      <div className="w-64 h-32 relative max-w-full">
        {/* Main card */}
        <div
          className={cn(
            'relative w-full h-full rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm',
            isActive
              ? 'border-cyan-400 bg-gradient-to-br from-cyan-400/20 to-blue-400/20'
              : 'border-white/20 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/40'
          )}>
          <div className="p-6 h-full flex items-center gap-4">
            <div
              className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300',
                isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : `bg-gradient-to-r ${color}`
              )}>
              <Icon className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className={cn('text-xl font-bold transition-colors', isActive ? 'text-cyan-400' : 'text-white')}>
                {title}
              </h3>
              <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
