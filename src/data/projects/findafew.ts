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
    'Oracle Cloud',
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
    { name: 'Frontend', link: 'https://github.com/mkloz/findafew-frontend', private: true },
    { name: 'Backend', link: 'https://github.com/mkloz/findafew-backend', private: true }
  ],
  website: 'https://findafew.today',
  featured: true,
  year: 2026,
  progress: 100,

  tagline: 'Make the plan. Find your few.',
  longDescription:
    'Findafew helps adults move from an activity they want to do to a small group and a practical plan. People can explore open plans or start one of their own, see whether a group comes together, and review the people and details before deciding whether to take part.',
  image: {
    light: '/project-media/findafew/findafew-light.webp',
    dark: '/project-media/findafew/findafew-dark.webp'
  },
  status: 'In Progress',
  category: 'Full-Stack',
  duration: '8 months',

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
    technologies.oraclecloud,
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
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'OCI Object Storage'],
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
            reasoning:
              'Uploaded media lives in OCI Object Storage behind a storage port, outside the transactional data model and independent of one provider'
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
          'Documented the API with Swagger and checked generated OpenAPI contracts for breaking changes',
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
            decision: 'Build a deterministic Scenario Mode',
            reasoning:
              'Synthetic, stateful product worlds let every screen and edge case be reviewed and tested in the browser without a backend or real accounts'
          },
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
          'Added keyboard support, reduced-motion behavior, and PWA install guidance',
          'Covered 120+ product states with Scenario Mode and Playwright interaction suites'
        ]
      },
      {
        id: 'deployment',
        title: 'Releasing a dependable product',
        duration: '2 weeks',
        technologies: ['GitHub Actions', 'Cloudflare Pages', 'Oracle Cloud', 'Nginx', 'Docker'],
        decisions: [
          {
            decision: 'Deploy the frontend to Cloudflare Pages',
            reasoning: 'The static PWA build benefits from edge delivery and a direct CI release path'
          },
          {
            decision: 'Run the API on a self-managed ARM host',
            reasoning:
              'An Oracle Cloud ARM server behind Nginx keeps realtime connections, workers, and storage access under direct control'
          },
          {
            decision: 'Run production checks before publishing',
            reasoning:
              'Production environment validation, build checks, and PWA QA catch release issues before they reach users'
          },
          {
            decision: 'Keep the public API namespace explicit',
            reasoning: 'Strict gateway paths make browser, realtime, and deployment contracts easier to verify'
          }
        ],
        achievements: [
          'Added CI gates for linting, types, unit, integration, and end-to-end tests, Pact contracts, and builds',
          'Added secret scanning, CodeQL, dependency review, and OpenAPI breaking-change checks',
          'Published the installable frontend at findafew.today',
          'Added production smoke checks for API, realtime, and PWA behavior',
          'Documented deployment, recovery, and provider boundaries'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Explore open plans',
      image: '/project-media/findafew/findafew-dark.webp'
    },
    {
      title: 'Start, discover, and chat',
      image: '/project-media/findafew/showcase-app.webp'
    },
    {
      title: 'Discover what fits',
      image: '/project-media/findafew/showcase-discover.webp'
    },
    {
      title: 'Start a plan',
      image: '/project-media/findafew/showcase-start-a-plan.webp'
    },
    {
      title: 'Meet your group',
      image: '/project-media/findafew/showcase-your-group.webp'
    },
    {
      title: 'On the day',
      image: '/project-media/findafew/showcase-on-the-day.webp'
    },
    {
      title: 'Getting started',
      image: '/project-media/findafew/showcase-getting-started.webp'
    },
    {
      title: 'Make it yours',
      image: '/project-media/findafew/showcase-make-it-yours.webp'
    },
    {
      title: 'Landing page',
      image: '/project-media/findafew/landing-hero.webp'
    },
    {
      title: 'Group formation diagram',
      image: '/project-media/findafew/group-formation-diagram.webp'
    },
    {
      title: 'Architecture diagram',
      image: '/project-media/findafew/architecture-diagram.webp'
    },
    {
      title: 'Database schema',
      image: '/project-media/findafew/database-schema.webp'
    }
  ],

  // Counted from both repositories: TypeScript source excluding generated
  // files, feature areas plus backend domain modules, and all commits.
  stats: {
    linesOfCode: '400k+',
    commits: '750+',
    features: '50+',
    technologies: '24'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/findafew/findafew-desktop-demo.mp4',
      device: 'desktop',
      length: '1:23',
      preview: '/project-media/findafew/demo-desktop-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/findafew/findafew-mobile-demo.mp4',
      device: 'mobile',
      length: '1:23',
      preview: '/project-media/findafew/demo-mobile-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/findafew/findafew-tablet-demo.mp4',
      device: 'tablet',
      length: '1:23',
      preview: '/project-media/findafew/demo-tablet-preview.webp'
    }
  ]
};
