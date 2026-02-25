'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import WhatIsWFPB from './WhatIsWFPB';
import Benefits from './Benefits';
import Protocol from './Protocol';
import DrCampbell from './DrCampbell';
import DrGoldner from './DrGoldner';
import Foods from './Foods';
import Recipes from './Recipes';
import { nutritionTabs } from '@/data/nutritionTabs';

const NutritionTabs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tabFromUrl = searchParams.get('tab') || 'what-is-wfpb';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const updateTabParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    updateTabParam(value);
  };

  const tabContent: Record<string, React.ReactNode> = {
    'what-is-wfpb': <WhatIsWFPB />,
    benefits: <Benefits />,
    protocol: <Protocol />,
    'dr-campbell': <DrCampbell />,
    'dr-goldner': <DrGoldner />,
    foods: <Foods />,
    recipes: <Recipes />,
  };

  const triggerClass = (id: string) =>
    `px-4 py-2 border-b-2 rounded-none whitespace-nowrap ${
      activeTab === id ? 'border-teal text-teal' : 'border-transparent'
    }`;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} className="max-w-4xl mx-auto" onValueChange={handleTabChange}>
          <div className="border-b mb-6">
            <ScrollArea className="w-full">
              <TabsList className="w-max justify-start bg-transparent h-auto mb-0 p-0 flex-nowrap">
                {nutritionTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className={triggerClass(tab.id)}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {nutritionTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tabContent[tab.id]}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default NutritionTabs;
