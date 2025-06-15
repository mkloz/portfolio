import type { LucideIcon } from 'lucide-react';

export interface ArchitectureNode {
  title: string;
  technologies: string[];
  description: string;
  connections: string[];
}

export interface TechnicalArchitectureProps {
  architecture: Record<string, ArchitectureNode>;
}

export interface MainLayerCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  isActive: boolean;
}

export interface IntegrationCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  parentLayer: string;
  isParentActive: boolean;
}

export interface FlowArrowProps {
  direction?: 'right' | 'down' | 'up' | 'left';
  isActive: boolean;
  className?: string;
}

export interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ComponentItem {
  name: string;
  category: string;
}

export interface ArchitectureDiagramProps {
  activeLayer: string | null;
}

export interface LayerDetailsProps {
  activeLayer: string | null;
  architecture: Record<string, ArchitectureNode>;
}

export interface CapabilityCardProps {
  capability: CapabilityItem;
}

export interface ComponentCardProps {
  component: ComponentItem;
}

export interface ArchitectureBackgroundProps {
  activeLayer: string | null;
}

export interface ArchitectureHeaderProps {
  isFlowActive: boolean;
  setIsFlowActive: (active: boolean) => void;
}
