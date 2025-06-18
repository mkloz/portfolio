'use client';

import { Link } from '../../../components/common/link';
import { buttonVariants } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';
import { DemoStats } from './demo-stats';
import { DeviceSelector } from './device-selector';
import { PlaybackControls } from './playback-controls';
import type { DemoControlsProps } from './types';

export const DemoControls = ({
  devices,
  currentDevice,
  onDeviceChange,
  isPlaying,
  onPlayToggle,
  onReset,
  stats,
  project
}: DemoControlsProps) => {
  return (
    <div className="space-y-8">
      <DeviceSelector devices={devices} currentDevice={currentDevice} onDeviceChange={onDeviceChange} />

      <PlaybackControls
        isPlaying={isPlaying}
        onPlayToggle={onPlayToggle}
        onReset={onReset}
        gradient={project.gradient}
      />

      <DemoStats stats={stats} gradient={project.gradient} />

      {/* Call to Action */}
      {project.website && (
        <Link
          to={project.website}
          unstyled
          className={cn(buttonVariants({ gradient: project.gradient, size: 'lg' }), 'grow w-full')}>
          Visit Website
        </Link>
      )}
    </div>
  );
};
