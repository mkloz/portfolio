import { Download, FolderOpen, Palette, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const websterProject: Project = {
  // Basic info
  title: 'Webster',
  slug: 'webster',
  description:
    'Design tool platform with canvas-based editor providing real-time collaboration and professional design tools.',
  image: {
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/webster-dark.png',
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/webster-light.png'
  },

  highlights: [
    {
      title: 'Canvas-Based Editor',
      description: 'High-performance design editor built with Konva.js for complex shape manipulation and rendering',
      icon: Palette,
      color: 'from-purple-400 to-pink-500',
      stats: '60 FPS'
    },
    {
      title: 'Asset Library',
      description: 'Comprehensive asset management with upload, organization, search',
      icon: FolderOpen,
      color: 'from-yellow-400 to-orange-500',
      stats: 'Cloud sync'
    },
    {
      title: 'Export System',
      description: 'Multi-format export options including PNG, SVG, PDF with custom resolution settings',
      icon: Download,
      color: 'from-indigo-400 to-purple-500',
      stats: '5 formats'
    },
    {
      title: 'Performance Optimized',
      description: 'Canvas virtualization and optimized rendering for handling hundreds of design elements',
      icon: Zap,
      color: 'from-red-400 to-pink-500',
      stats: '1000+ objects'
    }
  ],
  technologies: [
    // Core Technologies (Most Important)
    'React',
    'Konva',
    'Nest.js',
    'PostgreSQL',
    'TypeScript',
    'Prisma',
    'Redis',
    'AWS S3',
    'Docker',
    'Tailwind CSS',
    // Supporting Technologies
    'Vite',
    'Zustand',
    'React Konva',
    'ShadCN',
    'React Hook Form',
    'React Query',
    'Node.js',
    'JWT',
    'Swagger',
    'React Router',
    'Zod',
    'ESLint',
    'Prettier',
    'React Mail'
  ],
  liveDemo: 'https://webster.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/webster-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/webster-backend' }
  ],
  website: 'https://webster.mkloz.com',
  featured: true,
  gradient: 'yellow',
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Design Without Limits',
  longDescription:
    'Webster is a comprehensive design tool platform that combines a powerful canvas-based editor with robust backend services. Built with React and Konva.js for the frontend and NestJS for the backend, it provides real-time collaboration, asset management, and professional design tools for teams and individual designers.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '1.5 months',

  // Technical details
  detailedTechnologies: [
    technologies.react,
    technologies.typescript,
    technologies.tailwind,
    technologies.nestjs,
    technologies.nodejs,
    technologies.postgresql,
    technologies.prisma,
    technologies.redis,
    technologies.aws,
    technologies.docker,
    technologies.vite,
    technologies.zustand,
    technologies.jest,
    technologies.eslint,
    technologies.prettier,
    technologies.zod
  ],

  developmentJourney: {
    steps: [
      {
        id: 'design',
        title: 'Planning & Design',
        duration: '1 week',
        technologies: ['System Design', 'Canvas Architecture', 'API Planning', 'UI/UX Desig', 'Research'],
        decisions: [
          {
            decision: 'Konva.js for canvas rendering',
            reasoning:
              'High-performance 2D canvas library with excellent React integration and complex shape manipulation'
          },
          {
            decision: 'Minimalistic UI/UX design',
            reasoning: 'Simple and clean design for a better user experience'
          },
          {
            decision: 'Frontend focus',
            reasoning: 'Deliver the best possible design editor for the user in the shortest time possible'
          }
        ],
        achievements: [
          'Canvas-based editor architecture design',
          'Design editor architecture design',
          'Comprehensive UI/UX design',
          'Technology stack finalization'
        ]
      },
      {
        id: 'backend',
        title: 'NestJS API Development',
        duration: '1 week',
        technologies: ['Nest.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Swagger', 'React Mail'],
        decisions: [
          {
            decision: 'Json state save',
            reasoning: 'Simple and easy to implement'
          },
          {
            decision: 'PostgreSQL for database',
            reasoning: 'Reliable and scalable database with JSON support'
          },
          {
            decision: 'No tablet and mobile support',
            reasoning: 'Focus on the desktop version'
          }
        ],
        achievements: [
          'JWT-based authentication system',
          'Comprehensive Swagger documentation',
          'Share design with others',
          'Export design as PNG, SVG, PDF',
          'Keyboard shortcuts and hotkeys',
          'Auto save and project switch'
        ]
      },
      {
        id: 'frontend',
        title: 'React Canvas Editor',
        duration: '4 weeks',
        technologies: [
          'React',
          'TypeScript',
          'Konva',
          'React Konva',
          'Zustand',
          'Tailwind CSS',
          'ShadCN',
          'React Hook Form',
          'React Query',
          'React Router'
        ],
        decisions: [
          {
            decision: 'Focus on simple but accessible UI/UX',
            reasoning: 'To allow users across all skill levels to use the design editor'
          },
          {
            decision: 'Multiple themes',
            reasoning: 'Make user in control of the design editor'
          },
          {
            decision: 'No real-time collaboration',
            reasoning: 'To focus on the design editor and not the collaboration'
          }
        ],
        achievements: [
          'Canvas-based design editor with layer management',
          'Professional design tools and shape manipulation',
          'Intuitive user interface with tool palette',
          'Drag-and-drop functionality',
          'Keyboard shortcuts and hotkeys',
          'Undo/redo system implementation'
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment',
        duration: '2 days',
        technologies: ['Docker', 'AWS S3', 'Nginx', 'Linux', 'SSH', 'PM2', 'Oracle Cloud'],
        decisions: [
          {
            decision: 'Linux for server',
            reasoning: 'To allow for easy deployment and scaling'
          },
          {
            decision: 'Backup on failure',
            reasoning: 'To allow easy recovery on DDOS attacks'
          }
        ],
        achievements: ['Network Secure', 'Stress stable', 'Scaleable arthitecture', 'Future proof']
      }
    ]
  },

  gallery: [
    {
      title: 'Webster (Dark)',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/webster-dark.png'
    },
    {
      title: 'Introduction',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/introduction.png'
    },
    {
      title: 'Dimension Selector',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/dimention-selector.png'
    },
    {
      title: '404 Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/404.png'
    },
    {
      title: 'Import Image Feature',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/import-image.png'
    },
    {
      title: 'Authentication Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/auth.png'
    },
    {
      title: 'Open Project Feature',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/open-project.png'
    },
    {
      title: 'Database Schema Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/db-schema.png'
    },
    {
      title: 'Shared Project Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/shared.png'
    },
    {
      title: 'Deployment Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/deploy-diagram.png'
    },
    {
      title: 'User Profile',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/user.png'
    },
    {
      title: 'Use Case Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/use-case-diagram.png'
    }
  ],

  stats: {
    linesOfCode: '28.5k',
    commits: '445',
    features: '30+',
    technologies: '28+'
  }
};
