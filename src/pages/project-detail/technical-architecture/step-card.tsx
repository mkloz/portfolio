import { Award, CheckCircle, Clock, Code2, Cpu, Lightbulb, Target } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { StepCardProps } from './types';

const STEP_THEMES = {
  frontend: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    icon: Code2,
    color: 'blue'
  },
  backend: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    icon: Cpu,
    color: 'emerald'
  },
  database: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    icon: Target,
    color: 'violet'
  },
  deployment: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    icon: Award,
    color: 'orange'
  },
  testing: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    icon: Target,
    color: 'amber'
  },
  payment: {
    gradient: 'from-slate-800/60 via-slate-900/70 to-slate-800/60',
    border: 'border-slate-700/30',
    accent: 'text-green-400',
    accentBg: 'bg-green-500/10',
    icon: Award,
    color: 'green'
  }
};

export const StepCard = ({ step, isActive }: StepCardProps) => {
  if (!isActive) return null;

  const theme = STEP_THEMES[step.id as keyof typeof STEP_THEMES] || STEP_THEMES.frontend;
  const IconComponent = theme.icon;

  return (
    <div className="relative animate-in slide-in-from-bottom-4 duration-700 mt-4">
      {/* Card container */}
      <div
        className={`relative bg-gradient-to-br ${theme.gradient} backdrop-blur-xl border ${theme.border} rounded-3xl shadow-2xl overflow-hidden`}>
        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-6 justify-between">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">{step.title}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16} />
                    <span className="text-sm font-medium">{step.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <CheckCircle size={14} className="text-green-400" />
                    <span className="text-xs font-medium text-green-400">Completed</span>
                  </div>
                </div>
              </div>
              <div
                className={`w-16 h-16 shrink-0 rounded-2xl ${theme.accentBg} border ${theme.border} flex items-center justify-center backdrop-blur-sm`}>
                <IconComponent size={28} className={theme.accent} />
              </div>
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {/* Technologies section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <Code2 size={16} className="text-slate-300" />
                </div>
                <h4 className="text-xl font-semibold text-white">Technology Stack</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {step.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 px-4 py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Two column layout for decisions and achievements */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Key Decisions */}
              {step.decisions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Lightbulb size={16} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">Key Decisions</h4>
                  </div>
                  <div className="space-y-4">
                    {step.decisions.map((decision, index) => (
                      <div
                        key={index}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                        <div className="font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          {decision.decision}
                        </div>
                        <div className="text-slate-400 text-sm leading-relaxed">{decision.reasoning}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Achievements</h4>
                </div>
                <div className="space-y-4">
                  {step.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mt-0.5 shadow-sm flex-shrink-0">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
