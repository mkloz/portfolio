import { Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { ContactBackgroundElements } from './background-elements';
import { ContactForm } from './contact-form';
import { ContactInfoCard } from './contact-info-card';
import { ContactSocialLinks } from './contact-social-links';

export const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <ContactBackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Contact Me"
          subtitle="Let's discuss how we can work together to bring your ideas to life"
          backgroundTitle="CONTACT"
        />

        <SectionDivider />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">Get in Touch</h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <ContactInfoCard
                    icon={Mail}
                    title="Email"
                    value="micha21cloz@gmail.com"
                    href="mailto:micha21cloz@gmail.com"
                    gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                    hoverColor="text-blue-600 dark:text-blue-400"
                  />

                  <ContactInfoCard
                    icon={Phone}
                    title="Phone"
                    value="+44 7388232276"
                    href="tel:+447388232276"
                    gradient="bg-gradient-to-r from-green-500 to-emerald-500"
                    hoverColor="text-green-600 dark:text-green-400"
                  />

                  <ContactInfoCard
                    icon={MapPin}
                    title="Location"
                    value="🇬🇧 Fivemiletown, UK"
                    gradient="bg-gradient-to-r from-orange-500 to-red-500"
                    hoverColor=""
                  />

                  <ContactInfoCard
                    icon={FaWhatsapp}
                    title="WhatsApp"
                    value="Message me"
                    href="https://wa.me/447388232276"
                    gradient="bg-gradient-to-r from-sky-500 to-blue-500"
                    hoverColor="text-sky-600 dark:text-sky-400"
                  />
                </div>
              </div>

              <ContactSocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
