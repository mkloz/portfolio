import { CalendarDays, LayoutDashboard, Mail, Move, Repeat, UserCheck } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const chronosProject: Project = {
  // Basic info
  title: 'Chronos',
  slug: 'chronos',
  description:
    'A shared calendar with drag-and-drop scheduling, recurring events, role-based sharing, and public holidays imported for any country.',
  highlights: [
    {
      title: 'Drag, drop, and resize',
      description: 'Move an event to a new slot, or drag its edge to change how long it runs, right in the week view',
      icon: Move,
      stats: 'Direct editing'
    },
    {
      title: 'Recurring events',
      description: 'Repeat by the minute, hour, day, week, month, or year, with a custom interval and count',
      icon: Repeat,
      stats: '6 frequencies'
    },
    {
      title: 'Role-based sharing',
      description: 'Calendars are private, shared, or public, with owner, admin, and member roles',
      icon: UserCheck,
      stats: '3 roles'
    },
    {
      title: 'Invitations',
      description: 'Invite people to a calendar or an event by email, and they accept or decline in the app',
      icon: Mail,
      stats: 'Email invites'
    },
    {
      title: 'Holidays for any country',
      description:
        'Pick a country and its public holidays appear as their own calendar, pulled from the Nager.Date API',
      icon: CalendarDays,
      stats: 'Automatic'
    },
    {
      title: 'Three views and a dashboard',
      description: 'Week, month, and year views, plus a dashboard of upcoming events and charts by category',
      icon: LayoutDashboard,
      stats: 'Week / month / year'
    }
  ],
  technologies: ['React', 'NestJS', 'PostgreSQL', 'TypeScript', 'Prisma', 'Redis', 'AWS S3', 'Docker'],
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
  tagline: 'One calendar for everyone you plan with.',
  longDescription:
    'Chronos is a shared calendar built from the ground up. Events can be dragged, resized, and repeated on any schedule, calendars are shared with roles and email invitations, and each country’s public holidays can be imported in one step.',
  image: {
    light: '/project-media/chronos/chronos-light.webp',
    dark: '/project-media/chronos/chronos-dark.webp'
  },
  status: 'Completed',
  category: 'Full-Stack',
  duration: '1 month',

  // Technical details
  detailedTechnologies: [
    technologies.react,
    technologies.vite,
    technologies.reactrouter,
    technologies.tanstackquery,
    technologies.zustand,
    technologies.reacthookform,
    technologies.tailwind,
    technologies.radixui,
    technologies.shadcn,
    technologies.recharts,
    technologies.nestjs,
    technologies.prisma,
    technologies.jwt,
    technologies.reactemail,
    technologies.nodemailer,
    technologies.pino,
    {
      name: 'Nager.Date API',
      category: 'Backend'
    },
    technologies.postgresql,
    technologies.redis,
    technologies.docker,
    technologies.awss3,
    technologies.nginx,
    technologies.vercel,
    technologies.swagger,
    technologies.eslint,
    technologies.prettier,
    technologies.husky,
    technologies.git,
    technologies.typescript,
    technologies.zod
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning the calendar',
        duration: 'Week 1',
        technologies: ['System design', 'Database design', 'API design'],
        decisions: [
          {
            decision: 'Build the calendar views in-house',
            reasoning: 'Ready-made calendar libraries were too rigid for drag, resize, and a year view'
          },
          {
            decision: 'NestJS with Prisma',
            reasoning: 'Modules keep a growing API organised, and Prisma keeps every query type-safe'
          }
        ],
        achievements: ['Designed the schema for calendars, events, recurrence, invitations, and per-calendar roles']
      },
      {
        id: 'database',
        title: 'Modelling time',
        duration: 'Week 1',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'AWS S3'],
        decisions: [
          {
            decision: 'Store a recurrence rule, not copies',
            reasoning: 'One row describes the pattern, and the server expands the occurrences when events are read'
          },
          {
            decision: 'Keep refresh tokens in Redis',
            reasoning: 'Sessions expire on their own and can be revoked instantly'
          }
        ],
        achievements: [
          'Three visibility levels and owner, admin, and member roles per calendar',
          'Avatars stored in AWS S3'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: 'Weeks 1–4',
        technologies: ['NestJS', 'Prisma', 'JWT', 'React Email', 'Pino', 'Swagger'],
        decisions: [
          {
            decision: 'Import holidays from an external API',
            reasoning: 'Nager.Date supplies each country’s public holidays, stored as their own calendar per year'
          },
          {
            decision: 'Log in structured JSON with Pino',
            reasoning: 'Every request leaves a searchable trail without slowing the API down'
          }
        ],
        achievements: [
          'Calendar and event invitations delivered as React Email messages',
          'JWT authentication, rate limiting, and Helmet security headers',
          'Every endpoint documented in Swagger'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: 'Weeks 1–4',
        technologies: ['React', 'TanStack Query', 'Zustand', 'ShadCN', 'Recharts'],
        decisions: [
          {
            decision: 'Split client and server state',
            reasoning:
              'Zustand remembers which calendars are shown between visits, and TanStack Query caches the events behind them'
          }
        ],
        achievements: [
          'Week, month, and year views with drag-to-move and drag-to-resize',
          'A dashboard of upcoming events with charts by category',
          'A filterable directory of public calendars to join',
          'Responsive layouts for phone, tablet, and desktop'
        ]
      },
      {
        id: 'deployment',
        title: 'Launch',
        duration: 'Week 4',
        technologies: ['Docker', 'Nginx', 'AWS S3', 'Vercel'],
        decisions: [
          {
            decision: 'Containerise the API with Docker',
            reasoning: 'The same image runs locally and in production behind Nginx over HTTPS'
          }
        ],
        achievements: ['Deployed the calendar to Vercel at chronos.mkloz.com']
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
    linesOfCode: '14.9k',
    commits: '75',
    features: '25+',
    technologies: '31'
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
