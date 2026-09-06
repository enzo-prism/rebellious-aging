
import React from 'react';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';

const NutritionHero = () => {
  return (
    <section className="bg-teal/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageTopUtilityRow>
            <PageShareButton />
          </PageTopUtilityRow>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Whole-Food, Plant-Based Nutrition</h1>
          <p className="text-lg text-gray-700">
            Explore whole-food, plant-based eating with Suz: what it means, how it differs from vegan eating,
            and where to find recipes, free guides, and resources for your next chapter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NutritionHero;
