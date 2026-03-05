
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
            Discover the science-backed nutrition approach that can help prevent and reverse chronic diseases, 
            increase your energy, and support vibrant longevity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NutritionHero;
