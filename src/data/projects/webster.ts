import { Download, FolderOpen, Palette, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const websterProject: Project = {
  // Basic info
  title: 'Webster',
  slug: 'webster',
  description: 'A browser-based design tool for creating and exporting visual work on a flexible canvas.',
  image: {
    dark: '/project-media/webster/webster-dark.webp',
    light: '/project-media/webster/webster-light.webp'
  },

  highlights: [
    {
      title: 'Browser-based canvas',
      description: 'People can arrange shapes, images, and text directly in the browser',
      icon: Palette,
      stats: '60 FPS'
    },
    {
      title: 'Saved assets',
      description: 'Uploaded assets stay organised and easy to find',
      icon: FolderOpen,
      stats: 'Cloud sync'
    },
    {
      title: 'Flexible export',
      description: 'Finished designs can be exported in several formats and resolutions',
      icon: Download,
      stats: '5 formats'
    },
    {
      title: 'Smooth editing',
      description: 'The canvas stays responsive while handling hundreds of design elements',
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
  tagline: 'Create freely, right in the browser.',
  longDescription:
    'Webster is a browser-based design editor. People can arrange content on a flexible canvas, manage projects and assets, reuse templates, and export finished work.',
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
        title: 'Planning the editor',
        duration: '1 week',
        technologies: ['System Design', 'Canvas Architecture', 'API Planning', 'UI/UX Desig', 'Research'],
        decisions: [
          {
            decision: 'Konva.js for canvas rendering',
            reasoning: 'It handles complex shapes smoothly and works well with React'
          },
          {
            decision: 'Keep the editor interface simple',
            reasoning: 'The canvas should stay central while the controls remain easy to find'
          },
          {
            decision: 'Frontend focus',
            reasoning: 'The editor was the core experience, so it received most of the build time'
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
        title: 'Building the API',
        duration: '1 week',
        technologies: ['Nest.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Swagger', 'React Mail'],
        decisions: [
          {
            decision: 'Save canvas state as JSON',
            reasoning: 'It keeps each design portable and straightforward to restore'
          },
          {
            decision: 'PostgreSQL for database',
            reasoning: 'Relational storage with JSON support'
          },
          {
            decision: 'No tablet and mobile support',
            reasoning: 'The first release focused on the larger screens used for detailed design work'
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
        title: 'Building the canvas editor',
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
            decision: 'Keep the controls clear and accessible',
            reasoning: 'People should be able to start designing without learning a complicated interface'
          },
          {
            decision: 'Multiple themes',
            reasoning: 'People can choose the workspace that feels more comfortable'
          },
          {
            decision: 'No real-time collaboration',
            reasoning: 'I kept the scope centred on making the editor itself useful'
          }
        ],
        achievements: [
          'Canvas-based design editor with layer management',
          'Detailed design tools and shape controls',
          'A clear interface with an easy-to-find tool palette',
          'Drag-and-drop functionality',
          'Keyboard shortcuts and hotkeys',
          'Undo/redo system implementation'
        ]
      },
      {
        id: 'deployment',
        title: 'Preparing for launch',
        duration: '2 days',
        technologies: ['Docker', 'AWS S3', 'Nginx', 'Linux', 'SSH', 'PM2', 'Oracle Cloud'],
        decisions: [
          {
            decision: 'Linux for server',
            reasoning: 'It provides a predictable environment for deployment and scaling'
          },
          {
            decision: 'Backup on failure',
            reasoning: 'The service needs a clear recovery path after an outage or attack'
          }
        ],
        achievements: [
          'Secured the network',
          'Tested the service under load',
          'Prepared the architecture to scale',
          'Added a recovery path'
        ]
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
