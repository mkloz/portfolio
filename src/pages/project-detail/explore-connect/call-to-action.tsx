import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  className?: string;
}

export const CallToAction = ({ className }: CallToActionProps) => {
  return (
    <div
      className={cn(
        'text-center bg-gradient-to-r from-blue-500/60 to-cyan-500/60',
        'backdrop-blur-3xl rounded-3xl p-8 border border-blue-200/30',
        'shadow-2xl shadow-blue-500/30',
        className
      )}>
      <h3 className="text-3xl font-black text-white mb-4 drop-shadow-lg">Interested in Working Together?</h3>
      <p className="text-blue-50 text-lg mb-6 max-w-2xl mx-auto drop-shadow">
        I&apos;m always excited to collaborate on new projects and explore innovative solutions. Let&apos;s create
        something amazing together!
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="bg-white text-black hover:bg-blue-50 font-bold px-8 shadow-lg">
          <Mail className="mr-2" size={20} />
          Get in Touch
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white/50 text-white hover:bg-white/15 hover:border-white/70 hover:text-white font-bold px-8 backdrop-blur-sm">
          View More Projects
        </Button>
      </div>
    </div>
  );
};
