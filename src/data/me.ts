import { Award, Briefcase, Code, GraduationCap } from 'lucide-react';
import { ElementType } from 'react';

// Default icon for timeline items
export interface TimelineIconProps {
  size: number;
  className: string;
}
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    github: string;
    linkedin: string;
    telegram: string;
    whatsapp: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message: string;
  };
  education: {
    degree: string;
    institution: string;
    period?: string;
  };
  languages: Array<{
    name: string;
    level: string;
    percentage: number;
  }>;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    linesOfCode: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    description: string;
    type: 'education' | 'work' | 'project' | 'achievement';
    icon?: ElementType;
  }>;
}

export const ME: PersonalInfo = {
  name: 'Mykhailo Kloz',
  title: 'Full-Stack Web Developer',
  tagline: '',

  location: {
    city: 'Manchester City',
    country: 'UK'
  },

  contact: {
    email: 'mykhailo.kloz@gmail.com',
    phone: '+44 7388232276',
    whatsapp: '+380994577468'
  },

  social: {
    github: 'https://github.com/mkloz',
    linkedin: 'https://www.linkedin.com/in/mkloz',
    telegram: 'https://mkl0z.t.me',
    whatsapp: 'https://wa.me/380994577468'
  },

  availability: {
    status: 'available',
    message: 'Available'
  },

  education: {
    degree: 'Software Development',
    institution: 'Kharkiv Polytechnic Institute (KHPI)',
    period: '2022-2026'
  },

  languages: [
    {
      name: 'English',
      level: 'Highly proficient',
      percentage: 90
    },
    {
      name: 'Ukrainian',
      level: 'Native speaker',
      percentage: 100
    },
    {
      name: 'Russian',
      level: 'Native speaker',
      percentage: 100
    }
  ],

  stats: {
    yearsOfExperience: 3,
    projectsCompleted: 10,
    linesOfCode: '150k'
  },

  timeline: [
    {
      year: 'November 2021',
      title: 'Began Web Development Journey',
      description: 'Started learning HTML, CSS, and JavaScript through self-driven projects and online courses.',
      type: 'education',
      icon: GraduationCap
    },
    {
      year: 'September 2022',
      title: 'Started University at KHPI',
      description:
        'Enrolled in Software Development at Kharkiv Polytechnic Institute, focusing on computer science and algorithms.',
      type: 'education',
      icon: GraduationCap
    },
    {
      year: 'November 2022',
      title: 'First Backend Project & Relocation',
      description: 'Built a complex backend system using Node.js and PostgreSQL, and relocated to the UK.',
      type: 'achievement',
      icon: Award
    },
    {
      year: 'August 2023',
      title: 'Backend Developer',
      description:
        'Worked as a backend developer in cross-functional teams, building APIs and improving delivery workflows.',
      type: 'work',
      icon: Code
    },
    {
      year: 'July 2024',
      title: 'Transitioned to Full-Stack',
      description: 'Expanded to full-stack development, building end-to-end solutions with React, TypeScript, Node.js',
      type: 'achievement',
      icon: Award
    },
    {
      year: 'Now',
      title: 'Full-Stack Developer',
      description: 'Building full-stack projects with a focus on maintainable code and usable interfaces.',
      type: 'work',
      icon: Briefcase
    }
  ]
};

// Helper functions for accessing personal data
export const getContactInfo = () => ME.contact;

export const getSocialLinks = () => ME.social;

export const getLocationInfo = () => ME.location;

export const getEducationInfo = () => ME.education;

export const getLanguages = () => ME.languages;

export const getAvailabilityStatus = () => ME.availability;
