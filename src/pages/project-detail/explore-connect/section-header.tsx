import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  className?: string;
}

export const SectionHeader = ({ className }: SectionHeaderProps) => {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-lg">
        Explore &{' '}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
      </h2>
      <p className="text-xl text-blue-50 max-w-3xl mx-auto drop-shadow">
        Ready to dive deeper? Explore the live project, check out the code, or get in touch to discuss this work
      </p>
    </div>
  );
};
