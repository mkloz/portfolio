import { Calendar, Grid3X3, Move, RefreshCw, Repeat, UserCheck } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const chronosProject: Project = {
  // Basic info
  title: 'Chronos',
  slug: 'chronos',
  description: 'A calendar app for planning events and sharing schedules with other people.',
  highlights: [
    {
      title: 'Clear interface',
      description: 'The calendar stays easy to read and use across different screen sizes',
      icon: Calendar,
      stats: '100% responsive'
    },
    {
      title: 'Four calendar views',
      description: 'People can move between month, week, day, and agenda views',
      icon: Grid3X3,
      stats: '4 views'
    },
    {
      title: 'Move events directly',
      description: 'Events can be rescheduled by dragging them to a new time',
      icon: Move,
      stats: 'Instant'
    },
    {
      title: 'Shared calendars',
      description: 'People can share calendars while keeping control of who can make changes',
      icon: UserCheck,
      stats: 'Team ready'
    },
    {
      title: 'Recurring events',
      description: 'Repeating events support custom schedules and one-off changes',
      icon: Repeat,
      stats: 'Smart rules'
    },
    {
      title: 'Live sync',
      description: 'Calendar changes appear across connected devices as they happen',
      icon: RefreshCw,
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
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Plan your time together.',
  longDescription:
    'Chronos helps people plan events and coordinate shared calendars. It includes four calendar views, repeating events, live updates, and account access.',
  image: {
    light: '/project-media/chronos/chronos-light.webp',
    dark: '/project-media/chronos/chronos-dark.webp'
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
      category: 'Frontend'
    },
    technologies.jwt,
    technologies.swagger,
    technologies.reactquery,
    {
      name: 'Day.js',
      category: 'Frontend'
    },
    technologies.zod,
    technologies.shadcn
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning the calendar',
        duration: '1 week',
        technologies: ['System Design', 'Database Design', 'API Planning'],
        decisions: [
          {
            decision: 'NestJS over Express',
            reasoning: 'Its built-in structure helped keep a larger API organised'
          },
          {
            decision: 'Build the calendar instead of using a ready-made library',
            reasoning: 'Existing options were too rigid for the interactions I wanted to support'
          },
          {
            decision: 'Use Day.js over Moment.js',
            reasoning: 'Smaller bundle size and a direct component API'
          }
        ],
        achievements: [
          'System architecture design',
          'Database schema planning with relationships',
          'API endpoint specification',
          'Detailed features description',
          'Technology stack finalization'
        ]
      },
      {
        id: 'database',
        title: 'Organising calendar data',
        duration: '1 week',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'AWS S3'],
        decisions: [
          {
            decision: 'Redis for caching',
            reasoning: 'Frequently used calendar data needed faster access'
          },
          {
            decision: 'AWS S3 for file storage',
            reasoning: 'Storage for event attachments and user avatars'
          },
          {
            decision: 'PostgreSQL for database',
            reasoning: 'Calendar events and permissions depend on clear relationships between records'
          }
        ],
        achievements: [
          'Indexed the database for quicker calendar queries',
          'Redis caching layer implementation',
          'File upload system with S3 integration',
          'Database migration and seeding scripts',
          'Query optimization for calendar views'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
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
            reasoning: 'It made account and calendar emails straightforward to build'
          },
          {
            decision: 'Prisma over TypeORM',
            reasoning: 'TypeScript integration and database tooling'
          },
          {
            decision: 'JWT for authentication',
            reasoning: 'It keeps authentication separate from any one client application'
          }
        ],
        achievements: [
          'RESTful API with 30+ endpoints',
          'Input validation with Zod',
          'Swagger API documentation',
          'Global error handler',
          'Role-based access control',
          'Email sending with React Mails'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: '3 weeks',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Query', 'Day.js', 'ShadCN'],
        decisions: [
          {
            decision: 'Vite over Create React App',
            reasoning: 'It kept local development and production builds quick'
          },
          {
            decision: 'Zustand over Redux',
            reasoning: 'Simpler state management with less boilerplate'
          },
          {
            decision: 'React Query for server state',
            reasoning: 'It keeps remote calendar data cached and in sync'
          },
          {
            decision: 'Landing page',
            reasoning: 'It introduces the product and gives people a clear way into the calendar'
          }
        ],
        achievements: [
          'Responsive calendar interface with multiple views',
          'Drag-and-drop event scheduling',
          'Recurring events with custom schedules',
          'Calendar sharing and collaboration features',
          'Dark/light theme support',
          'Easy auth process'
        ]
      },
      {
        id: 'deployment',
        title: 'Connecting and launching it',
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
            decision: 'Vercel for hosting',
            reasoning: 'It gave the frontend a simple deployment path'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'It routes incoming traffic to the right service'
          },
          {
            decision: 'PM2 for process management',
            reasoning: 'It keeps the Node service running and restarts it after a failure'
          }
        ],
        achievements: [
          'Dockerized application with multi-stage builds',
          'Environment-specific configurations',
          'Production deployment on AWS, Oracle Cloud, and Azure',
          'SSL certificate setup',
          'Performance monitoring integration'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Authentication screen',
      image: '/project-media/chronos/auth.webp'
    },
    {
      title: 'Introduction screen',
      image: '/project-media/chronos/introduction.webp'
    },
    {
      title: 'Dashboard overview',
      image: '/project-media/chronos/dashboard.webp'
    },
    {
      title: '404 error page',
      image: '/project-media/chronos/404.webp'
    },
    {
      title: 'Hero section image',
      image: '/project-media/chronos/hero.webp'
    },
    {
      title: 'Month view',
      image: '/project-media/chronos/month.webp'
    },
    {
      title: 'Responsive layout preview',
      image: '/project-media/chronos/responsive.webp'
    },
    {
      title: 'Chronos dark hero',
      image: '/project-media/chronos/chronos-dark.webp'
    },
    {
      title: 'Year view',
      image: '/project-media/chronos/year.webp'
    },
    {
      title: 'Database schema diagram',
      image: '/project-media/chronos/db-schema.webp'
    },
    {
      title: 'Deployment diagram',
      image: '/project-media/chronos/deploy-diagram.webp'
    },
    {
      title: 'Use case diagram',
      image: '/project-media/chronos/use-case-diagram.webp'
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
      preview: '/project-media/chronos/demo-desktop-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-mobile-demo.mp4',
      device: 'mobile',
      length: '1:25',
      preview: '/project-media/chronos/demo-mobile-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/chronos/chronos-tablet-demo.mp4',
      device: 'tablet',
      length: '2:02',
      preview: '/project-media/chronos/demo-tablet-preview.webp'
    }
  ]
};
