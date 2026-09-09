'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FacebookLogoMark } from '@/components/common/FacebookGroupCta';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';
import { SUBSTACK_URL } from '@/lib/constants';

const linkGroups = [
  {
    title: 'Explore',
    links: [
      ['/blog', 'Blog'], ['/guides', 'Free Booklets & Guides'], ['/video-series', 'Video Series'],
      ['/pillars/confidence', 'Confidence'], ['/pillars/style', 'Style'],
      ['/pillars/health', 'Health'], ['/pillars/gratitude', 'Gratitude'],
      ['/dr-seuss', 'Dr. Seuss & Aging'],
    ],
  },
  {
    title: 'Plant-based living',
    links: [
      ['/recipes', 'Recipes'], ['/nutrition', 'Nutrition'],
      ['/nutrition?tab=what-is-wfpb', 'What is WFPB?'],
      ['/pillars/health/nutrition-guide', 'Nutrition Guide'],
      ['/pillars/health/resource-guide', 'Resource Guide'],
      ['/nutrition?tab=benefits', 'Benefits'], ['/nutrition?tab=protocol', "Dr. Esselstyn’s Protocol"],
      ['/nutrition?tab=dr-campbell', 'Dr. T. Colin Campbell'], ['/nutrition?tab=foods', 'Why & How'],
      ['/recipes-for-a-better-summer', 'Better Summer Recipes'],
    ],
  },
  {
    title: 'Connect with Suz',
    links: [
      ['/our-story', 'Our Story'], ['/welcome-letter', 'Welcome Letter'],
      ['/live-loud-hat', 'Live Loud Hat'],
      ['/events', 'Community Events'], ['/speaking-events', 'Speaking Events'],
      ['/contact', 'Get in Touch'],
    ],
  },
];

const footerLinkClass = 'inline-flex min-h-11 items-center py-2 text-gray-600 transition-colors hover:text-teal hover:underline';

const Footer = () => (
  <footer className="border-t border-teal/10 bg-[#f6f8f5] pb-8 pt-12 sm:pt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mb-10 flex flex-col gap-6 border-b border-teal/10 pb-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-teal">Rebellious Aging</h2>
          <p className="mt-3 leading-relaxed text-gray-600">A little more confidence. A little more connection. A life that feels like you.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={FACEBOOK_GROUP_URL} target="_blank" rel="noopener noreferrer" onClick={handleFacebookGroupNavigation}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-teal/20 bg-white px-5 font-medium text-teal hover:bg-teal/5">
            <FacebookLogoMark size="xs" />Facebook Group<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="mailto:suz@rebelwithsuz.com" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-teal/20 bg-white text-teal hover:bg-teal/5" aria-label="Email Suz">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
      <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-3">
        {linkGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{group.title}</h3>
            <ul className="grid grid-cols-2 gap-x-5 sm:grid-cols-1">
              {group.links.map(([href, label]) => <li key={href}><Link href={href} className={footerLinkClass}>{label}</Link></li>)}
              {group.title === 'Connect with Suz' && <li><a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className={`${footerLinkClass} gap-1`}>Suz’s newsletter<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></li>}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-10 space-y-4 border-t border-teal/10 pt-6">
        <p className="max-w-4xl text-sm leading-relaxed text-gray-600"><strong>Medical Disclaimer:</strong> The information provided on this website is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making significant changes to your diet or lifestyle.</p>
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Rebellious Aging. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
