'use client';

import { Layers, Pause, Play } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { ArchitectureHeaderProps } from './types';

export const ArchitectureHeader = ({ isFlowActive, setIsFlowActive }: ArchitectureHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-3 bg-cyan-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-cyan-500/20">
        <Layers className="text-cyan-400" size={20} />
        <span className="text-cyan-400 font-semibold">System Architecture</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
        Technical{' '}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Architecture</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Interactive system architecture with data flow visualization
      </p>

      <Button
        onClick={() => setIsFlowActive(!isFlowActive)}
        className={`${
          isFlowActive
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
        } hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25`}>
        {isFlowActive ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
        {isFlowActive ? 'Stop Flow' : 'Show Data Flow'}
      </Button>
    </div>
  );
};
