
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NutritionCTA: React.FC = () => {
  return (
    <section className="py-16 bg-coral/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Fuel Your Health Journey</h2>
          <p className="text-lg text-gray-700 mb-8">
            Discover how proper nutrition supports your health goals. Learn about foods that promote vitality, brain health, and overall wellness as you age rebelliously.
          </p>
          <Link href="/nutrition">
            <Button className="bg-coral hover:bg-coral-dark text-gray-900">
              Explore Nutrition for Health
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NutritionCTA;
