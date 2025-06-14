import {
  Building,
  Clock,
  Code,
  Container,
  Cpu,
  FileJson,
  Gauge,
  Globe,
  HardDrive,
  Layers,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Table,
  Users,
  Zap
} from 'lucide-react';

import { CapabilityCard } from './capability-card';
import { ComponentCard } from './component-card';
import type { LayerDetailsProps } from './types';

// Constants defined outside component
const LAYER_CAPABILITIES = {
  infrastructure: [
    {
      icon: Building,
      title: 'Cloud Infrastructure',
      description: 'AWS/Azure multi-region deployment with auto-scaling'
    },
    {
      icon: Gauge,
      title: 'Monitoring & Alerts',
      description: 'Real-time monitoring with automated incident response'
    },
    {
      icon: Settings,
      title: 'DevOps Pipeline',
      description: 'CI/CD with automated testing and deployment'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'SOC2 compliant with end-to-end encryption'
    }
  ],
  frontend: [
    {
      icon: Code,
      title: 'Component Architecture',
      description: 'Modular React components with atomic design principles'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: '98/100 Lighthouse score with optimized bundle size'
    },
    {
      icon: Users,
      title: 'User Experience',
      description: 'Responsive design with accessibility compliance'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Internationalization support for 12 languages'
    }
  ],
  backend: [
    {
      icon: Server,
      title: 'API Architecture',
      description: 'RESTful and GraphQL endpoints with comprehensive documentation'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'JWT authentication with role-based access control'
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'Average response time under 120ms with 99.9% uptime'
    },
    {
      icon: Cpu,
      title: 'Scalability',
      description: 'Horizontal scaling with containerized microservices'
    }
  ],
  database: [
    {
      icon: Table,
      title: 'Data Structure',
      description: 'Normalized schema with optimized indexes and relations'
    },
    {
      icon: HardDrive,
      title: 'Storage Strategy',
      description: 'Multi-tier storage with hot/cold data separation'
    },
    {
      icon: RefreshCw,
      title: 'Replication',
      description: 'Multi-region replication with failover capabilities'
    },
    {
      icon: FileJson,
      title: 'Query Performance',
      description: 'Optimized queries with <50ms average execution time'
    }
  ]
};

const KEY_COMPONENTS = {
  infrastructure: [
    { name: 'AWS EC2 Auto Scaling Groups', category: 'Compute' },
    { name: 'Application Load Balancer', category: 'Network' },
    { name: 'CloudWatch Monitoring', category: 'Monitoring' },
    { name: 'AWS RDS Multi-AZ', category: 'Database' },
    { name: 'ElastiCache Redis Cluster', category: 'Cache' },
    { name: 'S3 Bucket with CloudFront', category: 'Storage' },
    { name: 'Route 53 DNS Management', category: 'Network' },
    { name: 'AWS Systems Manager', category: 'Management' }
  ],
  frontend: [
    { name: 'React 18 with Hooks', category: 'Framework' },
    { name: 'Next.js App Router', category: 'Framework' },
    { name: 'Tailwind CSS Framework', category: 'Styling' },
    { name: 'Framer Motion Animations', category: 'Animation' },
    { name: 'React Query for State', category: 'State' },
    { name: 'TypeScript Integration', category: 'Language' },
    { name: 'PWA Service Worker', category: 'Performance' },
    { name: 'Webpack Bundle Analyzer', category: 'Build' }
  ],
  backend: [
    { name: 'Node.js Express Server', category: 'Runtime' },
    { name: 'NestJS Framework', category: 'Framework' },
    { name: 'JWT Authentication', category: 'Security' },
    { name: 'GraphQL with Apollo', category: 'API' },
    { name: 'REST API Endpoints', category: 'API' },
    { name: 'Prisma ORM', category: 'Database' },
    { name: 'Bull Queue System', category: 'Queue' },
    { name: 'Winston Logger', category: 'Logging' }
  ],
  database: [
    { name: 'PostgreSQL Primary DB', category: 'Database' },
    { name: 'Redis Cache Layer', category: 'Cache' },
    { name: 'MongoDB Document Store', category: 'Database' },
    { name: 'S3 File Storage', category: 'Storage' },
    { name: 'Elasticsearch Search', category: 'Search' },
    { name: 'Database Connection Pool', category: 'Connection' },
    { name: 'Backup & Recovery System', category: 'Backup' },
    { name: 'Data Migration Scripts', category: 'Migration' }
  ]
};

const LAYER_DESCRIPTIONS = {
  infrastructure:
    'Cloud-native infrastructure with automated deployment, monitoring, and scaling. Includes CI/CD pipelines, security compliance, and multi-region availability.',
  frontend:
    'React-based user interface with server-side rendering, optimized performance, and modern UX patterns. Integrates with external services for enhanced functionality.',
  backend:
    'Node.js/NestJS API with authentication, validation, business logic processing, and external service integrations for payments, storage, and communications.',
  database:
    'Multi-database architecture supporting different data types, caching strategies, and storage requirements with PostgreSQL, Redis, and S3.'
};

const LAYER_TITLES = {
  infrastructure: 'Infrastructure Layer',
  frontend: 'Frontend Layer',
  backend: 'Backend Services',
  database: 'Database Layer'
};

const LAYER_SUBTITLES = {
  infrastructure: 'Cloud Infrastructure & DevOps',
  frontend: 'User Interface & Experience',
  backend: 'API & Business Logic',
  database: 'Data Storage & Management'
};

export const LayerDetails = ({ activeLayer, architecture }: LayerDetailsProps) => {
  if (!activeLayer) return null;

  const layerCapabilities = LAYER_CAPABILITIES[activeLayer as keyof typeof LAYER_CAPABILITIES] || [];
  const keyComponents = KEY_COMPONENTS[activeLayer as keyof typeof KEY_COMPONENTS] || [];
  const layerDescription = LAYER_DESCRIPTIONS[activeLayer as keyof typeof LAYER_DESCRIPTIONS] || '';
  const layerTitle = LAYER_TITLES[activeLayer as keyof typeof LAYER_TITLES] || 'Component Details';
  const layerSubtitle = LAYER_SUBTITLES[activeLayer as keyof typeof LAYER_SUBTITLES] || 'System Component';

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 lg:p-8 mb-12 shadow-2xl shadow-black/30">
      {/* Layer Info and Capabilities - Two Column Layout on large screens, single column on smaller */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-400/30">
              <Layers className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-white">{layerTitle}</h3>
              <p className="text-gray-400 text-base lg:text-lg">{layerSubtitle}</p>
            </div>
          </div>

          <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">{layerDescription}</p>

          {architecture[activeLayer] && (
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {architecture[activeLayer].technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 lg:px-4 lg:py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-6">Key Capabilities</h4>
          <div className="grid grid-cols-1 gap-4">
            {layerCapabilities.map((capability, index) => (
              <CapabilityCard key={`capability-${index}`} capability={capability} />
            ))}
          </div>
        </div>
      </div>

      {/* Key Components - Full Width Section */}
      <div className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Container className="text-white" size={16} />
          </div>
          <h4 className="text-xl lg:text-2xl font-bold text-white">Key Components</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {keyComponents.map((component, index) => (
            <ComponentCard key={`component-${index}`} component={component} />
          ))}
        </div>
      </div>
    </div>
  );
};
