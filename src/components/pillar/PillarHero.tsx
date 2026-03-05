
import React from 'react';
import { PillarContent } from '@/data/pillarContent';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';

interface PillarHeroProps {
  content: PillarContent;
}

const PillarHero: React.FC<PillarHeroProps> = ({ content }) => {
  return (
    <section className="bg-teal/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageTopUtilityRow>
            <PageShareButton />
          </PageTopUtilityRow>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
          <p className="text-lg text-gray-700">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PillarHero;
