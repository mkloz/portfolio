import type { FC } from 'react';

import { Image } from '../../../components/common/image';

export const ProfilePhoto: FC = () => {
  return (
    <div className="flex justify-center justify-self-center lg:justify-self-end lg:justify-end  aspect-square  max-h-110 p-8">
      <div className="relative group">
        <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-80 animate-pulse transition-opacity duration-1000 "></div>
        <div className="absolute -inset-5 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 rounded-full opacity-60 animate-pulse delay-300 transition-opacity duration-1000"></div>
        <div className="absolute -inset-0 bg-gradient-to-r from-pink-500/40 via-orange-500/40 to-yellow-500/40 rounded-full opacity-50 animate-pulse delay-700 transition-opacity duration-1000"></div>

        <Image
          src="/avatar-profile.png"
          alt="Mykhailo Kloz - Full-Stack Developer"
          className="rounded-full size-full object-cover"
          wrapperClassName="h-full w-full opacity-90"
        />
      </div>
    </div>
  );
};
