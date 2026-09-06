
import React, { Suspense } from 'react';
import WhatIsWFPB from '@/components/nutrition/WhatIsWFPB';
import FaqSection from '@/components/seo/FaqSection';
import { nutritionFaqs } from '@/data/faqs';
import Link from 'next/link';
import NutritionHero from '@/components/nutrition/NutritionHero';
import NutritionTabs from '@/components/nutrition/NutritionTabs';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { Button } from '@/components/ui/button';

const Nutrition = () => {
  const seoConfig = getSeoRouteByPath('/nutrition');


  return (
    <div>
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}
      <NutritionHero />
      <section className="container mx-auto px-4 py-12">
        <div className="bg-coral/10 border border-coral/20 rounded-3xl p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-coral font-semibold">Need a printable roadmap?</p>
            <h2 className="text-3xl font-bold mt-2">Whole-Food, Plant-Based Guide</h2>
            <p className="text-gray-700 max-w-3xl">
              Dive deep into what to eat, what to crowd out, and how to read labels like a rebel on our dedicated nutrition guide page.
            </p>
          </div>
          <Button asChild className="self-start">
            <Link href="/pillars/health/nutrition-guide">Explore the Guide</Link>
          </Button>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <p className="text-gray-700">
            Pair this guide with the{' '}
            <Link href="/pillars/health" className="text-teal font-semibold hover:underline">
              Health Pillar
            </Link>{' '}
            and dive into real-life stories on our{' '}
            <Link href="/blog" className="text-teal font-semibold hover:underline">
              blog archive
            </Link>{' '}
            for veggie-fueled inspiration.
          </p>
        </div>
      </section>
      <Suspense fallback={<section className="container mx-auto px-4 py-12"><WhatIsWFPB /></section>}>
        <NutritionTabs />
      </Suspense>
      <FaqSection title="Getting started with plant-based eating" questions={nutritionFaqs} />
      <ConnectCTA />
    </div>
  );
};

export default Nutrition;
