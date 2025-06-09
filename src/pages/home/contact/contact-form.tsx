import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Label } from '../../../components/ui/label';

export const ContactForm = () => {
  return (
    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden p-0">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">Send Me a Message</h3>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions or want to work together, please fill out the form below and I&apos;ll get back to
            you soon.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What is this regarding?" />
          </div>

          <div className="space-y-4">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Tell me about your project..." rows={5} />
          </div>

          <Button type="submit" size="lg" gradient={'yellow'} className="w-full">
            <Send className="animate-pulse" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
