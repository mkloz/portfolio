import { Download, FolderOpen, Palette, Pipette, Share2, Undo2 } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const websterProject: Project = {
  // Basic info
  title: 'Webster',
  slug: 'webster',
  description:
    'A browser design editor built on Konva: draw, lay out images and text, undo anything, and export to PNG, JPG, or PDF.',
  image: {
    dark: '/project-media/webster/webster-dark.webp',
    light: '/project-media/webster/webster-light.webp'
  },

  highlights: [
    {
      title: 'A real canvas editor',
      description: 'Draw freehand, add shapes, text, and images, then move, resize, and rotate anything',
      icon: Palette,
      stats: 'Konva'
    },
    {
      title: 'Undo, redo, and shortcuts',
      description: 'A history stack, pan and zoom, and keyboard shortcuts keep editing fast',
      icon: Undo2,
      stats: 'History'
    },
    {
      title: 'Colour tools',
      description: 'A colour picker with an eyedropper that samples any colour on screen',
      icon: Pipette,
      stats: 'Eyedropper'
    },
    {
      title: 'Saved projects and templates',
      description: 'Designs save with a thumbnail and reopen where you left off, or start from a preset or template',
      icon: FolderOpen,
      stats: 'Templates'
    },
    {
      title: 'Export at any size',
      description: 'Export PNG, JPG, or PDF at a chosen scale and quality',
      icon: Download,
      stats: 'PNG / JPG / PDF'
    },
    {
      title: 'Share with a link',
      description: 'Publish a design as an image with a public link anyone can open',
      icon: Share2,
      stats: 'Public link'
    }
  ],
  technologies: ['React', 'Konva', 'NestJS', 'PostgreSQL', 'TypeScript', 'Prisma', 'Redis', 'AWS S3', 'Docker'],
  liveDemo: 'https://webster.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/webster-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/webster-backend' }
  ],
  website: 'https://webster.mkloz.com',
  featured: true,
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'A design studio in a browser tab.',
  longDescription:
    'Webster is a browser design editor. People draw and arrange shapes, text, and images on a canvas, undo freely, save projects, start from templates, and export or share finished work.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '1 month',

  // Technical details
  detailedTechnologies: [
    technologies.react,
    technologies.vite,
    technologies.konva,
    technologies.reactrouter,
    technologies.tanstackquery,
    technologies.zustand,
    technologies.reacthookform,
    technologies.tailwind,
    technologies.radixui,
    technologies.shadcn,
    technologies.jspdf,
    technologies.nestjs,
    technologies.prisma,
    technologies.jwt,
    technologies.googleoauth,
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
        id: 'design',
        title: 'Planning the editor',
        duration: 'Week 1',
        technologies: ['System design', 'Canvas architecture', 'Interaction design'],
        decisions: [
          {
            decision: 'Render with Konva',
            reasoning: 'Its scene graph gives hit detection, transforms, and layers, and react-konva fits it into React'
          },
          {
            decision: 'Cut scope to the editor',
            reasoning:
              'No real-time collaboration or mobile layout in the first release, so the time went into the canvas itself'
          }
        ],
        achievements: [
          'Split the editor into one module per tool: draw, shape, text, image, and select',
          'Planned a NestJS API behind Nginx with PostgreSQL, Redis, and S3'
        ]
      },
      {
        id: 'backend',
        title: 'Building the API',
        duration: 'Weeks 1–2',
        technologies: ['NestJS', 'Prisma', 'PostgreSQL', 'JWT', 'Google OAuth', 'Swagger'],
        decisions: [
          {
            decision: 'Store the canvas as JSON',
            reasoning: 'A PostgreSQL JSON column keeps each design portable and restores it exactly'
          },
          {
            decision: 'Upload images to S3',
            reasoning: 'Imported images and shared exports live outside the database and the server'
          }
        ],
        achievements: [
          'Project API with pagination, thumbnails, and public share links',
          'Email and Google sign-in, with sessions in Redis',
          'Documented every endpoint in Swagger'
        ]
      },
      {
        id: 'frontend',
        title: 'Building the canvas editor',
        duration: 'Weeks 1–4',
        technologies: ['React', 'Konva', 'Zustand', 'TanStack Query', 'ShadCN', 'jsPDF'],
        decisions: [
          {
            decision: 'Keep editor state in small Zustand stores',
            reasoning:
              'Shapes, tool options, and history live in separate stores, so each part of the UI subscribes only to what it needs'
          },
          {
            decision: 'Keep the controls out of the way',
            reasoning: 'The canvas stays central, and every tool is one click or one shortcut away'
          }
        ],
        achievements: [
          'Freehand drawing, shapes, text, and image layers with resize and rotate handles',
          'Undo and redo, pan and zoom, and keyboard shortcuts',
          'An eyedropper colour picker, size presets, and templates',
          'Export to PNG, JPG, and PDF at a chosen scale'
        ]
      },
      {
        id: 'deployment',
        title: 'Launch',
        duration: 'Week 5',
        technologies: ['Docker', 'Nginx', 'AWS S3', 'Vercel'],
        decisions: [
          {
            decision: 'Containerise the API with Docker',
            reasoning: 'The same image runs locally and in production behind Nginx over HTTPS'
          }
        ],
        achievements: ['Deployed the editor to Vercel at webster.mkloz.com']
      }
    ]
  },

  gallery: [
    {
      title: 'Webster (Dark)',
      image: '/project-media/webster/webster-dark.webp'
    },
    {
      title: 'Introduction',
      image: '/project-media/webster/introduction.webp'
    },
    {
      title: 'Dimension Selector',
      image: '/project-media/webster/dimention-selector.webp'
    },
    {
      title: '404 Page',
      image: '/project-media/webster/404.webp'
    },
    {
      title: 'Import Image Feature',
      image: '/project-media/webster/import-image.webp'
    },
    {
      title: 'Authentication Page',
      image: '/project-media/webster/auth.webp'
    },
    {
      title: 'Open Project Feature',
      image: '/project-media/webster/open-project.webp'
    },
    {
      title: 'Database Schema Diagram',
      image: '/project-media/webster/db-schema.webp'
    },
    {
      title: 'Shared Project Page',
      image: '/project-media/webster/shared.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/webster/deploy-diagram.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/webster/user.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/webster/use-case-diagram.webp'
    }
  ],

  stats: {
    linesOfCode: '19.4k',
    commits: '50+',
    features: '20+',
    technologies: '30'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/webster/webster-desktop-demo.mp4',
      device: 'desktop',
      length: '3:17',
      preview: '/project-media/webster/demo-desktop-preview.webp'
    }
  ]
};
