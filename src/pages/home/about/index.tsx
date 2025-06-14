import { PersonalService } from '@/services/personal.service';

import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { AboutBackgroundElements } from './background-elements';
import { EducationCard, LanguagesCard, LocationCard } from './info-cards';
import { JourneyTimeline } from './journey-timeline';
import { QuickStats } from './quick-stats';
import { StoryCard } from './story-card';

const About = () => {
  const { tagline } = PersonalService.getBasicInfo();

  return (
    <section id="about" className="py-10 md:py-16 relative overflow-hidden">
      <AboutBackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="About Me" subtitle={tagline} backgroundTitle="ABOUT" />

          <SectionDivider />

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="space-y-6">
              <StoryCard />
              <QuickStats />
            </div>

            <div className="space-y-6">
              <EducationCard />
              <LocationCard />
              <LanguagesCard />
            </div>
          </div>

          <JourneyTimeline />
        </div>
      </div>
    </section>
  );
};

export default About;
