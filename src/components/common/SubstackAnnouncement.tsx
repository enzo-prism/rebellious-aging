import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUBSTACK_URL } from '@/lib/constants';

interface SubstackAnnouncementProps {
  className?: string;
}

const SubstackAnnouncement: React.FC<SubstackAnnouncementProps> = ({ className }) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-coral/30 bg-coral/5 px-6 py-5 ${
      className ?? ''
    }`}
  >
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-coral font-semibold">New</p>
      <h3 className="text-lg font-semibold text-gray-900 mt-2">Suz is now on Substack 📬</h3>
      <p className="text-gray-600 mt-1">
        Follow along for fresh, rebellious reflections delivered straight to your inbox.
      </p>
    </div>
    <Button
      asChild
      className="bg-coral text-white hover:bg-coral-dark shrink-0"
    >
      <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="group">
        Read on Substack
        <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
      </a>
    </Button>
  </div>
);

export default SubstackAnnouncement;
