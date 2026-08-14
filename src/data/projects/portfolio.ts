import { Eye, Monitor, Moon, MousePointer, Sparkles, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const portfolioProject: Project = {
  // Basic info
  title: 'Portfolio',
  slug: 'portfolio',
  description: 'Responsive portfolio with project case studies, demos, implementation notes, and image galleries.',
  image: {
    light: '/project-media/portfolio/portfolio-light.webp',
    dark: '/project-media/portfolio/portfolio-dark.webp'
  },
  highlights: [
    {
      title: 'Responsive interface',
      description: 'Layouts designed for desktop and mobile use',
      icon: Sparkles,
      stats: 'Animated'
    },
    {
      title: 'Responsive Layout',
      description: 'Fully responsive design optimized for all device sizes and orientations',
      icon: Monitor,
      stats: 'All devices'
    },
    {
      title: 'Interactive Elements',
      description: 'Engaging animations and interactive components built with Framer Motion',
      icon: MousePointer,
      stats: 'Interactive'
    },
    {
      title: 'Dark Mode',
      description: 'Persistent light and dark themes',
      icon: Moon,
      stats: 'Theme aware'
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for speed with lazy loading, code splitting, and efficient rendering',
      icon: Zap,
      stats: '95+ score'
    },
    {
      title: 'Accessibility',
      description: 'Built with accessibility in mind using semantic HTML and ARIA attributes',
      icon: Eye,
      stats: 'WCAG 2.1'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'React',
    'TS',
    'Tailwind CSS',
    'ShadCN',
    'Vite',
    'React Router',
    'Lucide React',
    'ESLint',
    'S3',
    'Cloudflare Pages',
    'CI/CD',

    // Supporting Technologies
    'Prettier'
  ],
  liveDemo: 'https://www.mkloz.com',
  github: [
    {
      name: 'Portfolio Frontend',
      link: 'https://github.com/mkloz/portfolio'
    }
  ],
  website: 'https://www.mkloz.com',
  featured: false,
  year: 2025,
  progress: 90,

  // Detailed info
  tagline: 'Selected work and implementation notes',
  longDescription:
    'This portfolio presents selected development work through responsive case-study pages. Each project can include implementation notes, demos, source links, and an image gallery. The interface is built with React and TypeScript and supports light and dark themes.',
  status: 'In Progress',
  category: 'Frontend',
  duration: '3 weeks',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.vite,
    technologies.react,
    technologies.aws,
    technologies.cloudflarepages,
    technologies.eslint,
    technologies.shadcn,
    technologies.git,
    technologies.tailwind,
    technologies.prettier,
    technologies.reactrouter,
    technologies.html5
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Design & Planning',
        duration: '1 week',
        decisions: [
          {
            decision: 'Choose React with TypeScript for type safety',
            reasoning: 'Ensures code reliability and better developer experience'
          },
          {
            decision: 'Use Tailwind CSS for styling',
            reasoning: 'Rapid development with consistent design system'
          },
          {
            decision: 'Staning design',
            reasoning: 'Defining the layout and visual direction before implementation'
          }
        ],
        achievements: [
          'Created a shared design system',
          'Planned component architecture',
          'Defined project structure and routing',
          'Created a responsive design for the website'
        ]
      },
      {
        id: 'frontend',
        title: 'Core Development',
        duration: '1 week',

        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Vite',
          'React Router',
          'ShadCN',
          'Lucide React',
          'ESLint',
          'Prettier'
        ],
        decisions: [
          {
            decision: 'Implement custom theme system with dark/light mode',
            reasoning: 'Consistent components and browser-native interaction patterns'
          },
          {
            decision: 'Add advanced animations and micro-interactions',
            reasoning: 'Keeps optional motion separate from core navigation and content'
          },
          {
            decision: 'Implement project case-study pages',
            reasoning: 'Keeps implementation evidence with each project'
          }
        ],
        achievements: [
          'Built responsive layout system',
          'Implemented theme switching',
          'Added smooth page transitions',
          'Created interactive project galleries',
          'Implemented contact form functionality'
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment',
        duration: '1 day',
        decisions: [
          {
            decision: 'Deploy the website to Cloudflare Pages',
            reasoning: "Pages serves the verified static build from Cloudflare's edge network"
          },
          {
            decision: 'Set up multiple domains',
            reasoning: 'Multiple domains for the website to be used for SEO'
          },
          {
            decision: 'CI/CD pipeline',
            reasoning: 'Automate the deployment process'
          }
        ],
        achievements: [
          'Deployed the website to Cloudflare Pages',
          'Set up multiple domains for the website',
          'CI/CD pipeline for the website',
          'Set up a monitoring system for the website',
          'Set up a backup system for the website'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Project Stack',
      image: '/project-media/portfolio/project-stack.webp'
    },
    {
      title: '404 Page',
      image: '/project-media/portfolio/404.webp'
    },
    {
      title: 'Highlights',
      image: '/project-media/portfolio/highlights.webp'
    },
    {
      title: 'Contact Section',
      image: '/project-media/portfolio/contact.webp'
    },
    {
      title: 'Projects Section',
      image: '/project-media/portfolio/projects.webp'
    },
    {
      title: 'Hero Section',
      image: '/project-media/portfolio/hero.webp'
    },
    {
      title: 'Demo',
      image: '/project-media/portfolio/demo.webp'
    },
    {
      title: 'Journey',
      image: '/project-media/portfolio/journey.webp'
    },
    {
      title: 'Project Hero',
      image: '/project-media/portfolio/project-hero.webp'
    }
  ],

  stats: {
    linesOfCode: '12.6k',
    commits: '20+',
    features: '10+',
    technologies: '12+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-desktop-demo.mp4',
      device: 'desktop',
      length: '',
      preview: '/project-media/portfolio/demo-desktop-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-tablet-demo.mp4',
      device: 'tablet',
      length: '',
      preview: '/project-media/portfolio/demo-tablet-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-mobile-demo.mp4',
      device: 'mobile',
      length: '',
      preview: '/project-media/portfolio/demo-mobile-preview.webp'
    }
  ]
};
