import { cn } from '@/lib/utils';
import { PersonalService } from '@/services/personal.service';

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
  const yearsOfExperience = PersonalService.getYearsOfExperience();
  const projectsCompleted = PersonalService.getProjectsCompleted();
  const linesOfCode = PersonalService.getLinesOfCode();

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        value={`${yearsOfExperience}+`}
        label="Years Coding"
        gradient="from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20"
        textColor="text-blue-600 dark:text-blue-400"
      />
      <StatCard
        value={`${projectsCompleted}+`}
        label="Projects Built"
        gradient="from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20"
        textColor="text-green-600 dark:text-green-400"
      />
      <StatCard
        value={linesOfCode}
        label="Lines of Code"
        gradient="from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20"
        textColor="text-orange-600 dark:text-orange-400"
      />
    </div>
  );
};
