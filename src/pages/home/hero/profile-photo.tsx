import type { FC } from 'react';

import { PersonalService } from '@/services/personal.service';

import { Image } from '../../../components/common/image';

export const ProfilePhoto: FC = () => {
  const availability = PersonalService.getAvailabilityStatus();
  const location = PersonalService.getLocationInfo();

  return (
    <div className="flex justify-center lg:justify-end my-8">
      <div className="relative group">
        <div className="absolute -inset-12 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-1000 "></div>
        <div className="absolute -inset-9 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 rounded-full opacity-40 animate-pulse delay-300 group-hover:opacity-60 transition-opacity duration-1000"></div>
        <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/40 via-orange-500/40 to-yellow-500/40 rounded-full opacity-30 animate-pulse delay-700 group-hover:opacity-50 transition-opacity duration-1000"></div>

        <div className="relative w-80 h-80 md:w-106 md:h-106 aspect-square">
          <Image
            src="/avatar.jpg"
            alt="Mykhailo Kloz - Full-Stack Developer"
            className="rounded-3xl size-full aspect-square object-cover"
            wrapperClassName="rounded-3xl shadow-2xl  w-full h-full group-hover:scale-105 transition-transform duration-500 "
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 group-hover:opacity-0 transition-opacity duration-300"></div>
        </div>

        <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl px-4 py-2 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
          <span className="font-black text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {availability.message}
          </span>
        </div>
        <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl px-4 py-2 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
          <span className="font-black text-sm">
            {location.flag} {location.country} Based
          </span>
        </div>
      </div>
    </div>
  );
};
