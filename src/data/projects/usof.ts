import { Edit, FileText, LayoutDashboard, MessageSquare, ThumbsUp, UserCircle } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const usofProject: Project = {
  // Basic info
  title: 'Usof',
  slug: 'usof',
  description: 'A community app for publishing posts, joining discussions, and voting on what matters.',
  image: {
    dark: '/project-media/usof/usof-dark.webp',
    light: '/project-media/usof/usof-light.webp'
  },

  highlights: [
    {
      title: 'Community discussions',
      description: 'People can publish posts, comment, and take part in topic-based communities',
      icon: MessageSquare,
      stats: 'Social ready'
    },
    {
      title: 'Community voting',
      description: "Votes shape post rankings and contribute to each person's karma",
      icon: ThumbsUp,
      stats: 'Real-time'
    },
    {
      title: 'Writing posts',
      description: 'A rich text editor supports longer posts and Markdown formatting',
      icon: Edit,
      stats: 'Rich editor'
    },
    {
      title: 'Personal profiles',
      description: 'Profiles bring together activity, karma, and account settings',
      icon: UserCircle,
      stats: 'Full profiles'
    },
    {
      title: 'Works across screens',
      description: 'The interface adapts to desktop and mobile use',
      icon: LayoutDashboard,
      stats: 'Clean UI/UX'
    },
    {
      title: 'Documented API',
      description: 'Interactive documentation makes each API route easier to understand and test',
      icon: FileText,
      stats: '25+ endpoints'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'React',
    'Node.js',
    'Express',
    'MySQL',
    'TypeScript',
    'Prisma',
    'AWS S3',
    'Docker',
    // Frontend Technologies
    'Tailwind CSS',
    'Vite',
    'Zustand',
    'React Query',
    'React Hook Form',
    'React Router',
    'ShadCN',
    // Backend Technologies
    'Swagger',
    'JWT',
    // Development & Testing
    'ESLint',
    'Prettier',
    'Zod',
    'Axios',
    'Day.js',
    'JavaScript',
    'Nodemon',
    'Azure'
  ],
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
  tagline: 'Share ideas. Join the conversation.',
  longDescription:
    'Usof is a community app for sharing posts and joining discussions. People can comment, vote, follow their activity, and build karma as they take part.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2.5 months',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.docker,
    technologies.react,
    technologies.mysql,
    technologies.aws,
    technologies.zustand,
    technologies.express,
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
    technologies.axios,
    technologies.azure,
    technologies.git
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning the community',
        duration: '1 week',
        technologies: ['System Design', 'Database Design', 'API Planning', 'UI/UX Design', 'Field Research'],
        decisions: [
          {
            decision: 'Separate repositories for the frontend and API',
            reasoning: 'Each service could be deployed and worked on independently'
          },
          {
            decision: 'Design for desktop and mobile',
            reasoning: 'People should be able to read and join discussions from either screen size'
          }
        ],
        achievements: [
          'Complete system architecture design',
          'Database schema planning with relationships',
          'API endpoint specification',
          'User flow and wireframe creation'
        ]
      },
      {
        id: 'database',
        title: 'Organising community data',
        duration: '1 week',
        technologies: ['MySQL', 'Prisma', 'Database Migrations', 'Triggers', 'Stored Procedures'],
        decisions: [
          {
            decision: 'Normalized database design',
            reasoning: 'Posts, comments, votes, and people needed clear relationships and dependable data'
          },
          {
            decision: 'Triggers for real-time updates',
            reasoning: 'Changes to posts, comments, and votes needed to appear quickly'
          },
          {
            decision: 'Stored procedures for complex queries',
            reasoning: 'Feed ranking required queries that were easier to manage close to the database'
          }
        ],
        achievements: [
          'Indexed the database for quicker feed queries',
          'User, Post, Comment, Vote relationship modeling',
          'Category and tag system implementation',
          'Database seeding scripts for development',
          'Query optimization for feed algorithms',
          'Infinite scroll for posts and comments'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: '4 weeks',
        technologies: [
          'Node.js',
          'Express',
          'Prisma',
          'MySQL',
          'JWT',
          'Swagger',
          'OpenAPI',
          'Nodemon',
          'Prettier',
          'Zod',
          'Axios',
          'MySQL'
        ],
        decisions: [
          {
            decision: 'Prisma for database ORM',
            reasoning: 'Its TypeScript support made database queries easier to write and review'
          },
          {
            decision: 'Nodemailer for email notifications',
            reasoning: 'It covered the account emails the product needed without extra complexity'
          },
          {
            decision: 'OpenAPI for documentation',
            reasoning: 'Interactive documentation makes each route easier to understand and test'
          }
        ],
        achievements: [
          'RESTful API with 25+ endpoints',
          'JWT-based authentication system',
          'Input validation with Zod',
          'File upload integration with AWS S3',
          'Error handling middleware',
          'API rate limiting and security measures'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the interface',
        duration: '5 weeks',
        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'React Query',
          'Zustand',
          'Vite',
          'ShadCN',
          'Zod',
          'React Hook Form',
          'React Router',
          'Axios'
        ],
        decisions: [
          {
            decision: 'React Query for server state',
            reasoning: 'It keeps posts and comments cached while refreshing them when they change'
          },
          {
            decision: 'Zustand for client state',
            reasoning: 'Lightweight and simple state management for UI state'
          },
          {
            decision: 'ShadCN UI components',
            reasoning: 'It provided consistent controls with accessible behaviour already considered'
          }
        ],
        achievements: [
          'Responsive Reddit-like interface',
          'Infinite scroll for posts and comments',
          'Real-time voting and comment updates',
          'Post editor with Markdown support',
          'Search and filtering functionality',
          'Dark/light theme support'
        ]
      },
      {
        id: 'deployment',
        title: 'Preparing for launch',
        duration: '1 day',
        technologies: ['Docker', 'Azure', 'AWS S3', 'Linux', 'Nginx', 'PM2', 'SSH', 'Oracle Cloud'],
        decisions: [
          {
            decision: 'Oracle Cloud for production deployment',
            reasoning: 'It provided a home for the production services'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'It routes traffic to the frontend and API'
          }
        ],
        achievements: [
          'Production database setup with backups',
          'SSL certificate configuration',
          'Environment-based configuration management',
          'Monitoring and logging setup'
        ]
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
    linesOfCode: '15.6k',
    commits: '30+',
    features: '20+',
    technologies: '24+'
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
