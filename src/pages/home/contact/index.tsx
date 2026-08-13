import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import { Link } from '@/components/common/link';
import { projectSummaries } from '@/data/project-summaries';
import { PersonalService } from '@/services/personal.service';

const CLOSING_WORDS = ['Tell', 'me', 'what', 'needs', 'to', 'work.'];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number>();
  const contact = PersonalService.getContactInfo();
  const social = PersonalService.getSocialLinks();
  const highestPriorityProject = projectSummaries[0];
  const currentYear = new Date().getFullYear();
  const [emailName, emailDomain] = contact.email.split('@');

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
    <section id="contact" className="bg-background text-foreground">
      <div className="content-shell px-5 py-20 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-12 lg:items-end">
          <h2 aria-label="Tell me what needs to work." className="contact-question reactive-heading lg:col-span-9">
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
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold md:mt-8">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="reactive-link inline-flex min-h-11 items-center gap-2 text-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="reactive-link inline-flex min-h-11 items-center gap-2 text-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 grid border-y-2 border-current md:mt-20 md:grid-cols-[1fr_auto]">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="Write an email"
            data-signal
            data-signal-color="#74f0b3"
            className="group/email flex min-h-16 min-w-0 items-center justify-between gap-5 overflow-hidden py-3 pr-5 sm:min-h-20 sm:py-4 md:min-h-32 md:py-5 md:pr-8">
            <span className="contact-email min-w-0 whitespace-nowrap">
              {emailName}@{emailDomain}
            </span>
            <ArrowUpRight
              className="hidden size-10 shrink-0 transition-transform duration-300 group-hover/email:rotate-45 group-focus-visible/email:rotate-45 sm:block"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            data-magnetic
            data-signal
            data-signal-color="#ffd400"
            data-cursor={copied ? 'Copied' : 'Copy address'}
            data-state={copied ? 'copied' : 'idle'}
            className="copy-email-control flex min-h-14 min-w-40 items-center justify-center gap-2 border-t-2 border-current bg-[#ffd400] px-5 font-bold text-[#080808] sm:min-h-16 md:min-h-full md:border-l-2 md:border-t-0"
            aria-live="polite">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
      </div>

      <footer className="border-t-2 border-current bg-foreground px-5 text-background md:px-8 lg:px-12">
        <div className="content-shell">
          {highestPriorityProject && (
            <Link
              to={`/projects/${highestPriorityProject.slug}`}
              unstyled
              data-cursor={`View ${highestPriorityProject.title}`}
              data-signal
              data-signal-color="#6c4eff"
              className="group relative -mx-5 block overflow-hidden border-b border-background/25 px-5 py-11 md:mx-0 md:px-0 md:py-14">
              <span className="absolute inset-x-0 top-0 flex h-1" aria-hidden="true">
                <span className="w-1/4 bg-[#ff583d]" />
                <span className="w-1/4 bg-[#ffd400]" />
                <span className="w-1/4 bg-[#4f5dff]" />
                <span className="w-1/4 bg-[#74f0b3]" />
              </span>

              <div className="mb-8 flex items-center gap-2 whitespace-nowrap font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] sm:gap-4 sm:text-xs sm:tracking-[0.1em]">
                <span className="shrink-0">Next case study</span>
                <span className="text-background/45" aria-hidden="true">
                  /
                </span>
                <span className="min-w-0 text-background/60">
                  {highestPriorityProject.title} · {highestPriorityProject.category} · {highestPriorityProject.year}
                </span>
              </div>

              <span className="flex items-end justify-between gap-6">
                <span className="footer-project-title whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none">
                  View project.
                </span>
                <ArrowUpRight
                  className="mb-1 size-10 shrink-0 stroke-[1.5] transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none md:size-14"
                  aria-hidden="true"
                />
              </span>
            </Link>
          )}

          <div className="grid md:grid-cols-[1fr_auto] md:items-stretch md:border-b md:border-background/25">
            <div className="hidden min-h-16 items-center py-5 md:flex md:min-h-20 md:pr-10">
              <span className="font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.08em] text-background/55">
                Questions first. Tools second.
              </span>
            </div>

            <a
              href="#hero"
              className="group flex min-h-16 items-center justify-between gap-10 border-b border-background/25 py-5 font-bold md:min-w-52 md:border-b-0 md:border-l md:px-7">
              Back to top
              <ArrowUpRight
                className="size-5 transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="hidden flex-col gap-2 py-5 font-mono text-xs uppercase tracking-[0.08em] text-background/55 sm:flex sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear}</p>
            <p>Made with care. Tested in code.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};
