import { Bell, Building, CreditCard, MapPin, QrCode, Search } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const ueventProject: Project = {
  // Basic info
  title: 'UEvent',
  slug: 'uevent',
  description:
    'An event platform where people find events on a map and buy tickets, and organisers get paid through their own Stripe accounts.',
  image: {
    dark: '/project-media/uevent/uevent-dark.webp',
    light: '/project-media/uevent/uevent-light.webp'
  },

  highlights: [
    {
      title: 'Payouts with Stripe Connect',
      description: 'Organisers connect their own Stripe account, so ticket money goes straight to them',
      icon: CreditCard,
      stats: 'Stripe Connect'
    },
    {
      title: 'QR-code tickets',
      description: 'Tickets are issued once Stripe confirms the payment, each with a QR code for the door',
      icon: QrCode,
      stats: 'Verified'
    },
    {
      title: 'Events on a map',
      description: 'Google Maps shows events nearby, and organisers pin each venue with a location picker',
      icon: MapPin,
      stats: 'Google Maps'
    },
    {
      title: 'Organiser pages',
      description: 'Companies publish events and news, run promo codes, and build a following',
      icon: Building,
      stats: 'Promo codes'
    },
    {
      title: 'Search that narrows fast',
      description: 'Filter by text, format, theme, date range, and price, with filters kept in the URL',
      icon: Search,
      stats: 'Shareable'
    },
    {
      title: 'Notifications that matter',
      description: 'In-app and email updates for news, event changes, and replies, plus a reminder before each event',
      icon: Bell,
      stats: 'In-app + email'
    }
  ],

  technologies: ['NestJS', 'React', 'PostgreSQL', 'TypeScript', 'Prisma', 'Stripe', 'Redis', 'AWS S3', 'Docker'],
  liveDemo: 'https://uevent.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/uevent-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/uevent-backend' }
  ],
  website: 'https://uevent.mkloz.com',
  featured: true,
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Events, tickets, and payouts in one place.',
  longDescription:
    'UEvent helps people find events on a map, buy tickets, and follow organisers. Organisers connect their own Stripe account, publish events and news, run promo codes, and manage attendees in the same product.',
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
    technologies.googlemaps,
    technologies.nestjs,
    technologies.prisma,
    technologies.jwt,
    technologies.googleoauth,
    technologies.stripe,
    technologies.reactemail,
    technologies.nodemailer,
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
        title: 'Planning the product',
        duration: 'Week 1',
        technologies: ['System design', 'Database design', 'API design'],
        decisions: [
          {
            decision: 'Pay organisers through Stripe Connect',
            reasoning: 'Ticket money goes to each organiser’s own account, so the platform never holds their funds'
          },
          {
            decision: 'Put discovery on a map',
            reasoning: 'People usually choose events by where they are, so location comes first'
          },
          {
            decision: 'Offer Google sign-in',
            reasoning: 'One click removes the biggest barrier before someone can buy a ticket'
          }
        ],
        achievements: [
          'Designed the schema for users, companies, events, tickets, payments, comments, and notifications',
          'Planned a NestJS API behind Nginx with PostgreSQL, Redis, S3, and Stripe'
        ]
      },
      {
        id: 'database',
        title: 'Organising data and payments',
        duration: 'Weeks 1–2',
        technologies: ['PostgreSQL', 'Prisma', 'Redis', 'AWS S3', 'Stripe'],
        decisions: [
          {
            decision: 'Trust Stripe webhooks, not the browser',
            reasoning: 'Tickets are issued only after a signed checkout webhook confirms the payment'
          },
          {
            decision: 'Store images in AWS S3',
            reasoning: 'Event and company images stay durable and off the application server'
          },
          {
            decision: 'Keep sessions in Redis',
            reasoning: 'Refresh tokens expire on their own, and signing out of every device takes one delete'
          }
        ],
        achievements: [
          'Modelled the platform in Prisma on PostgreSQL',
          'Synced organiser promo codes with Stripe coupons and promotion codes',
          'Tracked organiser onboarding through Stripe account webhooks'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: 'Weeks 1–4',
        technologies: ['NestJS', 'Prisma', 'JWT', 'Google OAuth', 'React Email', 'Swagger'],
        decisions: [
          {
            decision: 'Separate modules per domain',
            reasoning: 'Events, companies, tickets, payments, comments, and notifications evolve independently'
          },
          {
            decision: 'Build emails with React Email',
            reasoning: 'Templates are typed components, so emails stay consistent and easy to change'
          }
        ],
        achievements: [
          'Event search by text, format, theme, date range, and price',
          'In-app and email notifications, with scheduled reminders before each event',
          'Rate limiting, Helmet headers, health checks, and Swagger documentation'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: 'Weeks 1–4',
        technologies: ['React', 'TanStack Query', 'Zustand', 'React Hook Form', 'ShadCN', 'Google Maps API'],
        decisions: [
          {
            decision: 'Keep search filters in the URL',
            reasoning: 'A filtered search can be shared, bookmarked, and restored with the back button'
          },
          {
            decision: 'Build on a shared component system',
            reasoning: 'ShadCN and Tailwind keep every page consistent across phone, tablet, and desktop'
          }
        ],
        achievements: [
          'Event pages, an events map, QR-code tickets, and profiles',
          'Company pages with news, followers, and promo codes',
          'Organiser tools to create events and manage attendees'
        ]
      },
      {
        id: 'deployment',
        title: 'Launch',
        duration: 'Week 5',
        technologies: ['Docker', 'Nginx', 'Vercel'],
        decisions: [
          {
            decision: 'Containerise the API with Docker',
            reasoning: 'The same image runs locally and in production'
          },
          {
            decision: 'Serve the API through Nginx over HTTPS',
            reasoning: 'Nginx terminates TLS and routes traffic to the NestJS server'
          }
        ],
        achievements: [
          'Deployed the frontend to Vercel at uevent.mkloz.com',
          'Ran lint and format checks on every commit with Husky'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'UEvent (light)',
      image: '/project-media/uevent/uevent-light.webp'
    },
    {
      title: 'Introduction',
      image: '/project-media/uevent/introduction.webp'
    },
    {
      title: 'Authentication',
      image: '/project-media/uevent/auth.webp'
    },
    {
      title: '404 Page',
      image: '/project-media/uevent/404.webp'
    },
    {
      title: 'Event Page',
      image: '/project-media/uevent/event.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/uevent/profile.webp'
    },
    {
      title: 'Company Page',
      image: '/project-media/uevent/company.webp'
    },
    {
      title: 'Database Schema',
      image: '/project-media/uevent/db-schema.webp'
    },
    {
      title: 'Company News',
      image: '/project-media/uevent/company-news.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/uevent/deployment-diagram.webp'
    },
    {
      title: 'Interactive Map',
      image: '/project-media/uevent/map.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/uevent/use-case-diagram.webp'
    }
  ],

  stats: {
    linesOfCode: '28.7k',
    commits: '100+',
    features: '35+',
    technologies: '30'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-desktop-demo.mp4',
      device: 'desktop',
      length: '4:26',
      preview: '/project-media/uevent/demo-desktop-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-mobile-demo.mp4',
      device: 'mobile',
      length: '3:01',
      preview: '/project-media/uevent/demo-mobile-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-tablet-demo.mp4',
      device: 'tablet',
      length: '3:52',
      preview: '/project-media/uevent/demo-tablet-preview.webp'
    }
  ]
};
