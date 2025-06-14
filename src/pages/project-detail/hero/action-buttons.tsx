import { Play } from 'lucide-react';
import { FaGithub, FaGlobe } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import { Link } from '../../../components/common/link';
import { Button, ButtonGradient, buttonVariants } from '../../../components/ui/button';
import { useScrollIntoView } from '../../../hooks/use-scroll-into-view';

interface ActionButtonsProps {
  gradient: ButtonGradient;

  github: string;
  website: string;
  className?: string;
}

export const ActionButtons = ({ gradient, github, website, className }: ActionButtonsProps) => {
  const scrollIntoView = useScrollIntoView();
  return (
    <div className={cn('flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start', className)}>
      <Button variant="default" gradient={gradient} onClick={() => scrollIntoView('demo')} className="grow">
        <Play className="group-hover:scale-110 transition-transform" />
        Live Demo
      </Button>
      <Link
        to={github}
        unstyled
        className={cn(buttonVariants({ variant: 'outline' }), 'text-sm sm:text-base text-white border-white')}>
        <FaGithub className="group-hover:scale-110 transition-transform" />
        Source Code
      </Link>
      <Link
        to={website}
        unstyled
        className={cn(buttonVariants({ variant: 'outline' }), 'text-sm sm:text-base text-white border-white')}>
        <FaGlobe className="group-hover:scale-110 transition-transform" />
        Visit Site
      </Link>
    </div>
  );
};
