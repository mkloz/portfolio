import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import { Link } from '@/components/common/link';
import { PersonalService } from '@/services/personal.service';
import { ProjectService } from '@/services/project.service';

gsap.registerPlugin(ScrollTrigger);

const CLOSING_WORDS = ['Tell', 'me', 'what', 'needs', 'to', 'work.'];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyTimerRef = useRef<number>();
  const contact = PersonalService.getContactInfo();
  const social = PersonalService.getSocialLinks();
  const highestPriorityProject = ProjectService.getAllProjects()[0];
  const currentYear = new Date().getFullYear();
  const [emailName, emailDomain] = contact.email.split('@');

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
    <section ref={sectionRef} id="contact" className="bg-background text-foreground">
      <div className="content-shell px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 ref={headingRef} aria-label="Tell me what needs to work." className="contact-question lg:col-span-9">
            {CLOSING_WORDS.map((word) => (
              <span key={word} data-contact-word aria-hidden="true" className="mr-[0.18em] inline-block">
                {word}
              </span>
            ))}
          </h2>

          <div className="border-t border-current/30 pt-6 lg:col-span-3">
            <p className="text-lg font-semibold leading-relaxed">
              Based in Manchester. Send the problem, not a polished brief. A job description, rough project outline, or
              technical question is enough.
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

        <div className="mt-20 grid border-y-2 border-current md:grid-cols-[1fr_auto]">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="Write an email"
            className="group/email flex min-h-24 min-w-0 items-center justify-between gap-5 overflow-hidden py-5 pr-5 md:min-h-32 md:pr-8">
            <span className="contact-email flex min-w-0 flex-wrap">
              <span>{emailName}@</span>
              <span>{emailDomain}</span>
            </span>
            <ArrowUpRight
              className="hidden size-10 shrink-0 transition-transform duration-300 group-hover/email:rotate-45 group-focus-visible/email:rotate-45 sm:block"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="flex min-h-16 min-w-40 items-center justify-center gap-2 border-t-2 border-current bg-[#ffd400] px-5 font-bold text-[#080808] md:min-h-full md:border-l-2 md:border-t-0"
            aria-live="polite">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
      </div>

      <footer className="border-t-2 border-current bg-foreground px-5 text-background md:px-8 lg:px-12">
        <div className="content-shell">
          <div className="grid border-b border-background/25 md:grid-cols-[minmax(17rem,0.75fr)_minmax(24rem,1.25fr)_12rem]">
            <div className="flex min-h-36 items-center justify-between gap-8 py-7 md:min-h-48 md:pr-10">
              <span className="text-[clamp(4.5rem,9vw,8.5rem)] font-black leading-none tracking-[-0.04em]">
                MK<span className="text-[#ff583d]">/</span>
              </span>
              <span className="hidden max-w-44 text-right font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.08em] text-background/60 sm:block">
                Questions first. Tools second.
              </span>
            </div>

            {highestPriorityProject && (
              <Link
                to={`/projects/${highestPriorityProject.slug}`}
                unstyled
                className="group relative flex min-h-40 flex-col justify-between overflow-hidden border-t border-background/25 bg-background p-6 text-foreground md:min-h-48 md:border-l md:border-t-0">
                <span className="absolute inset-x-0 top-0 h-2 bg-[#6c4eff]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {highestPriorityProject.title}
                </span>
                <span className="flex items-end justify-between gap-6 text-[clamp(2.75rem,4vw,4.5rem)] font-black leading-[0.86] tracking-[-0.04em]">
                  View project
                  <ArrowUpRight
                    className="mb-1 size-9 shrink-0 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            )}

            <a
              href="#hero"
              className="group flex min-h-20 flex-col justify-between border-t border-background/25 p-4 font-bold hover:bg-background hover:text-foreground md:min-h-48 md:border-l md:border-t-0">
              <span className="size-2 bg-[#74f0b3]" aria-hidden="true" />
              <span className="flex items-center justify-between gap-3">
                Back to top
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-2 py-5 font-mono text-xs uppercase tracking-[0.08em] text-background/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear}</p>
            <p>Made with care. Tested in code.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};
