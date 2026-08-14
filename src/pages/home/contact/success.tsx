import { ArrowUpRight, Check } from 'lucide-react';

import { Link } from '@/components/common/link';

const Success = () => {
  return (
    <main className="min-h-svh bg-[#080808] text-[#f4f2ed]">
      <div className="content-shell flex min-h-svh flex-col px-5 py-7 md:px-8 md:py-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/25 pb-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.13em]">
          <span>MK / Contact</span>
          <span className="inline-flex items-center gap-2 text-[#74f0b3]">
            <Check className="size-4" aria-hidden="true" /> Delivered
          </span>
        </header>

        <section className="grid flex-1 content-center gap-12 py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
              Message received
            </p>
            <h1 className="mt-5 text-[clamp(4rem,11vw,10rem)] font-black leading-[0.78] tracking-[-0.055em]">
              Thank
              <br />
              you<span className="text-[#74f0b3]">.</span>
            </h1>
          </div>

          <div className="border-t border-white/25 pt-6 lg:col-span-4">
            <p className="max-w-md text-lg font-semibold leading-relaxed text-white/75">
              Your message arrived. I&apos;ll read it and get back to you as soon as I can.
            </p>
            <div className="mt-8 grid border-y border-white/25">
              <Link
                to="/#hero"
                unstyled
                className="group flex min-h-16 items-center justify-between gap-5 border-b border-white/25 py-3 font-bold">
                Return home
                <ArrowUpRight
                  className="size-5 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/#projects"
                unstyled
                className="group flex min-h-16 items-center justify-between gap-5 py-3 font-bold text-white/70 transition-colors hover:text-white focus-visible:text-white">
                Review selected work
                <ArrowUpRight
                  className="size-5 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between gap-5 border-t border-white/25 pt-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/45">
          <span>Message sent</span>
          <span>Manchester / UK</span>
        </footer>
      </div>
    </main>
  );
};

export default Success;
