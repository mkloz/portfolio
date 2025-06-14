'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import type { TechStackBackgroundProps } from './types';

export const TechStackBackground = ({ dotCount = 15 }: TechStackBackgroundProps) => {
  const [dots, setDots] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate random positions for dots
    const newDots = Array.from({ length: dotCount }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setDots(newDots);
  }, [dotCount]);

  return (
    <div className="absolute inset-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),inset_0_20px_60px_rgba(255,255,255,0.1),inset_0_-10px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.25]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.6)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {dots.map((dot, i) => (
        <div
          key={i}
          className={cn('absolute w-1 h-1 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse')}
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
            animationDuration: dot.duration
          }}
        />
      ))}
    </div>
  );
};
