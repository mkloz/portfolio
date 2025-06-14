'use client';

import { Pause, Play, RotateCcw } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '../../../lib/utils';
import type { PlaybackControlsProps } from './types';

export const PlaybackControls = ({ isPlaying, onPlayToggle, onReset, gradient }: PlaybackControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onPlayToggle} className={cn(buttonVariants({ gradient }), 'bg-gradient-to-r')}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
    </div>
  );
};
