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

  const activeTabMeta = useMemo(
    () => nutritionTabs.find((tab) => tab.id === activeTab) ?? nutritionTabs[0],
    [activeTab]
  );

  const triggerClass = (id: string) =>
    `px-4 py-3 border-b-2 rounded-none whitespace-nowrap text-sm font-semibold ${
      activeTab === id ? 'border-teal text-teal' : 'border-transparent text-slate-600 hover:text-slate-900'
    }`;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} className="max-w-4xl mx-auto" onValueChange={handleTabChange}>
          <div className="mb-6 md:hidden">
            <div className="rounded-[28px] border border-teal/15 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-teal">
                  Browse Topics
                </p>
                <p className="text-xs text-slate-500">{nutritionTabs.length} guides</p>
              </div>
              <label htmlFor="nutrition-topic-select" className="sr-only">
                Choose a nutrition topic
              </label>
              <div className="relative mt-3">
                <select
                  id="nutrition-topic-select"
                  value={activeTab}
                  onChange={(event) => handleTabChange(event.target.value)}
                  className="min-h-[52px] w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-base font-semibold text-slate-900 shadow-inner outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                >
                  {nutritionTabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500"
                >
                  ▼
                </span>
              </div>
              <div className="mt-4 rounded-2xl bg-teal/8 px-4 py-4">
                <p className="text-base font-semibold text-slate-900">{activeTabMeta.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{activeTabMeta.summary}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 hidden border-b md:block">
            <ScrollArea className="w-full">
              <TabsList className="h-auto w-max justify-start bg-transparent p-0">
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
