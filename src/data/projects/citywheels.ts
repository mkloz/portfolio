import { Package, ShoppingCart, TrendingUp, User } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const citywheelsProject: Project = {
  // Basic info
  title: 'Citywheels',
  slug: 'citywheels',
  description: 'An online shop for browsing vehicles, checking out, and managing products and orders.',
  image: '/project-media/citywheels/hero.webp',
  highlights: [
    {
      title: 'Online shopping',
      description: 'People can browse products, fill a basket, check out, and follow their order',
      icon: ShoppingCart,
      stats: 'Full featured'
    },
    {
      title: 'Stock management',
      description: 'Stock levels stay current, with alerts when a product is running low',
      icon: Package,
      stats: 'Auto alerts'
    },
    {
      title: 'Search-friendly pages',
      description: 'Server-rendered product pages load quickly and are easier for search engines to read',
      icon: TrendingUp,
      stats: '95+ score'
    },
    {
      title: 'Customer accounts',
      description: 'Customers can revisit orders, save favourites, and manage their details',
      icon: User,
      stats: 'Personalized'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'Next.js',
    'React',
    'NestJS',
    'MySQL',
    'TypeScript',
    'Prisma',
    'Stripe',
    'Docker',
    'Tailwind CSS',
    'AWS',
    // Supporting Technologies
    'Node.js',
    'GitHub Actions',
    'React Query',
    'Zustand',
    'ShadCN',
    'Zod',
    'Jest',
    'ESLint',
    'Prettier',
    'JavaScript',
    'Axios',
    'Vercel',
    'Oracle Cloud'
  ],
  liveDemo: 'https://citywheels.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/citywheels-frontend' },
    { name: 'Backend API', link: 'https://github.com/mkloz/citywheels-backend' }
  ],
  website: 'https://citywheels.mkloz.com',
  featured: false,
  year: 2023,
  progress: 100,

  // Detailed info
  tagline: 'Find the right ride online.',
  longDescription:
    'Citywheels is an online shop for bicycles, skateboards, scooters, and related products. Customers can browse, buy, and manage orders, while staff can look after products and stock.',
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
    technologies.nextjs,
    technologies.vite,
    technologies.prisma,
    technologies.nestjs,
    technologies.tailwind,
    technologies.eslint,
    technologies.zod,
    technologies.axios,
    technologies.jest,
    technologies.nodejs,
    technologies.javascript,
    technologies.prettier
  ],

  developmentJourney: {
    steps: [
      {
        id: 'design',
        title: 'Planning the shop',
        duration: '2 weeks',
        technologies: ['Figma'],
        decisions: [
          {
            decision: 'Figma for design',
            reasoning: 'Figma supported interface planning and prototyping'
          },
          {
            decision: 'SQL database',
            reasoning: 'Products, orders, stock, and customers have clear relationships'
          },
          {
            decision: 'Start with the core store data',
            reasoning: 'The first schema focused on the records needed to browse, buy, and fulfil an order'
          }
        ],
        achievements: [
          'Design system with consistent UI components',
          'Designed the main shopping pages',
          'Prepared responsive layouts',
          'Defined consistent button styles',
          'Defined the site colour palette'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: '3 weeks',
        technologies: ['Node.js', 'NestJS', 'Prisma', 'MySQL', 'JWT', 'Jest', 'TypeScript'],
        decisions: [
          {
            decision: 'TypeScript over JavaScript',
            reasoning: 'Types make product and order changes safer to work with'
          },
          {
            decision: 'NestJS over Express.js',
            reasoning: "Its built-in structure suited the store's growing order and inventory rules"
          },
          {
            decision: 'MySQL over PostgreSQL',
            reasoning: 'Team familiarity and hosting infrastructure compatibility'
          }
        ],
        achievements: [
          'REST API for the application workflows',
          'JWT-based authentication system',
          'Role-based access control (RBAC)',
          'API documentation',
          'Unit and integration testing with Jest',
          'Database schema design and optimization'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the storefront',
        duration: '4 weeks',
        technologies: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'ShadCN',
          'Zod',
          'React Query',
          'Axios',
          'Zustand'
        ],
        decisions: [
          {
            decision: 'Next.js over Create React App',
            reasoning: 'Server-rendered product pages load quickly and are easier for search engines to read'
          },
          {
            decision: 'ShadCN UI over custom components',
            reasoning: 'It provided consistent, accessible controls without rebuilding every basic component'
          },
          {
            decision: 'Zod for form validation',
            reasoning: 'The same typed rules can check forms before data reaches the API'
          }
        ],
        achievements: [
          'Responsive design system with Tailwind CSS',
          'Type-safe form handling with Zod validation',
          'Accessible UI components with ShadCN',
          'Responsive image handling with Next.js Image',
          'SEO-friendly routing and meta tags'
        ]
      },

      {
        id: 'deployment',
        title: 'Testing and launch',
        duration: '1 week',
        technologies: ['Docker', 'GitHub Actions', 'AWS', 'Vercel'],
        decisions: [
          {
            decision: 'Docker containerization',
            reasoning: 'The application runs in the same environment during development and deployment'
          },
          {
            decision: 'GitHub Actions for CI/CD',
            reasoning: 'Tests and deployments follow the same repeatable process on every change'
          },
          {
            decision: 'Vercel for frontend, AWS for backend',
            reasoning: 'Each part of the product could run on hosting suited to its needs'
          }
        ],
        achievements: [
          'Containerized application with Docker',
          'Automated CI/CD pipeline with GitHub Actions',
          'Production deployment on AWS and Vercel',
          'Environment-specific configurations',
          'Monitoring and logging setup',
          'Database backup and recovery procedures'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Homepage Hero',
      image: '/project-media/citywheels/hero.webp'
    },
    {
      title: 'Authentication',
      image: '/project-media/citywheels/auth.webp'
    },
    {
      title: 'Shopping Cart',
      image: '/project-media/citywheels/cart.webp'
    },
    {
      title: 'Product Catalog',
      image: '/project-media/citywheels/catalog.webp'
    },
    {
      title: 'Categories',
      image: '/project-media/citywheels/categories.webp'
    },
    {
      title: 'Favorites',
      image: '/project-media/citywheels/favorites.webp'
    },
    {
      title: 'Order',
      image: '/project-media/citywheels/order.webp'
    },
    {
      title: 'Product Details',
      image: '/project-media/citywheels/product.webp'
    },
    {
      title: 'Sections',
      image: '/project-media/citywheels/sections.webp'
    },
    {
      title: 'Project Readme',
      image: '/project-media/citywheels/readme.webp'
    },
    {
      title: 'OpenAPI Documentation',
      image: '/project-media/citywheels/open-api.webp'
    },
    {
      title: 'Database Schema',
      image: '/project-media/citywheels/db-schema.webp'
    }
  ],

  stats: {
    linesOfCode: '18.4k',
    commits: '95',
    features: '30+',
    technologies: '18+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-desktop.mp4',
      device: 'desktop',
      length: '1:48'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-tablet.mp4',
      device: 'tablet',
      length: '1:41',
      preview: '/project-media/citywheels/demo-tablet-thumb.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-mobile.mp4',
      device: 'mobile',
      length: '1:39',
      preview: '/project-media/citywheels/demo-mobile-thumb.webp'
    }
  ]
};
