'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ConnectCTA from '@/components/common/ConnectCTA';

interface SuccessStory {
  id: number;
  name: string;
  age: number;
  pillar: string;
  gender: string;
  image: string;
  quote: string;
  story: string;
}

// Define the base success stories data first
const baseSuccessStories: Omit<SuccessStory, "image">[] = [
  {
    id: 1,
    name: "Eleanor Johnson",
    age: 68,
    pillar: "Confidence",
    gender: "Female",
    quote: "After decades of putting myself last, Rebellious Aging helped me reclaim my confidence and voice. I now lead a seniors hiking group with 50+ members!",
    story: "Eleanor spent most of her life taking care of others - her children, her husband, and later her aging parents. At 65, she found herself alone and unsure of her identity outside of being a caretaker. Through Rebellious Aging's confidence workshops and community support, she discovered her passion for the outdoors and leadership abilities she never knew she had."
  },
  {
    id: 2,
    name: "Michael Torres",
    age: 55,
    pillar: "Style",
    gender: "Male",
    quote: "I never thought style was for me until I discovered this community. Now I express myself boldly through fashion and get compliments everywhere I go.",
    story: "After a corporate career where he wore the same dark suits for decades, Michael felt invisible after early retirement. By exploring personal style through the Rebellious Aging approach, he discovered how clothing and self-expression could become a form of personal liberation and creativity."
  },
  {
    id: 3,
    name: "Patricia Reynolds",
    age: 72,
    pillar: "Longevity",
    gender: "Female",
    quote: "The plant-based nutrition program reversed my heart disease. My doctor was shocked when my markers improved in just 3 months of following the protocol!",
    story: "Patricia was facing serious heart issues and was told she would need ongoing medication for the rest of her life. Determined to find another way, she fully embraced the Rebellious Aging nutrition plan. Her transformation wasn't just physical - she found a new sense of empowerment by taking control of her health."
  },
  {
    id: 4,
    name: "David Chen",
    age: 60,
    pillar: "Confidence",
    gender: "Male",
    quote: "After my divorce at 58, I thought my life was over. Rebellious Aging showed me it was just beginning. I've since started my own business and am dating again!",
    story: "David found himself single after 32 years of marriage and felt completely lost. The Rebellious Aging community helped him rebuild his confidence through peer mentoring and personal development workshops. He's now helping other men navigate similar life transitions."
  },
  {
    id: 5,
    name: "Sophia Washington",
    age: 67,
    pillar: "Style",
    gender: "Female",
    quote: "I used to dress to be invisible. Now my wardrobe is full of colors and patterns that make me feel alive and seen!",
    story: "As a professor for over 40 years, Sophia always dressed conservatively to be taken seriously in academia. Upon retirement, she felt she had lost her identity. Through Rebellious Aging's style workshops, she discovered how fashion could be a form of self-expression and joy rather than conformity."
  }
];

// Now add the gradient images to create the full success stories
const successStories: SuccessStory[] = [
  {
    ...baseSuccessStories[0],
    image: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)"
  },
  {
    ...baseSuccessStories[1],
    image: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
  },
  {
    ...baseSuccessStories[2],
    image: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)"
  },
  {
    ...baseSuccessStories[3],
    image: "linear-gradient(90deg, rgba(245,152,168) 0%, rgba(246,237,178) 100%)"
  },
  {
    ...baseSuccessStories[4],
    image: "linear-gradient(to right, #ee9ca7, #ffdde1)"
  }
];

const SuccessStories = () => {
  const [activeFilters, setActiveFilters] = useState<{
    pillar: string | null;
    gender: string | null;
    ageRange: string | null;
  }>({
    pillar: null,
    gender: null,
    ageRange: null
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterStories = () => {
    return successStories.filter(story => {
      if (searchTerm && !story.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !story.story.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (activeFilters.pillar && story.pillar !== activeFilters.pillar) {
        return false;
      }
      
      if (activeFilters.gender && story.gender !== activeFilters.gender) {
        return false;
      }
      
      if (activeFilters.ageRange) {
        const age = story.age;
        if (activeFilters.ageRange === '50-59' && (age < 50 || age > 59)) return false;
        if (activeFilters.ageRange === '60-69' && (age < 60 || age > 69)) return false;
        if (activeFilters.ageRange === '70+' && age < 70) return false;
      }
      
      return true;
    });
  };
  
  const filteredStories = filterStories();
  
  const handleFilterChange = (category: 'pillar' | 'gender' | 'ageRange', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };
  
  const clearFilters = () => {
    setActiveFilters({
      pillar: null,
      gender: null,
      ageRange: null
    });
    setSearchTerm('');
  };

  return (
    <div>
      <section className="bg-teal/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-lg text-gray-700 mb-8">
              Real stories from real people who are aging boldly and living vibrantly. 
              Let their journeys inspire your own path to rebellious aging.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full md:w-1/3">
              <Input
                type="search"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Pillar</span>
                <div className="flex gap-2">
                  {['Confidence', 'Style', 'Longevity'].map((pillar) => (
                    <Badge 
                      key={pillar}
                      variant={activeFilters.pillar === pillar ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        activeFilters.pillar === pillar ? 'bg-teal hover:bg-teal-dark' : ''
                      }`}
                      onClick={() => handleFilterChange('pillar', pillar)}
                    >
                      {pillar}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Gender</span>
                <div className="flex gap-2">
                  {['Female', 'Male'].map((gender) => (
                    <Badge 
                      key={gender}
                      variant={activeFilters.gender === gender ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        activeFilters.gender === gender ? 'bg-teal hover:bg-teal-dark' : ''
                      }`}
                      onClick={() => handleFilterChange('gender', gender)}
                    >
                      {gender}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Age</span>
                <div className="flex gap-2">
                  {['50-59', '60-69', '70+'].map((ageRange) => (
                    <Badge 
                      key={ageRange}
                      variant={activeFilters.ageRange === ageRange ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        activeFilters.ageRange === ageRange ? 'bg-teal hover:bg-teal-dark' : ''
                      }`}
                      onClick={() => handleFilterChange('ageRange', ageRange)}
                    >
                      {ageRange}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {(activeFilters.pillar || activeFilters.gender || activeFilters.ageRange || searchTerm) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="self-end"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map(story => (
                <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className="h-64 overflow-hidden"
                    style={{ 
                      background: story.image,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-teal">{story.pillar}</Badge>
                      <span className="text-sm text-gray-500">{story.age} years</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 mb-3">{story.name}</h3>
                    <p className="text-gray-700 italic mb-4">"{story.quote}"</p>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {story.story}
                    </p>
                    <Button variant="outline" className="w-full text-teal border-teal hover:bg-teal hover:text-white">
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No stories match your filters</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or clear all filters</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-teal/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Have Your Own Rebellious Aging Story?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Your journey could inspire others who are just beginning their rebellious aging path.
              Share your experience and become part of our vibrant community.
            </p>
            <Button className="bg-coral hover:bg-coral-dark text-white">
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
      
      <ConnectCTA />
    </div>
  );
};

export default SuccessStories;
