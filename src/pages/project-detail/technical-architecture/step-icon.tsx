import {
  Book,
  Calendar,
  Cloud,
  Code,
  CreditCard,
  Database,
  Globe,
  Pencil,
  Server,
  Settings,
  Shield,
  Smartphone,
  TestTube,
  Zap
} from 'lucide-react';

import { cn } from '@/lib/utils';

import type { StepIconProps } from './types';

export const STEP_ICONS = {
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
  payment: CreditCard,
  design: Pencil,
  documentation: Book,
  planning: Calendar
};

const STEP_COLORS: Record<keyof typeof STEP_ICONS, { primary: string; secondary: string; accent: string }> = {
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
  },
  design: {
    primary: 'from-pink-600 to-pink-400',
    secondary: 'from-pink-500/20 to-pink-400/20',
    accent: 'pink-500'
  },
  documentation: {
    primary: 'from-purple-600 to-purple-400',
    secondary: 'from-purple-500/20 to-purple-400/20',
    accent: 'purple-500'
  },
  planning: {
    primary: 'from-yellow-600 to-yellow-400',
    secondary: 'from-yellow-500/20 to-yellow-400/20',
    accent: 'yellow-500'
  },
  mobile: {
    primary: 'from-teal-600 to-teal-400',
    secondary: 'from-teal-500/20 to-teal-400/20',
    accent: 'teal-500'
  },
  devops: {
    primary: 'from-indigo-600 to-indigo-400',
    secondary: 'from-indigo-500/20 to-indigo-400/20',
    accent: 'indigo-500'
  },
  api: {
    primary: 'from-red-600 to-red-400',
    secondary: 'from-red-500/20 to-red-400/20',
    accent: 'red-500'
  },
  auth: {
    primary: 'from-cyan-600 to-cyan-400',
    secondary: 'from-cyan-500/20 to-cyan-400/20',
    accent: 'cyan-500'
  },
  optimization: {
    primary: 'from-amber-600 to-amber-400',
    secondary: 'from-amber-500/20 to-amber-400/20',
    accent: 'amber-500'
  }
};

export const StepIcon = ({ stepId, isActive, isCompleted }: StepIconProps) => {
  const Icon = STEP_ICONS[stepId] || Code;
  const colors = STEP_COLORS[stepId] || STEP_COLORS.frontend;

  return (
    <div className="relative group">
      {/* Outer ring for active state */}
      {isActive && (
        <div className="absolute inset-0 w-12 h-12  sm:w-20 sm:h-20 -m-1 sm:-m-2 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      )}

      {/* Glow effect for active step */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.secondary} rounded-full blur-xl scale-150`}></div>
      )}

      {/* Main icon container */}
      <div
        className={cn(
          'relative w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg',
          isActive
            ? `bg-gradient-to-r ${colors.primary} scale-110 shadow-${colors.accent}/50`
            : isCompleted
              ? `bg-gradient-to-r ${colors.primary} shadow-lg hover:scale-105`
              : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:scale-105'
        )}>
        <Icon
          className={cn(
            'transition-all duration-300',
            isActive || isCompleted ? 'text-white' : 'text-slate-400',
            isActive && 'scale-110'
          )}
        />

        {/* Completion indicator */}
        {isCompleted && !isActive && (
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
