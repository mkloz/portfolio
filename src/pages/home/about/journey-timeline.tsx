import type React from 'react';

import { ME } from '@/data/me';
import { cn } from '@/lib/utils';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  color?: string;
}

interface JourneyCardProps {
  item: JourneyItem;
  index: number;
}

const JourneyCard = ({ item, index }: JourneyCardProps) => {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <>
      {/* Mobile: always card then dot */}
      <div className="flex flex-col md:hidden items-center gap-2">
        <div className="w-full">
          <div className="group border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                    `bg-gradient-to-r`,
                    item.color
                  )}>
                  {Icon ? <Icon size={18} className="text-white" /> : null}
                </div>
                <div className={cn('text-lg font-black bg-clip-text text-transparent', `bg-gradient-to-r`, item.color)}>
                  {item.year}
                </div>
              </div>
              <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full z-10 my-2">
          <div
            className={cn(
              'w-6 h-6 rounded-full shadow-lg border-4 border-white dark:border-gray-800',
              `bg-gradient-to-r`,
              item.color
            )}></div>
        </div>
      </div>
      {/* Desktop: alternate card left/right */}
      <div className="hidden md:flex flex-row items-center gap-0">
        {/* Left column: Card for even, empty for odd */}
        <div className="w-1/2 flex-1">
          {isEven && (
            <div className="group border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 mx-4">
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                      `bg-gradient-to-r`,
                      item.color
                    )}>
                    {Icon ? <Icon size={18} className="text-white" /> : null}
                  </div>
                  <div
                    className={cn('text-lg font-black bg-clip-text text-transparent', `bg-gradient-to-r`, item.color)}>
                    {item.year}
                  </div>
                </div>
                <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          )}
        </div>
        {/* Center column: Dot */}
        <div className="flex justify-center items-center w-auto flex-none z-10 my-0">
          <div
            className={cn(
              'w-6 h-6 rounded-full shadow-lg border-4 border-white dark:border-gray-800',
              `bg-gradient-to-r`,
              item.color
            )}></div>
        </div>
        {/* Right column: Card for odd, empty for even */}
        <div className="w-1/2 flex-1">
          {!isEven && (
            <div className="group border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 mx-4">
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                      `bg-gradient-to-r`,
                      item.color
                    )}>
                    {Icon ? <Icon size={18} className="text-white" /> : null}
                  </div>
                  <div
                    className={cn('text-lg font-black bg-clip-text text-transparent', `bg-gradient-to-r`, item.color)}>
                    {item.year}
                  </div>
                </div>
                <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const JourneyTimeline = () => {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-3">My Development Journey</h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">From curious beginner to experienced developer</p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

        <div className="space-y-8">
          {ME.timeline.map((item: JourneyItem, index: number) => (
            <JourneyCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
