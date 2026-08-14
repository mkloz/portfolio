import { Download, FolderOpen, Palette, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const websterProject: Project = {
  // Basic info
  title: 'Webster',
  slug: 'webster',
  description:
    'Design tool platform with canvas-based editor providing professional, simple and easy to use design tools.',
  image: {
    dark: '/project-media/webster/webster-dark.webp',
    light: '/project-media/webster/webster-light.webp'
  },

  highlights: [
    {
      title: 'Canvas-Based Editor',
      description: 'High-performance design editor built with Konva.js for complex shape manipulation and rendering',
      icon: Palette,
      stats: '60 FPS'
    },
    {
      title: 'Asset Library',
      description: 'Asset upload, organization, and search',
      icon: FolderOpen,
      stats: 'Cloud sync'
    },
    {
      title: 'Export System',
      description: 'Multi-format export options including PNG, SVG, PDF with custom resolution settings',
      icon: Download,
      stats: '5 formats'
    },
    {
      title: 'Performance Optimized',
      description: 'Canvas virtualization and optimized rendering for handling hundreds of design elements',
      icon: Zap,
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
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Design Without Limits',
  longDescription:
    'Webster combines a canvas editor built with React and Konva.js with a NestJS backend. It includes project and asset management, reusable templates, and tools for arranging content on the canvas.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '1.5 months',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.docker,
    technologies.react,
    technologies.postgresql,
    technologies.aws,
    technologies.zustand,
    technologies.nestjs,
    technologies.vite,
    technologies.prisma,
    technologies.redis,
    technologies.tailwind,
    technologies.eslint,
    technologies.nodejs,
    technologies.jwt,
    technologies.swagger,
    technologies.reactquery,
    technologies.reacthookform,
    technologies.reactrouter,
    technologies.shadcn,
    technologies.zod,
    technologies.prettier,
    {
      name: 'KY',
      category: 'Frontend'
    },
    technologies.git,
    technologies.vercel
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
          'UI and interaction design',
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
            reasoning: 'Relational storage with JSON support'
          },
          {
            decision: 'No tablet and mobile support',
            reasoning: 'Focus on the desktop version'
          }
        ],
        achievements: [
          'JWT-based authentication system',
          'Swagger API documentation',
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
      image: '/project-media/webster/webster-dark.webp'
    },
    {
      title: 'Introduction',
      image: '/project-media/webster/introduction.webp'
    },
    {
      title: 'Dimension Selector',
      image: '/project-media/webster/dimention-selector.webp'
    },
    {
      title: '404 Page',
      image: '/project-media/webster/404.webp'
    },
    {
      title: 'Import Image Feature',
      image: '/project-media/webster/import-image.webp'
    },
    {
      title: 'Authentication Page',
      image: '/project-media/webster/auth.webp'
    },
    {
      title: 'Open Project Feature',
      image: '/project-media/webster/open-project.webp'
    },
    {
      title: 'Database Schema Diagram',
      image: '/project-media/webster/db-schema.webp'
    },
    {
      title: 'Shared Project Page',
      image: '/project-media/webster/shared.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/webster/deploy-diagram.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/webster/user.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/webster/use-case-diagram.webp'
    }
  ],

  stats: {
    linesOfCode: '20.1k',
    commits: '50+',
    features: '20+',
    technologies: '24+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/webster-desktop-demo.mp4',
      device: 'desktop',
      length: '3:17',
      preview: '/project-media/webster/demo-desktop-preview.webp'
    }
  ]
};
