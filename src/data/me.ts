export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    flag: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
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
    flag: string;
    percentage: number;
  }>;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    linesOfCode: string;
    clientsSatisfied?: number;
  };
  bio: {
    short: string;
    detailed: string;
  };
  skills: {
    primary: string[];
    secondary: string[];
  };
  interests: string[];
  timeline: Array<{
    year: string;
    title: string;
    description: string;
    type: 'education' | 'work' | 'project' | 'achievement';
  }>;
}

export const ME: PersonalInfo = {
  name: 'Mykhailo Kloz',
  title: 'Full-Stack Web Developer',
  tagline: 'Passionate developer crafting digital experiences with creativity, precision, and innovation',

  location: {
    city: 'Manchester City',
    country: 'United Kingdom',
    flag: '🇬🇧',
    coordinates: {
      lat: 53.4808,
      lng: -2.2426
    }
  },

  contact: {
    email: 'micha21cloz@gmail.com',
    phone: '+44 7388232276',
    whatsapp: '+447388232276'
  },

  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    telegram: 'https://t.me/username',
    whatsapp: 'https://wa.me/447388232276'
  },

  availability: {
    status: 'available',
    message: 'Available for new projects'
  },

  education: {
    degree: 'Software Development',
    institution: 'Kharkiv Polytechnic Institute',
    period: '2020-2024'
  },

  languages: [
    {
      name: 'English',
      level: 'Highly proficient',
      flag: '🇬🇧',
      percentage: 90
    },
    {
      name: 'Ukrainian',
      level: 'Native speaker',
      flag: '🇺🇦',
      percentage: 100
    },
    {
      name: 'Russian',
      level: 'Native speaker',
      flag: '🇷🇺',
      percentage: 100
    }
  ],

  stats: {
    yearsOfExperience: 3,
    projectsCompleted: 10,
    linesOfCode: '120k',
    clientsSatisfied: 25
  },

  bio: {
    short: 'Passionate full-stack developer with 3+ years of experience creating innovative web solutions.',
    detailed: `I'm a dedicated full-stack developer with a passion for creating exceptional digital experiences. 
    With over 3 years of experience in web development, I specialize in modern JavaScript frameworks, 
    responsive design, and scalable backend solutions. I believe in writing clean, maintainable code 
    and staying up-to-date with the latest industry trends and best practices.`
  },

  skills: {
    primary: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
    secondary: ['Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS']
  },

  interests: ['Web Development', 'UI/UX Design', 'Open Source', 'Technology Innovation', 'Continuous Learning'],

  timeline: [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer',
      description: 'Leading development of complex web applications with modern tech stack',
      type: 'work'
    },
    {
      year: '2023',
      title: 'Freelance Developer',
      description: 'Successfully delivered 15+ projects for international clients',
      type: 'work'
    },
    {
      year: '2022',
      title: 'Full-Stack Developer',
      description: 'Developed and maintained multiple web applications using React and Node.js',
      type: 'work'
    },
    {
      year: '2021',
      title: 'Started Web Development Journey',
      description: 'Began learning modern web development technologies and frameworks',
      type: 'education'
    },
    {
      year: '2020',
      title: 'Computer Science Studies',
      description: 'Started studying Software Development at Kharkiv Polytechnic Institute',
      type: 'education'
    }
  ]
};

// Helper functions for accessing personal data
export const getPersonalInfo = (): PersonalInfo => ME;

export const getContactInfo = () => ME.contact;

export const getSocialLinks = () => ME.social;

export const getLocationInfo = () => ME.location;

export const getEducationInfo = () => ME.education;

export const getLanguages = () => ME.languages;

export const getStats = () => ME.stats;

export const getBio = () => ME.bio;

export const getSkills = () => ME.skills;

export const getTimeline = () => ME.timeline;

export const getAvailabilityStatus = () => ME.availability;
