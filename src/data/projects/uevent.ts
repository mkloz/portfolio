import { Bell, Building, CreditCard, MapPin, Search, Smartphone } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const ueventProject: Project = {
  // Basic info
  title: 'UEvent',
  slug: 'uevent',
  description: 'An event platform where people can find events, buy tickets, and get updates as plans change.',
  image: {
    dark: '/project-media/uevent/uevent-dark.webp',
    light: '/project-media/uevent/uevent-light.webp'
  },

  highlights: [
    {
      title: 'Ticket payments',
      description: 'People can buy tickets securely with Stripe, while the product verifies each payment',
      icon: CreditCard,
      stats: '100% secure'
    },
    {
      title: 'Live updates',
      description: 'People receive event updates as soon as something changes',
      icon: Bell,
      stats: '< 100ms'
    },
    {
      title: 'Map-based discovery',
      description: 'Maps help people find nearby events and understand where each venue is',
      icon: MapPin,
      stats: 'GPS accurate'
    },
    {
      title: 'Organiser profiles',
      description: 'Organisers can build a profile, publish events, manage them, and grow a following',
      icon: Building,
      stats: '500+ orgs'
    },
    {
      title: 'Event search',
      description: 'People can narrow events by location, category, date, and price',
      icon: Search,
      stats: '10+ filters'
    },
    {
      title: 'Works across screens',
      description: 'Finding an event and buying a ticket works on phones, tablets, and desktops',
      icon: Smartphone,
      stats: 'Mobile first'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'Nest.js',
    'React',
    'PostgreSQL',
    'TS',
    'Prisma',
    'Stripe',
    'Redis',
    'AWS S3',
    'Docker',
    // Frontend Technologies
    'Tailwind CSS',
    'Vite',
    'Zustand',
    'React Query',
    'React Hook Form',
    'ShadCN',
    // Backend Technologies
    'Node.js',
    'JWT',
    'Swagger',
    'OpenAPI',
    'WebSockets',
    'Google Maps API',
    // Development & Testing
    'ESLint',
    'Prettier',
    'Zod',
    'Axios',
    'PostCSS',
    'Day.js',
    'Jest'
  ],
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
  tagline: 'Find events. Bring people together.',
  longDescription:
    'UEvent helps people discover local events, buy tickets, and stay updated. Organisers can publish events, manage attendees, and receive payments in the same product.',
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
    technologies.nodejs,
    technologies.jwt,
    technologies.swagger,
    technologies.reactquery,
    technologies.reacthookform,
    technologies.shadcn,
    technologies.zod,
    technologies.prettier,
    {
      name: 'KY',
      category: 'Frontend'
    },
    technologies.vercel,
    technologies.nginx,
    technologies.git
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning the product',
        duration: '1 week',
        technologies: [
          'System Design',
          'Database Design',
          'API Planning',
          'CI/CD Pipeline',
          'Docker',
          'Linux',
          'UI/UX Design'
        ],
        decisions: [
          {
            decision: 'Google Maps API for location-based event discovery',
            reasoning: 'It gives people a familiar way to search by location and inspect venues'
          },
          {
            decision: 'Google OAuth for authentication',
            reasoning: 'It makes sign-in quicker for people who already use a Google account'
          },
          {
            decision: 'Stripe for payment processing',
            reasoning: 'It handles card payments, webhooks, and payment checks in one service'
          }
        ],
        achievements: [
          'System architecture design',
          'Database schema with 15+ entities',
          'API endpoint planning (40+ endpoints)',
          'Technology stack finalization',
          'Docker containerization',
          'UI/UX design'
        ]
      },
      {
        id: 'database',
        title: 'Organising data and payments',
        duration: '1 week',
        technologies: ['PostgreSQL', 'Prisma', 'Stripe', 'AWS S3', 'Linux'],
        decisions: [
          {
            decision: 'AWS S3 for file storage',
            reasoning: 'Event images needed durable storage outside the application server'
          },
          {
            decision: 'Shadow database for Stripe integration',
            reasoning: 'It keeps payment work separate as the product grows'
          },
          {
            decision: 'Redis for authentication sessions',
            reasoning: 'Sessions need fast reads and predictable expiry'
          }
        ],
        achievements: [
          'Complex database relationships optimization',
          'Stripe payment integration for ticket purchases',
          'File upload system with AWS S3',
          'Database indexing for performance',
          'Payment webhook handling'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: '3 weeks',
        technologies: ['Nest.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Swagger', 'React Mail', 'Zod'],
        decisions: [
          {
            decision: 'React Mail for email notifications',
            reasoning: 'It made notification emails straightforward to build and maintain'
          },
          {
            decision: 'Position sensitive search for event discovery',
            reasoning: 'Search results need to reflect the area a person is interested in'
          },
          {
            decision: 'Stripe marketplace for event creation',
            reasoning: 'It supports recurring payments from event creators'
          }
        ],
        achievements: [
          '40+ RESTful API endpoints',
          'JWT-based authentication system',
          'Role-based authorization (User, Company, Admin)',
          'Swagger API documentation',
          'Data validation with Zod schemas',
          'Error handling middleware'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: '3 weeks',
        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Vite',
          'Zustand',
          'React Query',
          'ShadCN',
          'React Hook Form'
        ],
        decisions: [
          {
            decision: 'Landing page with animated background and interactive elements',
            reasoning: 'It gives the product a distinctive first impression without hiding the main actions'
          },
          {
            decision: 'Event discovery page with filtering and sorting',
            reasoning: 'Filters and sorting help people find a relevant event faster'
          },
          {
            decision: 'Theme and color scheme',
            reasoning: 'Shared colours and components keep the experience consistent'
          }
        ],
        achievements: [
          'React application built with hooks',
          'Responsive design system with Tailwind CSS',
          'Event discovery with filtering',
          'User profile management',
          'Company profile pages with following system',
          'Event creation and management system'
        ]
      },
      {
        id: 'deployment',
        title: 'Testing and launch',
        duration: '1 day',
        technologies: ['Docker', 'AWS', 'Linux', 'CI/CD Pipeline', 'Nginx', 'PM2', 'Vercel', 'Oracle Cloud', 'SSH'],
        decisions: [
          {
            decision: 'Oracle Cloud for production deployment',
            reasoning: 'It provided a home for the production services'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'It routes traffic to the frontend and API'
          },
          {
            decision: 'PM2 for process management',
            reasoning: 'It keeps both Node services running and restarts them after a failure'
          }
        ],
        achievements: [
          'Performance optimization',
          'Security audit and fixes',
          'Logs and monitoring',
          'Automated deployment pipeline',
          'SSH for remote access'
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
    linesOfCode: '29.1k',
    commits: '100+',
    features: '35+',
    technologies: '28+'
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
