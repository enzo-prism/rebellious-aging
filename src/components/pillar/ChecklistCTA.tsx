'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PillarContent } from '@/data/pillarContent';

interface ChecklistCTAProps {
  content: PillarContent;
}

const ChecklistCTA: React.FC<ChecklistCTAProps> = ({ content }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-teal/10 p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.checklistTitle}</h2>
            <p className="text-lg text-gray-700 mb-8">
              Download our practical checklist with daily actions you can take to build your {content.title.toLowerCase()} and transform your experience of aging.
            </p>
            <Button 
              className="bg-coral hover:bg-coral-dark text-white"
              onClick={() => window.open(content.checklistUrl, '_blank')}
            >
              Download Free PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChecklistCTA;
