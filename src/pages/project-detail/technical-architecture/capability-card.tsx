import type { CapabilityCardProps } from './types';

export const CapabilityCard = ({ capability }: CapabilityCardProps) => {
  const Icon = capability.icon;

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
          <Icon className="text-white" size={18} />
        </div>
        <div>
          <h5 className="font-bold text-white mb-1">{capability.title}</h5>
          <p className="text-gray-400 text-sm">{capability.description}</p>
        </div>
      </div>
    </div>
  );
};
