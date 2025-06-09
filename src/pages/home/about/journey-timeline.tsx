import type React from 'react';

import { cn } from '@/lib/utils';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface JourneyCardProps {
  item: JourneyItem;
  index: number;
}

const JourneyCard = ({ item, index }: JourneyCardProps) => {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <div className={cn('flex items-center gap-2 md:gap-8', !isEven && 'flex-row-reverse')}>
      <div className="flex-1">
        <div className="group border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                  `bg-gradient-to-r`,
                  item.color
                )}>
                <Icon size={18} className="text-white" />
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

      <div className="relative z-10">
        <div
          className={cn(
            'w-6 h-6 rounded-full shadow-lg border-4 border-white dark:border-gray-800',
            `bg-gradient-to-r`,
            item.color
          )}></div>
      </div>

      <div className="flex-1"></div>
    </div>
  );
};

const JOURNEY = [
  {
    year: '2022',
    title: 'Started University',
    description: 'Began Software Development studies at KHPI',
    icon: ({ size, className }: { size: number; className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    color: 'from-blue-500 to-purple-500'
  },
  {
    year: '2023',
    title: 'First Full-Stack Project',
    description: 'Built my first complete web application',
    icon: ({ size, className }: { size: number; className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M16 8.5V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5" />
        <path d="M12 19v3" />
        <path d="M12 2v3" />
        <path d="m19 12 3-3-3-3" />
      </svg>
    ),
    color: 'from-green-500 to-blue-500'
  },
  {
    year: '2024',
    title: 'Advanced Development',
    description: 'Mastered modern frameworks and cloud technologies',
    icon: ({ size, className }: { size: number; className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2025',
    title: 'Ready for Industry',
    description: 'Seeking opportunities to make an impact',
    icon: ({ size, className }: { size: number; className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500'
  }
];
export const JourneyTimeline = () => {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-3">My Development Journey</h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">From curious beginner to passionate developer</p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

        <div className="space-y-8">
          {JOURNEY.map((item, index) => (
            <JourneyCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
