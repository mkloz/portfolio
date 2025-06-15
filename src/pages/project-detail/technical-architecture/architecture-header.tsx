'use client';

import { Layers } from 'lucide-react';

export const ArchitectureHeader = () => {
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
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Automated system architecture flow visualization</p>
    </div>
  );
};
