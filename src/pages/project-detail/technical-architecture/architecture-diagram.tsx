'use client';

import { BarChart3, Cloud, Container, CreditCard, Database, Globe, Lock, Mail, Map, Server } from 'lucide-react';

import { cn } from '@/lib/utils';

import { FlowArrow } from './flow-arrow';
import { IntegrationCard } from './integration-card';
import { MainLayerCard } from './main-layer-card';
import type { ArchitectureDiagramProps } from './types';

// Constants defined outside component
const LAYER_COLORS = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-violet-500',
  infrastructure: 'from-gray-500 to-slate-600'
};

const FRONTEND_INTEGRATIONS = [
  { title: 'Google Maps', icon: Map, color: 'from-green-500 to-emerald-500' },
  { title: 'Analytics', icon: BarChart3, color: 'from-purple-500 to-violet-500' },
  { title: 'Auth0', icon: Lock, color: 'from-orange-500 to-red-500' }
];

const BACKEND_INTEGRATIONS = [
  { title: 'AWS S3', icon: Cloud, color: 'from-orange-500 to-amber-500' },
  { title: 'Stripe', icon: CreditCard, color: 'from-blue-500 to-indigo-500' },
  { title: 'SendGrid', icon: Mail, color: 'from-red-500 to-pink-500' }
];

const DATABASE_INTEGRATIONS = [
  { title: 'PostgreSQL', icon: Database, color: 'from-blue-600 to-blue-700' },
  { title: 'Redis', icon: Database, color: 'from-red-600 to-red-700' },
  { title: 'S3 Storage', icon: Cloud, color: 'from-orange-600 to-orange-700' }
];

export const ArchitectureDiagram = ({ activeLayer }: ArchitectureDiagramProps) => {
  return (
    <div className="relative mb-16">
      {/* Glow effect for entire architecture diagram when infrastructure is active */}
      {activeLayer === 'infrastructure' && (
        <div className="absolute -inset-4 bg-yellow-400/20 rounded-3xl blur-2xl animate-pulse"></div>
      )}

      <div
        className={cn(
          'relative bg-gradient-to-br from-slate-800/30 to-blue-900/30 backdrop-blur-xl border-2 rounded-3xl p-6 lg:p-12 transition-all duration-500 shadow-2xl shadow-black/50',
          activeLayer === 'infrastructure' ? 'border-yellow-400/50 shadow-2xl shadow-yellow-400/25' : 'border-white/10'
        )}>
        {/* Infrastructure Label */}
        <div
          className={cn(
            'absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center gap-3 transition-all duration-500',
            activeLayer === 'infrastructure' ? 'scale-105' : ''
          )}>
          <div
            className={cn(
              'relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500',
              activeLayer === 'infrastructure'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-400/50'
                : 'bg-gradient-to-r from-gray-500 to-slate-600'
            )}>
            <Container className="text-white" size={16} />
          </div>
          <span
            className={cn(
              'relative font-bold transition-colors text-sm lg:text-base',
              activeLayer === 'infrastructure' ? 'text-yellow-400' : 'text-white'
            )}>
            Infrastructure Layer
          </span>
        </div>

        {/* Main Architecture Flow */}
        <div className="mt-12 lg:mt-8">
          {/* Main Layer Row - Horizontal on large screens, Vertical on smaller screens */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-6 lg:mb-8">
            <MainLayerCard
              id="frontend"
              title="Frontend Layer"
              subtitle="User Interface & Experience"
              icon={Globe}
              color={LAYER_COLORS.frontend}
              isActive={activeLayer === 'frontend'}
            />

            <FlowArrow direction="down" isActive={activeLayer === 'frontend'} className="lg:hidden" />
            <FlowArrow direction="right" isActive={activeLayer === 'frontend'} className="hidden lg:flex" />

            <MainLayerCard
              id="backend"
              title="Backend Services"
              subtitle="API & Business Logic"
              icon={Server}
              color={LAYER_COLORS.backend}
              isActive={activeLayer === 'backend'}
            />

            <FlowArrow direction="down" isActive={activeLayer === 'backend'} className="lg:hidden" />
            <FlowArrow direction="right" isActive={activeLayer === 'backend'} className="hidden lg:flex" />

            <MainLayerCard
              id="database"
              title="Database Layer"
              subtitle="Data Storage & Management"
              icon={Database}
              color={LAYER_COLORS.database}
              isActive={activeLayer === 'database'}
            />
          </div>

          {/* Integration Arrows - Only show on extra large screens */}
          <div className="hidden xl:flex justify-center gap-12 mb-4">
            <div className="flex flex-col items-center">
              <FlowArrow direction="up" isActive={activeLayer === 'frontend'} />
            </div>
            <div className="w-64"></div>
            <div className="flex flex-col items-center">
              <FlowArrow direction="up" isActive={activeLayer === 'backend'} />
            </div>
            <div className="w-64"></div>
            <div className="flex flex-col items-center">
              <FlowArrow direction="up" isActive={activeLayer === 'database'} />
            </div>
          </div>

          {/* Integrations Row - Only show on extra large screens */}
          <div className="hidden xl:flex justify-center gap-12">
            {/* Frontend Integrations */}
            <div className="flex flex-col items-center">
              <div className="flex gap-4">
                {FRONTEND_INTEGRATIONS.map((integration, index) => (
                  <IntegrationCard
                    key={`frontend-integration-${index}`}
                    title={integration.title}
                    icon={integration.icon}
                    color={integration.color}
                    parentLayer="frontend"
                    isParentActive={activeLayer === 'frontend'}
                  />
                ))}
              </div>
            </div>

            {/* Backend Integrations */}
            <div className="flex flex-col items-center">
              <div className="flex gap-4">
                {BACKEND_INTEGRATIONS.map((integration, index) => (
                  <IntegrationCard
                    key={`backend-integration-${index}`}
                    title={integration.title}
                    icon={integration.icon}
                    color={integration.color}
                    parentLayer="backend"
                    isParentActive={activeLayer === 'backend'}
                  />
                ))}
              </div>
            </div>

            {/* Database Components */}
            <div className="flex flex-col items-center">
              <div className="flex gap-4">
                {DATABASE_INTEGRATIONS.map((integration, index) => (
                  <IntegrationCard
                    key={`database-integration-${index}`}
                    title={integration.title}
                    icon={integration.icon}
                    color={integration.color}
                    parentLayer="database"
                    isParentActive={activeLayer === 'database'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
