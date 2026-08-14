import { Eye, Monitor, Moon, MousePointer, Sparkles, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const portfolioProject: Project = {
  // Basic info
  title: 'Portfolio',
  slug: 'portfolio',
  description: 'This portfolio, built to make my work easy to explore through case studies, demos, and project notes.',
  image: {
    light: '/project-media/portfolio/portfolio-light.webp',
    dark: '/project-media/portfolio/portfolio-dark.webp'
  },
  highlights: [
    {
      title: 'Made for every screen',
      description: 'Each page has a layout designed for both desktop and mobile use',
      icon: Sparkles,
      stats: 'Animated'
    },
    {
      title: 'Flexible layouts',
      description: 'Content adjusts to different screen sizes and orientations',
      icon: Monitor,
      stats: 'All devices'
    },
    {
      title: 'Thoughtful interaction',
      description: 'Motion and interactive details respond to the visitor without hiding the content',
      icon: MousePointer,
      stats: 'Interactive'
    },
    {
      title: 'Light and dark themes',
      description: 'Persistent light and dark themes',
      icon: Moon,
      stats: 'Theme aware'
    },
    {
      title: 'Faster loading',
      description: 'Lazy loading and code splitting keep the initial download smaller',
      icon: Zap,
      stats: '95+ score'
    },
    {
      title: 'Accessible by design',
      description: 'Semantic HTML, keyboard support, and clear labels make the site easier to use',
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
  tagline: 'A clearer way to explore my work.',
  longDescription:
    'This portfolio brings my projects together in one place. Each case study combines a plain overview with demos, build notes, source links, and a gallery for closer inspection.',
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
        title: 'Planning the experience',
        duration: '1 week',
        decisions: [
          {
            decision: 'Choose React with TypeScript for type safety',
            reasoning: 'Types make component changes safer as the site grows'
          },
          {
            decision: 'Use Tailwind CSS for styling',
            reasoning: 'It keeps the visual rules close to the components that use them'
          },
          {
            decision: 'Set the visual direction before implementation',
            reasoning: 'A clear layout and type system made later design choices more consistent'
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
        title: 'Building the site',
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
            reasoning: 'Both themes use the same components and familiar browser controls'
          },
          {
            decision: 'Add purposeful motion and small interaction details',
            reasoning: 'Motion adds character while the content and navigation still work without it'
          },
          {
            decision: 'Implement project case-study pages',
            reasoning: 'Each project needs enough context to explain the work alongside the screenshots'
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
        title: 'Publishing the site',
        duration: '1 day',
        decisions: [
          {
            decision: 'Deploy the website to Cloudflare Pages',
            reasoning: "Pages serves the verified static build from Cloudflare's edge network"
          },
          {
            decision: 'Set up multiple domains',
            reasoning: 'Each public address can point visitors to the same canonical site'
          },
          {
            decision: 'CI/CD pipeline',
            reasoning: 'Every verified change can be published through the same repeatable process'
          }
        ],
        achievements: [
          'Deployed the website to Cloudflare Pages',
          'Set up multiple domains for the website',
          'Added an automated build and deployment pipeline',
          'Added site monitoring',
          'Added a backup process'
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
