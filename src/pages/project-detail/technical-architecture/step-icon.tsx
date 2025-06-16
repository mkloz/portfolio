import {
  Cloud,
  Code,
  CreditCard,
  Database,
  Globe,
  Server,
  Settings,
  Shield,
  Smartphone,
  TestTube,
  Zap
} from 'lucide-react';

import { cn } from '@/lib/utils';

import type { StepIconProps } from './types';

const STEP_ICONS = {
  frontend: Globe,
  backend: Server,
  database: Database,
  deployment: Cloud,
  mobile: Smartphone,
  testing: TestTube,
  devops: Settings,
  api: Code,
  auth: Shield,
  optimization: Zap,
  payment: CreditCard
};

const STEP_COLORS = {
  frontend: {
    primary: 'from-blue-600 to-blue-400',
    secondary: 'from-blue-500/20 to-blue-400/20',
    accent: 'blue-500'
  },
  backend: {
    primary: 'from-emerald-600 to-emerald-400',
    secondary: 'from-emerald-500/20 to-emerald-400/20',
    accent: 'emerald-500'
  },
  database: {
    primary: 'from-violet-600 to-violet-400',
    secondary: 'from-violet-500/20 to-violet-400/20',
    accent: 'violet-500'
  },
  deployment: {
    primary: 'from-orange-600 to-orange-400',
    secondary: 'from-orange-500/20 to-orange-400/20',
    accent: 'orange-500'
  },
  testing: {
    primary: 'from-amber-600 to-amber-400',
    secondary: 'from-amber-500/20 to-amber-400/20',
    accent: 'amber-500'
  },
  payment: {
    primary: 'from-green-600 to-green-400',
    secondary: 'from-green-500/20 to-green-400/20',
    accent: 'green-500'
  }
};

export const StepIcon = ({ stepId, isActive, isCompleted }: StepIconProps) => {
  const Icon = STEP_ICONS[stepId as keyof typeof STEP_ICONS] || Code;
  const colors = STEP_COLORS[stepId as keyof typeof STEP_COLORS] || STEP_COLORS.frontend;

  return (
    <div className="relative group">
      {/* Outer ring for active state */}
      {isActive && (
        <div className="absolute inset-0 w-14 h-14 sm:w-20 sm:h-20 -m-1 sm:-m-2 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      )}

      {/* Glow effect for active step */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.secondary} rounded-full blur-xl scale-150`}></div>
      )}

      {/* Main icon container */}
      <div
        className={cn(
          'relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border-2',
          isActive
            ? `bg-gradient-to-r ${colors.primary} border-white/30 scale-110 shadow-${colors.accent}/50`
            : isCompleted
              ? `bg-gradient-to-r ${colors.primary} border-white/20 shadow-lg hover:scale-105`
              : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:scale-105'
        )}>
        <Icon
          className={cn(
            'transition-all duration-300',
            isActive || isCompleted ? 'text-white' : 'text-slate-400',
            isActive && 'scale-110'
          )}
          size={isActive ? (window.innerWidth < 640 ? 18 : 24) : window.innerWidth < 640 ? 16 : 20}
        />

        {/* Completion indicator */}
        {isCompleted && !isActive && (
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
