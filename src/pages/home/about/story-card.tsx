import { Heart } from 'lucide-react';

export const StoryCard = () => {
  return (
    <div className="group border-0 shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
      <div className="p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-3xl blur"></div>
            <div className="relative w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Heart size={24} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">My Story</h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium">The journey that defines me</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          <p>
            <span className="font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
              Resilient and adaptable
            </span>{' '}
            Originally from Ukraine, I relocated to the UK due to the war—an experience that strengthened my resilience,
            adaptability, and problem-solving mindset under pressure.
          </p>

          <p>
            <span className="font-black text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
              Building meaningful solutions
            </span>{' '}
            I thrive on breaking down complexity, designing clean, scalable systems, and delivering reliable,
            maintainable solutions. I believe in balancing quality with efficiency.
          </p>

          <p>
            <span className="font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">
              Focused and calm
            </span>{' '}
            I work carefully and with purpose, driven by a love for doing good work and making real progress. I enjoy
            honest talks and working with people who share the same values.
          </p>
        </div>
      </div>
    </div>
  );
};
