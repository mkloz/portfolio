import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import { PersonalService } from '@/services/personal.service';

gsap.registerPlugin(ScrollTrigger);

const CLOSING_WORDS = ['Tell', 'me', 'what', 'needs', 'to', 'work.'];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyTimerRef = useRef<number>();
  const contact = PersonalService.getContactInfo();
  const social = PersonalService.getSocialLinks();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        heading.querySelectorAll('[data-contact-word]'),
        { autoAlpha: 0.16 },
        {
          autoAlpha: 1,
          stagger: 0.14,
          ease: 'none',
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
            end: 'bottom 38%',
            scrub: 0.45
          }
        }
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-[#f4f2ed] text-[#080808]">
      <div className="mx-auto max-w-[100rem] px-5 py-28 md:px-8 md:py-40 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 ref={headingRef} aria-label="Tell me what needs to work." className="contact-question lg:col-span-9">
            {CLOSING_WORDS.map((word) => (
              <span key={word} data-contact-word aria-hidden="true" className="mr-[0.18em] inline-block">
                {word}
              </span>
            ))}
          </h2>

          <div className="border-t border-[#080808]/30 pt-6 lg:col-span-3">
            <p className="text-lg font-semibold leading-relaxed">
              I am based in Manchester and available for full-stack roles. A job description, project outline, or
              technical question is enough context.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b border-current">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b border-current">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid border-y-2 border-[#080808] md:grid-cols-[1fr_auto]">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="Write an email"
            className="group/email flex min-h-24 min-w-0 items-center justify-between gap-5 overflow-hidden py-5 pr-5 md:min-h-32 md:pr-8">
            <span className="contact-email min-w-0 break-all">{contact.email}</span>
            <ArrowUpRight
              className="hidden size-10 shrink-0 transition-transform duration-300 group-hover/email:rotate-45 group-focus-visible/email:rotate-45 sm:block"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="flex min-h-16 min-w-40 items-center justify-center gap-2 border-t-2 border-[#080808] bg-[#ffd400] px-5 font-bold md:min-h-full md:border-l-2 md:border-t-0"
            aria-live="polite">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
      </div>

      <footer className="px-5 py-7 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Mykhailo Kloz / Manchester</p>
          <p className="inline-flex items-center gap-2">
            Portfolio built by Mykhailo <ArrowUpRight className="size-4" aria-hidden="true" />
          </p>
        </div>
      </footer>
    </section>
  );
};
