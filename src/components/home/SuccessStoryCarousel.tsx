'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessStory {
  id: number;
  name: string;
  age: number;
  pillar: string;
  quote: string;
  image: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Eleanor Johnson",
    age: 68,
    pillar: "Confidence",
    quote: "After decades of putting myself last, Rebellious Aging helped me reclaim my confidence and voice. I now lead a seniors hiking group with 50+ members!",
    image: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)"
  },
  {
    id: 2,
    name: "Michael Torres",
    age: 55,
    pillar: "Style",
    quote: "I never thought style was for me until I discovered this community. Now I express myself boldly through fashion and get compliments everywhere I go.",
    image: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
  },
  {
    id: 3,
    name: "Patricia Reynolds",
    age: 72,
    pillar: "Longevity",
    quote: "The plant-based nutrition program reversed my heart disease. My doctor was shocked when my markers improved in just 3 months of following the protocol!",
    image: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)"
  }
];

const SuccessStoryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStory = () => {
    setActiveIndex((current) => (current + 1) % successStories.length);
  };

  const prevStory = () => {
    setActiveIndex((current) => (current - 1 + successStories.length) % successStories.length);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Real people transforming their lives through the Rebellious Aging approach.
          Be inspired by their journeys and discover what's possible for you.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div 
                  className="h-64 md:h-auto"
                  style={{ 
                    background: successStories[activeIndex].image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
                      {successStories[activeIndex].pillar}
                    </div>
                    <blockquote className="text-lg italic text-gray-700 mb-6">
                      "{successStories[activeIndex].quote}"
                    </blockquote>
                  </div>
                  <div>
                    <p className="font-medium">
                      {successStories[activeIndex].name}, {successStories[activeIndex].age}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center space-x-2 mt-6">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-teal' : 'bg-gray-300'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={prevStory}
              className="border-teal text-teal hover:bg-teal hover:text-white"
            >
              Previous Story
            </Button>
            <Button
              onClick={nextStory}
              className="bg-teal text-white hover:bg-teal-dark"
            >
              Next Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryCarousel;
