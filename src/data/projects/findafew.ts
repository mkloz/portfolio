import { BrainCircuit, CalendarCheck, Lock, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const findafewProject: Project = {
  title: 'Findafew',
  slug: 'findafew',
  description:
    'A social planning app that matches people into small groups by personality and interests. Built solo, with real-time chat, AI-assisted moderation, and 3,000+ automated tests.',
  highlights: [
    {
      title: 'Personality-based matching',
      description:
        'A Big Five assessment, shared interests, location, and availability drive a search that proposes groups of up to eight',
      icon: BrainCircuit,
      stats: 'Big Five'
    },
    {
      title: 'Review before you commit',
      description:
        'Members see who is in the group, why each person fits, and what the plan involves before saying yes',
      icon: CalendarCheck,
      stats: 'Informed choice'
    },
    {
      title: 'Real-time coordination',
      description: 'Group chat, direct messages, presence, and web push, all live over Socket.IO',
      icon: MessageCircle,
      stats: 'Live'
    },
    {
      title: 'AI-assisted moderation',
      description:
        'OpenAI assesses reported content, a moderator makes the call, and automation must prove itself in shadow mode first',
      icon: ShieldCheck,
      stats: 'Human in the loop'
    },
    {
      title: 'Privacy by design',
      description:
        'Personality results stay private until shared, and members can export their data or delete their account',
      icon: Lock,
      stats: 'Member control'
    },
    {
      title: 'Installable and offline-aware',
      description: 'A PWA for phone and desktop with offline handling, push notifications, and accessibility audits',
      icon: Smartphone,
      stats: 'PWA'
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
  yearRange: '2025 – present',
  progress: 100,

  tagline: 'Make the plan. Find your few.',
  longDescription:
    'Findafew turns “I want to do this” into a small group and a real plan. A Big Five assessment and shared interests drive a group-selection search, members review the group before they commit, and live chat, push notifications, and AI-assisted moderation carry it through to the day.',
  image: {
    light: '/project-media/findafew/findafew-light.webp',
    dark: '/project-media/findafew/findafew-dark.webp'
  },
  status: 'In Progress',
  category: 'Full-Stack',
  duration: 'Sep 2025 – present',

  detailedTechnologies: [
    technologies.react,
    technologies.vite,
    technologies.tanstackrouter,
    technologies.tanstackquery,
    technologies.zustand,
    technologies.reacthookform,
    technologies.tailwind,
    technologies.radixui,
    technologies.shadcn,
    technologies.framermotion,
    technologies.gsap,
    technologies.pwa,
    technologies.nestjs,
    technologies.prisma,
    technologies.socketio,
    technologies.jwt,
    technologies.googleoauth,
    technologies.webpush,
    technologies.reactemail,
    technologies.openai,
    technologies.postgresql,
    technologies.redis,
    technologies.docker,
    technologies.githubactions,
    technologies.cloudflarepages,
    technologies.oraclecloud,
    technologies.ociobjectstorage,
    technologies.nginx,
    technologies.sentry,
    technologies.opentelemetry,
    technologies.vitest,
    technologies.playwright,
    technologies.testinglibrary,
    technologies.msw,
    technologies.testcontainers,
    technologies.pact,
    technologies.biome,
    technologies.oxlint,
    technologies.swagger,
    technologies.git,
    technologies.typescript,
    technologies.zod
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Researching the idea',
        duration: 'Sep 2025 – Feb 2026',
        technologies: ['Product research', 'Psychometrics', 'Domain modelling'],
        decisions: [
          {
            decision: 'Match on validated science, not a quiz',
            reasoning: 'Compatibility rests on the public-domain IPIP Big Five item pool, in 30- and 50-question forms'
          },
          {
            decision: 'Start with the activity, not the profile',
            reasoning: 'People join to do something together, so the plan leads and profiles support it'
          },
          {
            decision: 'Run development AI-first',
            reasoning:
              'Coding agents work from repository rules, playbooks, and skills, and every change clears the same automated gates, so one developer ships at team scale'
          }
        ],
        achievements: [
          'Mapped the full journey from sign-up to group formation and the day itself',
          'Set accessibility, reduced-motion, and offline requirements before the first screen'
        ]
      },
      {
        id: 'database',
        title: 'Designing the data model',
        duration: 'Apr 2026 – present',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'OCI Object Storage'],
        decisions: [
          {
            decision: 'PostgreSQL for a deeply relational domain',
            reasoning: 'Plans, groups, memberships, chat, moderation, and ratings all depend on strict relationships'
          },
          {
            decision: 'Redis for caching and short-lived state',
            reasoning: 'Hot reads and coordination state stay fast without loading the database'
          },
          {
            decision: 'Object storage behind an interface',
            reasoning: 'Media lives in OCI Object Storage, outside the database and swappable between providers'
          }
        ],
        achievements: [
          'Integration-tested against real PostgreSQL and Redis with Testcontainers',
          'Built member data export, deactivation, and account deletion into the model'
        ]
      },
      {
        id: 'backend',
        title: 'Building the service layer',
        duration: 'Apr 2026 – present',
        technologies: ['NestJS', 'Socket.IO', 'OpenAI API', 'OpenTelemetry', 'Sentry', 'Pact'],
        decisions: [
          {
            decision: 'AI assists moderators, humans decide',
            reasoning:
              'OpenAI moderation and contextual assessments draft each case for a reviewer. Automation moves from shadow mode to approval only after it is measured against an evaluation set'
          },
          {
            decision: '30 domain modules, authorization at the boundary',
            reasoning:
              'Each area evolves on its own, and permissions are enforced by the API, never just hidden in the UI'
          }
        ],
        achievements: [
          'Group selection that searches combinations of 3 to 8 people and scores every pair on personality, interests, location, age, and mutual friends',
          'Real-time chat, presence, plan events, and web push over Socket.IO',
          'Request tracing with OpenTelemetry and error reporting with Sentry',
          '1,166 backend tests, plus Pact contracts and OpenAPI breaking-change checks'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the product',
        duration: 'Feb 2026 – present',
        technologies: ['React 19', 'TanStack Router', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'Playwright'],
        decisions: [
          {
            decision: 'Build a deterministic Scenario Mode',
            reasoning:
              'Synthetic, stateful worlds let every screen and edge case run in the browser without a backend. The same mode powers the public demo'
          },
          {
            decision: '21 feature areas with enforced boundaries',
            reasoning: 'Dependency rules stop features reaching into each other, so the codebase grows without tangling'
          }
        ],
        achievements: [
          'Onboarding, explore, plan creation, group review, chat, and settings',
          '1,758 unit tests and 192 Playwright journeys across 120+ product states',
          'Accessibility audited with axe-core and performance with Lighthouse',
          'Installable PWA with offline handling and push notifications'
        ]
      },
      {
        id: 'deployment',
        title: 'Shipping it',
        duration: 'Jun 2026 – present',
        technologies: ['GitHub Actions', 'Cloudflare Pages', 'Oracle Cloud', 'Nginx', 'Docker'],
        decisions: [
          {
            decision: 'Edge frontend, self-managed API',
            reasoning:
              'The PWA ships from Cloudflare Pages, and the API runs on an Oracle Cloud ARM server behind Nginx, keeping realtime and workers under direct control'
          },
          {
            decision: 'No release without green checks',
            reasoning:
              'Every pull request runs lint, types, and 3,000+ tests, and production deploys add environment validation and smoke checks'
          }
        ],
        achievements: ['Secret scanning, CodeQL, and dependency review on every change', 'Live at findafew.today']
      }
    ]
  },

  gallery: [
    {
      title: 'Findafew',
      image: '/project-media/findafew/showcase-findafew.webp'
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
      title: 'Start from an idea',
      image: '/project-media/findafew/showcase-start-from-an-idea.webp'
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
      title: 'Talk it through',
      image: '/project-media/findafew/showcase-talk-it-through.webp'
    },
    {
      title: 'On the day',
      image: '/project-media/findafew/showcase-on-the-day.webp'
    },
    {
      title: 'Stay in the loop',
      image: '/project-media/findafew/showcase-stay-in-the-loop.webp'
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
      title: 'Plans near you',
      image: '/project-media/findafew/showcase-plans-near-you.webp'
    }
  ],

  // Counted from both repositories: lines as described on ProjectSummary,
  // feature areas plus backend domain modules, and all commits.
  stats: {
    linesOfCode: '533k',
    commits: '750+',
    features: '50+',
    technologies: '42'
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
