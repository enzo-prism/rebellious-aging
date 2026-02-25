import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => (
  <section className="px-4 pt-6">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-teal/20 shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
        <div className="text-4xl" aria-hidden="true">
          💚
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-teal-600 font-semibold mb-2">
            Welcome, Rebel
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            This isn&apos;t your grandma&apos;s aging club.
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          It&apos;s a safe, supportive space for women 55-105 to eat vibrantly, speak boldly, and live loudly.
          Start with Suz&apos;s welcome letter or dive right into the pillars that call your name.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-teal text-white hover:bg-teal-dark">
            <Link href="/welcome-letter">Read the Welcome Letter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/our-story">Discover Our Story</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default WelcomeBanner;
