import { Calendar, Grid3X3, Move, RefreshCw, Repeat, UserCheck } from 'lucide-react';

import { Ky } from '../../assets/logos/ky';
import { technologies } from '../technologies';
import type { Project } from './index';

export const chronosProject: Project = {
  // Basic info
  title: 'Chronos',
  slug: 'chronos',
  description:
    'Modern, intuitive calendar management system with seamless event scheduling and collaboration features.',
  highlights: [
    {
      title: 'Intuitive UI',
      description: 'User-friendly interface with responsive design and smooth animations',
      icon: Calendar,
      color: 'from-blue-400 to-cyan-500',
      stats: '100% responsive'
    },
    {
      title: 'Multiple Views',
      description: 'Flexible calendar views including month, week, day, and agenda with smooth transitions',
      icon: Grid3X3,
      color: 'from-purple-400 to-indigo-500',
      stats: '4 views'
    },
    {
      title: 'Drag & Drop',
      description: 'Intuitive drag-and-drop event management with real-time updates and validation',
      icon: Move,
      color: 'from-green-400 to-emerald-500',
      stats: 'Instant'
    },
    {
      title: 'Team Collaboration',
      description: 'Calendar sharing and team collaboration with permission-based access control',
      icon: UserCheck,
      color: 'from-orange-400 to-red-500',
      stats: 'Team ready'
    },
    {
      title: 'Recurring Events',
      description: 'Advanced recurring event patterns with custom rules and exception handling',
      icon: Repeat,
      color: 'from-pink-400 to-purple-500',
      stats: 'Smart rules'
    },
    {
      title: 'Real-time Sync',
      description: 'Instant synchronization across all devices with WebSocket-based live updates',
      icon: RefreshCw,
      color: 'from-teal-400 to-blue-500',
      stats: '< 50ms sync'
    }
  ],
  technologies: [
    // Core Technologies (Most Important)
    'React',
    'Nest.js',
    'PostgreSQL',
    'TS',
    'Prisma',
    'Redis',
    'AWS S3',
    'Docker',
    'Tailwind CSS',
    'Day.js',
    // Supporting Technologies
    'Vite',
    'Zustand',
    'React Query',
    'ShadCN',
    'Node.js',
    'JWT',
    'Swagger',
    'WebSockets',
    'ESLint',
    'Prettier',
    'Axios',
    'PostCSS',
    'Zod',
    'OpenAPI',
    'Jest'
  ],
  liveDemo: 'https://chronos.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/chronos-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/chronos-backend' }
  ],
  website: 'https://chronos.mkloz.com',
  featured: true,
  gradient: 'green',
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Your Time, Perfected',
  longDescription:
    'Chronos is a comprehensive calendar management system that combines modern frontend technologies with a robust backend API. Built with React and NestJS, it provides seamless event scheduling, collaboration features, and real-time synchronization across devices. The application offers intuitive calendar views, advanced scheduling options, and enterprise-grade security.',
  image: {
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-light.png',
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-dark.png'
  },
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2 months',

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
    technologies.nginx,
    technologies.vercel,
    technologies.git,
    technologies.prettier,
    technologies.nodejs,
    {
      name: 'KY',
      category: 'Frontend',
      icon: Ky,
      color: '#FFCCCA',
      bgColor: 'white'
    },
    technologies.jwt,
    technologies.swagger,
    technologies.reactquery,
    {
      name: 'Day.js',
      category: 'Frontend',
      icon: Calendar,
      color: 'black',
      bgColor: 'white'
    },
    technologies.zod,
    technologies.shadcn
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Project Planning',
        duration: '1 week',
        technologies: ['System Design', 'Database Design', 'API Planning'],
        decisions: [
          {
            decision: 'NestJS over Express',
            reasoning: 'Built-in dependency injection, decorators, and enterprise-grade architecture'
          },
          {
            decision: 'Dont use Ready to use Calendar lib',
            reasoning: 'It was too complex and not flexible enough'
          },
          {
            decision: 'Use Day.js over Moment.js',
            reasoning: 'Smaller bundle size and modern API'
          }
        ],
        achievements: [
          'Comprehensive system architecture design',
          'Database schema planning with relationships',
          'API endpoint specification',
          'Detailed features description',
          'Technology stack finalization'
        ]
      },
      {
        id: 'database',
        title: 'Database Setup',
        duration: '1 week',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'AWS S3'],
        decisions: [
          {
            decision: 'Redis for caching',
            reasoning: 'Improve performance for frequently accessed calendar data'
          },
          {
            decision: 'AWS S3 for file storage',
            reasoning: 'Scalable solution for event attachments and user avatars'
          },
          {
            decision: 'PostgreSQL for database',
            reasoning: 'Relational database for complex calendar data and relationships'
          }
        ],
        achievements: [
          'Optimized database schema with proper indexing',
          'Redis caching layer implementation',
          'File upload system with S3 integration',
          'Database migration and seeding scripts',
          'Query optimization for calendar views'
        ]
      },
      {
        id: 'backend',
        title: 'NestJS API Development',
        duration: '2 weeks',
        technologies: [
          'Nest.js',
          'TypeScript',
          'Prisma',
          'PostgreSQL',
          'JWT',
          'Swagger',
          'Zod',
          'OpenAPI',
          'Docker',
          'Redis'
        ],
        decisions: [
          {
            decision: 'React Mails for email sending',
            reasoning: 'Simple and easy to use'
          },
          {
            decision: 'Prisma over TypeORM',
            reasoning: 'Better TypeScript integration and modern database toolkit'
          },
          {
            decision: 'JWT for authentication',
            reasoning: 'Stateless authentication suitable for API-first architecture'
          }
        ],
        achievements: [
          'RESTful API with 30+ endpoints',
          'Comprehensive input validation with Zod',
          'Swagger API documentation',
          'Global error handler',
          'Role-based access control',
          'Email sending with React Mails'
        ]
      },
      {
        id: 'frontend',
        title: 'React Frontend Development',
        duration: '3 weeks',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Query', 'Day.js', 'ShadCN'],
        decisions: [
          {
            decision: 'Vite over Create React App',
            reasoning: 'Faster development experience and better build performance'
          },
          {
            decision: 'Zustand over Redux',
            reasoning: 'Simpler state management with less boilerplate'
          },
          {
            decision: 'React Query for server state',
            reasoning: 'Excellent caching and synchronization for API data'
          },
          {
            decision: 'Landing page',
            reasoning: 'Simple navigation and preview of the app'
          }
        ],
        achievements: [
          'Responsive calendar interface with multiple views',
          'Drag-and-drop event scheduling',
          'Advanced event creation with recurrence',
          'Calendar sharing and collaboration features',
          'Dark/light theme support',
          'Easy auth process'
        ]
      },
      {
        id: 'deployment',
        title: 'Integration & Deployment',
        duration: '1 day',
        technologies: [
          'Docker',
          'Docker Compose',
          'GitHub Actions',
          'AWS',
          'SSL',
          'Nginx',
          'PM2',
          'Versel',
          'Oracle Cloud',
          'Azure'
        ],
        decisions: [
          {
            decision: 'Versel for hosting',
            reasoning: 'Simple and easy to use'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'Simple and easy to use'
          },
          {
            decision: 'PM2 for process management',
            reasoning: 'Simple and easy to use'
          }
        ],
        achievements: [
          'Dockerized application with multi-stage builds',
          'Environment-specific configurations',
          'Production deployment on AWS, Oracle Cloud, Asure',
          'SSL certificate setup',
          'Performance monitoring integration'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Authentication screen',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/auth.png'
    },
    {
      title: 'Introduction screen',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/introduction.png'
    },
    {
      title: 'Dashboard overview',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/dashboard.png'
    },
    {
      title: '404 error page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/404.png'
    },
    {
      title: 'Hero section image',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/hero.png'
    },
    {
      title: 'Month view',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/month.png'
    },
    {
      title: 'Responsive layout preview',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/responsive.png'
    },
    {
      title: 'Chronos dark hero',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-dark.png'
    },
    {
      title: 'Year view',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/year.png'
    },
    {
      title: 'Database schema diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/db-schema.png'
    },
    {
      title: 'Deployment diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/deploy-diagram.png'
    },
    {
      title: 'Use case diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/use-case-diagram.png'
    }
  ],

  stats: {
    linesOfCode: '15.8k',
    commits: '75',
    features: '25+',
    technologies: '28+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-desktop-demo.mp4',
      device: 'desktop',
      length: '2:59',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/demo-desktop-preview.png'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-mobile-demo.mp4',
      device: 'mobile',
      length: '1:25',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/demo-mobile-preview.png'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-tablet-demo.mp4',
      device: 'tablet',
      length: '2:02',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/demo-tablet-preview.png'
    }
  ]
};
