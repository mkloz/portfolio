import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  gradient: string;
  textColor: string;
}

const StatCard = ({ value, label, gradient, textColor }: StatCardProps) => {
  return (
    <div
      className={cn(
        'group border-0 shadow-xl backdrop-blur-xl rounded-3xl transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br',
        gradient
      )}>
      <div className="p-6 text-center">
        <div className={cn('text-4xl font-black mb-2', textColor)}>{value}</div>
        <div className="text-gray-700 dark:text-gray-300 font-bold">{label}</div>
      </div>
    </div>
  );
};

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <StatCard
        value="3+"
        label="Years Coding"
        gradient="from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20"
        textColor="text-blue-600 dark:text-blue-400"
      />
      <StatCard
        value="10+"
        label="Projects Built"
        gradient="from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20"
        textColor="text-green-600 dark:text-green-400"
      />
    </div>
  );
};
