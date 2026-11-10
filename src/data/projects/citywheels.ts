import { Gauge, MessageSquareText, Search, ShieldCheck, ShoppingCart, User } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const citywheelsProject: Project = {
  // Basic info
  title: 'Citywheels',
  slug: 'citywheels',
  description:
    'A vehicle web store with a Next.js storefront and a NestJS API, deployed by a pipeline that tests against a real MySQL database first.',
  image: '/project-media/citywheels/hero.webp',
  highlights: [
    {
      title: 'Catalogue and search',
      description: 'Browse bikes, scooters, skateboards, and more by category, or search by keyword',
      icon: Search,
      stats: 'Categories'
    },
    {
      title: 'Cart and orders',
      description: 'Add to the cart, change quantities, place orders, and look back at past ones',
      icon: ShoppingCart,
      stats: 'Order history'
    },
    {
      title: 'Product reviews',
      description: 'Customers review products to help the next buyer decide',
      icon: MessageSquareText,
      stats: 'Reviews'
    },
    {
      title: 'Accounts and favourites',
      description: 'Email or Google sign-in, a profile, and a list of saved favourites',
      icon: User,
      stats: 'Google sign-in'
    },
    {
      title: 'Admin roles',
      description: 'Admins manage products, users, and orders through role-protected endpoints',
      icon: ShieldCheck,
      stats: 'Role-based'
    },
    {
      title: 'Server-rendered storefront',
      description: 'Next.js renders product pages on the server, with optimised images and light and dark themes',
      icon: Gauge,
      stats: 'SSR'
    }
  ],

  technologies: ['Next.js', 'React', 'NestJS', 'MySQL', 'TypeScript', 'Prisma', 'Docker', 'GitHub Actions'],
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
  tagline: 'Wheels for every ride, ordered online.',
  longDescription:
    'Citywheels sells bicycles, scooters, skateboards, and more. Customers browse, search, review, and order through a server-rendered Next.js storefront, while a NestJS API handles accounts, carts, orders, and admin work, deployed only after its tests pass against MySQL.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2023 – 2024',

  // Technical details
  detailedTechnologies: [
    technologies.nextjs,
    technologies.react,
    technologies.tailwind,
    technologies.radixui,
    technologies.shadcn,
    technologies.reacthookform,
    technologies.nestjs,
    technologies.prisma,
    technologies.jwt,
    technologies.googleoauth,
    technologies.nodemailer,
    technologies.handlebars,
    technologies.mysql,
    technologies.docker,
    technologies.githubactions,
    technologies.awss3,
    technologies.nginx,
    {
      name: 'PM2',
      category: 'DevOps'
    },
    technologies.jest,
    technologies.supertest,
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
        id: 'design',
        title: 'Designing the store',
        duration: 'Jul 2023',
        technologies: ['Figma', 'Database design'],
        decisions: [
          {
            decision: 'Model the store relationally',
            reasoning:
              'Products, carts, orders, reviews, and customers all depend on each other, so MySQL with Prisma fits'
          },
          {
            decision: 'Design in Figma first',
            reasoning: 'The shopping pages, colours, and components were settled before any code'
          }
        ],
        achievements: ['A design system and responsive layouts for the main shopping pages']
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: 'Jul 2023 – 2024',
        technologies: ['NestJS', 'Prisma', 'MySQL', 'JWT', 'Google OAuth', 'Jest'],
        decisions: [
          {
            decision: 'NestJS modules per store domain',
            reasoning: 'Products, cart, orders, reviews, users, and auth each own their logic'
          },
          {
            decision: 'Test against a real database',
            reasoning: 'Jest and Supertest run end-to-end requests against MySQL, so tests catch what mocks would miss'
          }
        ],
        achievements: [
          'JWT and Google authentication with admin roles',
          'Product images in AWS S3, and email through Handlebars templates',
          'Rate limiting, health checks, and Swagger documentation',
          'Hourly database backups on a schedule'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the storefront',
        duration: 'Jul – Aug 2024',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'ShadCN', 'React Hook Form', 'Zod'],
        decisions: [
          {
            decision: 'Render with Next.js',
            reasoning: 'Server-rendered product pages load fast and are easy for search engines to read'
          },
          {
            decision: 'Validate forms with Zod',
            reasoning: 'Typed rules catch bad input before a request is sent'
          }
        ],
        achievements: [
          'Catalogue, product pages, cart, favourites, and order history',
          'Optimised images, carousels, and light and dark themes'
        ]
      },
      {
        id: 'deployment',
        title: 'CI/CD and hosting',
        duration: '2023 – 2024',
        technologies: ['GitHub Actions', 'Docker', 'Nginx', 'PM2'],
        decisions: [
          {
            decision: 'Gate every deploy on tests',
            reasoning:
              'Each push to main lints, builds, migrates a MySQL 8 service container, and runs the tests before anything ships'
          },
          {
            decision: 'Deploy from a self-hosted runner',
            reasoning:
              'A runner on the production server pulls the build, runs migrations, and restarts the app under PM2'
          }
        ],
        achievements: ['Nginx in front of the API with HTTPS', 'Docker Compose setups for development and testing']
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
    technologies: '28'
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
