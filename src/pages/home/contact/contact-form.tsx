import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const CONTACT_INTENTS = [
  { value: 'Full-stack role', label: 'A full-stack role', accent: '#ffd400', foreground: '#080808' },
  { value: 'Product build', label: 'A product build', accent: '#74f0b3', foreground: '#080808' },
  { value: 'Technical question', label: 'A technical question', accent: '#465bff', foreground: '#ffffff' }
] as const;

export const ContactForm = () => {
  const [intent, setIntent] = useState<(typeof CONTACT_INTENTS)[number]['value']>('Full-stack role');
  const [subject, setSubject] = useState('Full-stack role');

  const selectIntent = (nextIntent: (typeof CONTACT_INTENTS)[number]) => {
    setIntent(nextIntent.value);
    setSubject(nextIntent.value);
  };

  return (
    <form action="https://formspree.io/f/mqabdkwq" method="POST" className="grid gap-10">
      <input type="hidden" name="intent" value={intent} />

      <fieldset>
        <legend className="text-2xl font-black tracking-[-0.035em] md:text-3xl">What are you writing about?</legend>
        <div className="mt-5 grid border border-white/30 md:grid-cols-3">
          {CONTACT_INTENTS.map((option) => {
            const active = intent === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => selectIntent(option)}
                className={cn(
                  'min-h-16 border-b border-white/30 px-4 text-left text-base font-bold transition-[background-color,color] duration-200 last:border-b-0 md:min-h-20 md:border-b-0 md:border-r md:last:border-r-0',
                  !active &&
                    'text-white/65 hover:bg-white hover:text-[#080808] focus-visible:bg-white focus-visible:text-[#080808]'
                )}
                style={active ? { backgroundColor: option.accent, color: option.foreground } : undefined}>
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-white">
            Your name
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="My name is..."
            required
            className="h-14 rounded-none border-x-0 border-t-0 border-white/45 px-0 text-lg text-white shadow-none placeholder:text-white/42 focus-visible:border-[#ffd400] focus-visible:ring-[#ffd400]/35"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-white">
            Your email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            className="h-14 rounded-none border-x-0 border-t-0 border-white/45 px-0 text-lg text-white shadow-none placeholder:text-white/42 focus-visible:border-[#ffd400] focus-visible:ring-[#ffd400]/35"
          />
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="subject" className="text-white">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
            className="h-14 rounded-none border-x-0 border-t-0 border-white/45 px-0 text-lg text-white shadow-none focus-visible:border-[#ffd400] focus-visible:ring-[#ffd400]/35"
          />
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="message" className="text-white">
            What should I know?
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="A job description, project outline, or technical problem is enough."
            rows={6}
            required
            className="min-h-40 rounded-none border-x-0 border-t-0 border-white/45 px-0 text-lg text-white shadow-none placeholder:text-white/42 focus-visible:border-[#ffd400] focus-visible:ring-[#ffd400]/35"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/25 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-white/55">This goes straight to my inbox.</p>
        <Button
          type="submit"
          size="xl"
          rounded="none"
          accent="marker"
          className="w-full justify-between px-6 sm:w-auto sm:min-w-56">
          Send the context <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
};
