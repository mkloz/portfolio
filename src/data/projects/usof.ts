import { Archive, DatabaseBackup, FileText, MessageSquare, ShieldCheck, ThumbsUp } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const usofProject: Project = {
  // Basic info
  title: 'Usof',
  slug: 'usof',
  description:
    'A community forum for posts, comments, and voting, on a hand-built Express API with database-level karma and automated backups.',
  image: {
    dark: '/project-media/usof/usof-dark.webp',
    light: '/project-media/usof/usof-light.webp'
  },

  highlights: [
    {
      title: 'Posts, comments, and categories',
      description: 'Publish posts by category, discuss them in comments with emoji, and save favourites',
      icon: MessageSquare,
      stats: 'Community'
    },
    {
      title: 'Votes and karma',
      description: 'Every like or dislike updates post, comment, and author ratings through MySQL triggers',
      icon: ThumbsUp,
      stats: 'SQL triggers'
    },
    {
      title: 'Content that tidies itself',
      description: 'A scheduled job archives posts that have had no new comments for a month',
      icon: Archive,
      stats: 'Every 12 h'
    },
    {
      title: 'Automated backups',
      description: 'The data is dumped every hour, with the schema and triggers on their own schedules',
      icon: DatabaseBackup,
      stats: 'Hourly'
    },
    {
      title: 'Secure accounts',
      description: 'Email verification and password reset with one-time codes, JWT sessions, and rate limiting',
      icon: ShieldCheck,
      stats: 'One-time codes'
    },
    {
      title: 'Documented API',
      description: 'An OpenAPI specification with Swagger UI covers every route',
      icon: FileText,
      stats: 'OpenAPI'
    }
  ],

  technologies: ['React', 'Node.js', 'Express', 'MySQL', 'TypeScript', 'Prisma', 'AWS S3', 'Docker'],
  liveDemo: 'https://usof.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/usof-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/usof-backend' }
  ],
  website: 'https://usof.mkloz.com',
  featured: false,
  year: 2024,
  progress: 100,

  // Detailed info
  tagline: 'Ask, answer, and earn your reputation.',
  longDescription:
    'Usof is a community forum where people post by category, comment, vote, and build karma. The Express API is built without a framework, ratings stay consistent through MySQL triggers, and scheduled jobs back up the database and archive stale posts.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '4 months',

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
    technologies.nodejs,
    technologies.express,
    technologies.prisma,
    technologies.jwt,
    technologies.nodemailer,
    technologies.handlebars,
    {
      name: 'Cron jobs',
      category: 'Backend'
    },
    technologies.mysql,
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
    technologies.zod,
    technologies.axios
  ],

  developmentJourney: {
    steps: [
      {
        id: 'database',
        title: 'Designing the data model',
        duration: 'Oct 2024',
        technologies: ['MySQL', 'Prisma', 'SQL triggers'],
        decisions: [
          {
            decision: 'Keep ratings inside the database',
            reasoning:
              'Triggers update post, comment, and user ratings on every vote, so counts can never drift from the votes behind them'
          },
          {
            decision: 'Prisma for queries, SQL for the rules',
            reasoning: 'Code gets type-safe data access, and the consistency rules live next to the data they protect'
          }
        ],
        achievements: ['Rating triggers for every insert, update, and delete of a vote']
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: 'Oct – Nov 2024',
        technologies: ['Node.js', 'Express', 'TypeScript', 'Zod', 'JWT', 'Swagger'],
        decisions: [
          {
            decision: 'Express without a framework',
            reasoning:
              'Routers, controllers, services, and middleware are layered by hand, with nothing hidden in the request pipeline'
          },
          {
            decision: 'Validate every request with Zod',
            reasoning: 'Bad input is rejected at the edge with a clear error before it reaches a service'
          }
        ],
        achievements: [
          'Email verification and password reset with one-time codes and Handlebars templates',
          'Rate limiting, Helmet headers, and request logging',
          'File uploads streamed to AWS S3',
          'An OpenAPI specification served with Swagger UI'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: 'Nov 2024 – Feb 2025',
        technologies: ['React', 'TanStack Query', 'Zustand', 'React Hook Form', 'ShadCN'],
        decisions: [
          {
            decision: 'Server state in TanStack Query, UI state in Zustand',
            reasoning:
              'Feeds and profiles stay cached and fresh, while client-only state stays out of the request layer'
          }
        ],
        achievements: [
          'Feeds, post pages, categories, favourites, and profiles',
          'Light and dark themes',
          'Responsive layouts for phone, tablet, and desktop'
        ]
      },
      {
        id: 'deployment',
        title: 'Running it',
        duration: 'Feb 2025',
        technologies: ['Docker', 'Nginx', 'AWS S3', 'Vercel', 'Cron jobs'],
        decisions: [
          {
            decision: 'Automate backups from day one',
            reasoning: 'Cron jobs dump the data every hour, the schema every 6 hours, and the triggers every 3 hours'
          },
          {
            decision: 'Archive stale posts automatically',
            reasoning: 'Every 12 hours, posts with no new comments for a month move to the archive'
          }
        ],
        achievements: ['API in Docker behind Nginx over HTTPS', 'Frontend on Vercel at usof.mkloz.com']
      }
    ]
  },

  gallery: [
    {
      title: 'Main UI Overview',
      image: '/project-media/usof/usof-light.webp'
    },
    {
      title: 'Introduction to USOF',
      image: '/project-media/usof/introduction.webp'
    },
    {
      title: 'Article View',
      image: '/project-media/usof/article.webp'
    },
    {
      title: 'Posts Feed',
      image: '/project-media/usof/posts.webp'
    },
    {
      title: 'Categories',
      image: '/project-media/usof/categories.webp'
    },
    {
      title: 'Favorites',
      image: '/project-media/usof/favorites.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/usof/user.webp'
    },
    {
      title: 'Dark Mode',
      image: '/project-media/usof/dark-mode.webp'
    },
    {
      title: 'Database Schema',
      image: '/project-media/usof/db-schema.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/usof/deploy-diagram.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/usof/use-case-diagram.webp'
    },
    {
      title: 'OpenAPI Documentation',
      image: '/project-media/usof/open-api.webp'
    }
  ],

  stats: {
    linesOfCode: '12.9k',
    commits: '30+',
    features: '20+',
    technologies: '29'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-desktop.mp4',
      device: 'desktop',
      preview: '/project-media/usof/demo-desktop-preview.webp',
      length: '2:15'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-mobile.mp4',
      device: 'mobile',
      preview: '/project-media/usof/demo-mobile-preview.webp',
      length: '1:27'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-tablet.mp4',
      device: 'tablet',
      preview: '/project-media/usof/demo-tablet-preview.webp',
      length: '1:26'
    }
  ]
};
