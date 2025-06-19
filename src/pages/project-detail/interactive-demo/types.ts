import { ElementType } from 'react';

import { ButtonGradient } from '../../../components/ui/button';
import { Project } from '../../../data/projects';

export interface Device {
  id: 'desktop' | 'tablet' | 'mobile' | 'laptop';
  icon: ElementType;
  label: string;
  width: string;
  aspectRatio: string;
}

export interface DemoStat {
  label: string;
  value: string;
}

export interface DeviceSelectorProps {
  devices: Device[];
  currentDevice: Device['id'];
  onDeviceChange: (deviceId: Device['id']) => void;
}

export interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onReset: () => void;
  gradient: ButtonGradient;
}

export interface DemoStatsProps {
  stats: DemoStat[];
  gradient: ButtonGradient;
}

export interface DemoDisplayProps {
  project: Project;
  currentDevice: Device['id'];
  devices: Device[];
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export interface DemoControlsProps {
  devices: Device[];
  currentDevice: Device['id'];
  onDeviceChange: (deviceId: Device['id']) => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onReset: () => void;
  stats: DemoStat[];
  project: Project;
}

export interface InteractiveDemoProps {
  project: Project;
}
