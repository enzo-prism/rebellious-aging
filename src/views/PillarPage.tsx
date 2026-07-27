
import React from 'react';
import Link from 'next/link';
import { pillarContent } from '@/data/pillarContent';
import PillarHero from '@/components/pillar/PillarHero';
import GallerySection from '@/components/pillar/GallerySection';
import QuizSection from '@/components/pillar/QuizSection';
import ChecklistCTA from '@/components/pillar/ChecklistCTA';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import GratitudePillar from '@/components/pillar/GratitudePillar';
import { Button } from '@/components/ui/button';

interface PillarPageProps {
  pillarId: string;
}

const PillarPage = ({ pillarId }: PillarPageProps) => {

  const pillarRelatedLinks: Record<string, {
    badge: string;
    title: string;
    description: string;
    links: Array<{ to: string; label: string }>;
  }> = {
    confidence: {
      badge: 'Keep exploring',
      title: 'Mindset Boosts',
      description: 'Pair your confidence work with gratitude practices and a favorite rebel blog post.',
      links: [
        { to: '/pillars/gratitude', label: 'Visit Gratitude Pillar' },
        { to: '/blog/limiting-beliefs-not-boss', label: 'Read “Shhh… That Voice Is Not the Boss”' }
      ]
    },
    style: {
      badge: 'Looking for inspiration?',
      title: 'Style Fuel',
      description: 'Watch Suz riff on style and read how rebels remix their closets.',
      links: [
        { to: '/video-series', label: 'Watch the Video Series' },
        { to: '/blog/the-new-classic-timeless-style', label: 'Read “The New Classic”' }
      ]
    }
  };

  if (pillarId === 'gratitude') {
    return <GratitudePillar />;
  }
  
  if (!pillarId || !pillarContent[pillarId]) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6">Pillar Not Found</h1>
        <p>The pillar you're looking for doesn't exist.</p>
      </div>
    );
  }

  const content = pillarContent[pillarId];
  const canonicalPath = `/pillars/${pillarId}`;

  return (
    <div>
      <Seo
        title={content.title}
        description={content.description}
        canonicalPath={canonicalPath}
      />
      <PillarHero content={content} />

      <GallerySection content={content} />

      {pillarId === 'health' && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-teal/10 to-white border border-teal/20 rounded-3xl p-8 flex flex-col lg:flex-row gap-6 items-start justify-between">
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">Deeper Dive</p>
              <h2 className="text-3xl font-bold mt-2 mb-4">Whole-Food, Plant-Based Guide</h2>
              <p className="text-gray-700 max-w-2xl">
                Explore exactly what to pile on your plate, what to crowd out, and how to shop, label-read, and stay sparkly as you embrace
                WFPB living. Then browse the resource guide for documentaries, books, and talks to keep the momentum going.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/pillars/health/nutrition-guide">Read the Guide</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pillars/health/resource-guide">Explore Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {pillarId && pillarId !== 'health' && pillarRelatedLinks[pillarId] && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">{pillarRelatedLinks[pillarId].badge}</p>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-2">
              <div>
                <h2 className="text-3xl font-bold mb-3">{pillarRelatedLinks[pillarId].title}</h2>
                <p className="text-gray-700">{pillarRelatedLinks[pillarId].description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {pillarRelatedLinks[pillarId].links.map((item) => (
                  <Button key={item.to} asChild variant="outline">
                    <Link href={item.to}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <QuizSection content={content} pillarId={pillarId} />
      
      <ChecklistCTA content={content} />
      
      <ConnectCTA />
    </div>
  );
};

export default PillarPage;
