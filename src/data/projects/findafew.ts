import { CalendarCheck, Compass, MessageCircle, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const findafewProject: Project = {
  title: 'Findafew',
  slug: 'findafew',
  description: 'A small-group planning app that turns shared interests into real-world activity plans.',
  highlights: [
    {
      title: 'Start with an activity',
      description: 'People begin with something they want to do, then add the practical details around it',
      icon: Compass,
      stats: 'Plan first'
    },
    {
      title: 'Form a compatible group',
      description: 'Interests, personality, social context, and availability inform group formation',
      icon: UsersRound,
      stats: 'Small groups'
    },
    {
      title: 'Review before joining',
      description: 'People can review the proposed group and plan details before deciding whether to take part',
      icon: CalendarCheck,
      stats: 'Clear choice'
    },
    {
      title: 'Keep the conversation moving',
      description: 'Group chats, direct messages, and notifications keep coordination close to the plan',
      icon: MessageCircle,
      stats: 'Live updates'
    },
    {
      title: 'Safety as part of the product',
      description: 'Privacy, blocking, reporting, and review tools support more confident offline participation',
      icon: ShieldCheck,
      stats: 'Built in'
    },
    {
      title: 'Works wherever plans happen',
      description: 'The installable PWA adapts across mobile and desktop, with theme and reduced-motion support',
      icon: Sparkles,
      stats: 'Installable'
    }
  ],
  technologies: [
    'React',
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'Prisma',
    'Redis',
    'Socket.IO',
    'AWS S3',
    'Docker',
    'Cloudflare Pages',
    'Vite',
    'TanStack Query',
    'Zustand',
    'Tailwind CSS',
    'Radix UI',
    'GitHub Actions'
  ],
  liveDemo: 'https://findafew.today',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/findafew-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/findafew-backend' }
  ],
  website: 'https://findafew.today',
  featured: true,
  year: 2026,
  progress: 100,

  tagline: 'Make the plan. Find your few.',
  longDescription:
    'Findafew helps adults move from an activity they want to do to a small group and a practical plan. People can explore open plans or start one of their own, see whether a group comes together, and review the people and details before deciding whether to take part.',
  image: {
    light: '/project-media/findafew/product-discover.webp',
    dark: '/project-media/findafew/product-discover.webp'
  },
  status: 'Maintenance',
  category: 'Full-Stack',
  duration: '7 months',

  detailedTechnologies: [
    technologies.react,
    technologies.typescript,
    technologies.vite,
    technologies.tailwind,
    technologies.zustand,
    technologies.nestjs,
    technologies.postgresql,
    technologies.prisma,
    technologies.redis,
    technologies.socketio,
    technologies.jwt,
    technologies.awss3,
    technologies.docker,
    technologies.githubactions,
    technologies.cloudflarepages,
    technologies.swagger,
    technologies.git,
    technologies.eslint,
    technologies.prettier,
    technologies.shadcn,
    {
      name: 'TanStack Query',
      category: 'Frontend'
    },
    {
      name: 'TanStack Router',
      category: 'Frontend'
    },
    {
      name: 'Radix UI',
      category: 'Frontend'
    },
    {
      name: 'PWA',
      category: 'Frontend'
    }
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Designing the group loop',
        duration: '2 weeks',
        technologies: ['Product framing', 'Domain modelling', 'Interaction design'],
        decisions: [
          {
            decision: 'Start with the activity, not the profile',
            reasoning:
              'The product is built around something people want to do together rather than profile browsing as an end in itself'
          },
          {
            decision: 'Keep the group proposal reviewable',
            reasoning: 'People need to understand who they may meet and what the plan involves before they commit'
          },
          {
            decision: 'Treat safety and consent as product flows',
            reasoning: 'Privacy, reporting, blocking, and participation controls belong in the main experience'
          }
        ],
        achievements: [
          'Mapped onboarding, discovery, group formation, and follow-through',
          'Defined the plan, group, conversation, and safety boundaries',
          'Separated public product information from member and operational data',
          'Established responsive, accessible, and reduced-motion requirements'
        ]
      },
      {
        id: 'database',
        title: 'Organising plans and people',
        duration: '3 weeks',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'AWS S3'],
        decisions: [
          {
            decision: 'Use PostgreSQL for the domain model',
            reasoning:
              'Plans, groups, memberships, conversations, notifications, and safety records depend on clear relationships'
          },
          {
            decision: 'Use Redis for hot data and coordination',
            reasoning: 'Caching and short-lived state support responsive group and notification flows'
          },
          {
            decision: 'Keep media in object storage',
            reasoning: 'S3-backed storage keeps uploaded media outside the core transactional data model'
          }
        ],
        achievements: [
          'Built the account, profile, interest, activity, group, and plan model',
          'Added conversation, notification, invitation, and rating records',
          'Indexed frequent reads and protected relationship boundaries',
          'Added migration and seed workflows for repeatable environments'
        ]
      },
      {
        id: 'backend',
        title: 'Building the service layer',
        duration: '8 weeks',
        technologies: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.IO', 'JWT'],
        decisions: [
          {
            decision: 'Use NestJS modules around product domains',
            reasoning:
              'Feature boundaries keep authentication, plans, groups, activity, chat, and safety easier to evolve'
          },
          {
            decision: 'Use Socket.IO for live product state',
            reasoning: 'Chat, presence, notifications, and plan changes should appear without forcing manual refreshes'
          },
          {
            decision: 'Keep authorization in the backend',
            reasoning:
              'The UI can explain unavailable actions, but permissions must remain enforced at the service boundary'
          }
        ],
        achievements: [
          'Implemented account, profile, interest, plan, group, and invite APIs',
          'Added real-time chat, presence, notification, and plan events',
          'Documented the API with Swagger and generated OpenAPI contracts',
          'Added validation, rate limiting, health checks, and structured error handling'
        ]
      },
      {
        id: 'frontend',
        title: 'Making the next step clear',
        duration: '10 weeks',
        technologies: [
          'React 19',
          'TypeScript',
          'Vite',
          'TanStack Router',
          'TanStack Query',
          'Zustand',
          'Tailwind CSS'
        ],
        decisions: [
          {
            decision: 'Use a feature-first frontend structure',
            reasoning:
              'Each product area owns its UI, data adapters, and interaction logic while shared seams stay explicit'
          },
          {
            decision: 'Make the app installable and responsive',
            reasoning:
              'Planning happens across devices, so the same core flows need to work on compact and large screens'
          },
          {
            decision: 'Make state and recovery visible',
            reasoning: 'Loading, offline, empty, permission, and error states are part of a trustworthy social product'
          }
        ],
        achievements: [
          'Built onboarding, explore, home, plan creation, group review, and activity routes',
          'Added profile, preferences, notifications, appearance, and safety settings',
          'Connected cached server state with live Socket.IO updates',
          'Added keyboard support, reduced-motion behavior, and PWA install guidance'
        ]
      },
      {
        id: 'deployment',
        title: 'Releasing a dependable product',
        duration: '2 weeks',
        technologies: ['Docker', 'GitHub Actions', 'Cloudflare Pages', 'AWS', 'Nginx'],
        decisions: [
          {
            decision: 'Deploy the frontend to Cloudflare Pages',
            reasoning: 'The static PWA build benefits from edge delivery and a direct CI release path'
          },
          {
            decision: 'Run production checks before publishing',
            reasoning:
              'Browser environment validation, build checks, and PWA QA catch release issues before they reach users'
          },
          {
            decision: 'Keep the public API namespace explicit',
            reasoning: 'Strict gateway paths make browser, realtime, and deployment contracts easier to verify'
          }
        ],
        achievements: [
          'Added CI gates for linting, type safety, tests, builds, and security checks',
          'Published the installable frontend at findafew.today',
          'Added production smoke checks for API, realtime, and PWA behavior',
          'Documented deployment, recovery, and provider boundaries'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Find open plans',
      image: '/project-media/findafew/product-discover.webp'
    },
    {
      title: 'Shape a plan',
      image: '/project-media/findafew/product-shape.webp'
    },
    {
      title: 'Watch a group form',
      image: '/project-media/findafew/product-forming.webp'
    },
    {
      title: 'Review the proposed group',
      image: '/project-media/findafew/product-review.webp'
    },
    {
      title: 'Open the group room',
      image: '/project-media/findafew/product-room.webp'
    },
    {
      title: 'Landing hero',
      image: '/project-media/findafew/landing-hero.webp'
    },
    {
      title: 'A time, a place, a few people',
      image: '/project-media/findafew/landing-plan.webp'
    },
    {
      title: 'How it works',
      image: '/project-media/findafew/landing-how-it-works.webp'
    },
    {
      title: 'Choice and control',
      image: '/project-media/findafew/landing-trust.webp'
    }
  ],

  stats: {
    linesOfCode: 'Product codebase',
    commits: '536',
    features: 'End-to-end',
    technologies: '20+'
  }
};
