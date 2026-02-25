'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ConnectCTA from '@/components/common/ConnectCTA';
import { Sparkles, Users, Heart, Leaf, MessageCircle, Laugh } from 'lucide-react';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const highlightCards = [
  {
    icon: Sparkles,
    title: 'Rooted in Rebellious Aging',
    description: 'The Facebook circle is where the pillars of vibrant health, confident living, and authentic style come to life through daily conversations.',
  },
  {
    icon: Users,
    title: 'A Safe, Curated Community',
    description: 'Membership questions help keep the group intentional, welcoming, and supportive so every woman can share freely.',
  },
  {
    icon: Heart,
    title: 'Guided by Suz',
    description: 'Suz shares real stories, plant-powered experiments, confidence wins, setbacks, and the science that sparked her transformation.',
  },
];

const insideHighlights = [
  'Conversations on adding more plants to your plate without overwhelm.',
  'Real talk about confidence, mindset, and letting your inner sparkle show up daily.',
  'Style inspiration, mindset resets, and practical tips from women who are living loudly.',
  'Friendship, encouragement, and accountability from rebels who get it.',
];

const FacebookGroup = () => {
  const seoConfig = getSeoRouteByPath('/facebook-group');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal/5 to-white pt-24">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 text-teal px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
              Private Facebook Community
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Join the Rebellious Aging Circle
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Aging boldly is an art, and it is better with friends. Step into a private space for women 55-105 to explore vibrant health, unshakable confidence, and unapologetic style together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-teal text-white hover:bg-teal-dark min-w-[220px]"
              >
                <a
                  href={FACEBOOK_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleFacebookGroupNavigation}
                >
                  Join the Private Group
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[220px]">
                <Link href="/our-story">
                  Visit Our Story
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Come as you are. Leave inspired.
            </p>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="grid gap-8 md:grid-cols-3">
              {highlightCards.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white border border-teal/15 rounded-xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 text-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-teal/10 to-coral/10 border border-teal/20 rounded-2xl p-8 sm:p-10 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
                Why the Circle Matters
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Together we will redefine aging, one laugh, one plant-based meal, one confidence boost, and one bright sparkle at a time. This is our place to be healthy, bold, authentic, confident, to dream big, and to live loud.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Suz will share what she is learning, including the science of plant-strong living, lessons in confidence, and even her love for bling. In return, the community thrives on what you bring: your stories, your curiosity, and your willingness to encourage others.
              </p>
              <p className="font-semibold text-teal-700">
                We are better together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the circle */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-[1.2fr,1fr] items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Inside the Rebellious Aging Circle
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Looking for a place to connect with women who are redefining aging with joy, style, and plant-powered vitality? The circle brings the Rebellious Aging mission off the page and into daily life.
              </p>
              <ul className="space-y-4">
                {insideHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="mt-1 inline-flex items-center justify-center rounded-full bg-teal/15 p-1.5 text-teal">
                      <Leaf className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-teal/15 rounded-2xl shadow-sm p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">How the Group Feels</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>This private community is an intentional extension of the Rebellious Aging site. Think of it as the cozy living room where the movement gathers between blog posts, videos, and email updates.</p>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-teal mt-1" />
                  <p>Expect open conversations, thoughtful questions, and generous listening. Every member matters, and every story helps someone else feel seen.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Laugh className="h-5 w-5 text-teal mt-1" />
                  <p>Laughs, plant-based swaps, sparkle stories, and tiny wins are celebrated here. Your journey is the curriculum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join steps */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Click "Join Group" and answer the quick questions so we can welcome you in with intention. Your seat at the rebel table is waiting.
            </p>
            <div className="grid gap-6 sm:grid-cols-3 text-left">
              {[
                {
                  step: '01',
                  title: 'Tap Join Group',
                  description: 'Use the button below to open the private Facebook community in a new tab.',
                },
                {
                  step: '02',
                  title: 'Answer a Few Questions',
                  description: 'Share a bit about yourself so we can keep the space aligned with our mission.',
                },
                {
                  step: '03',
                  title: 'Settle In and Share',
                  description: 'Introduce yourself, explore the posts, and jump into the conversation.',
                },
              ].map(({ step, title, description }) => (
                <div key={step} className="border border-teal/15 rounded-xl p-6 space-y-3 bg-teal/5">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">{step}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="bg-teal text-white hover:bg-teal-dark"
            >
              <a
                href={FACEBOOK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFacebookGroupNavigation}
              >
                Join the Private Facebook Group
              </a>
            </Button>
            <p className="text-sm text-gray-500">
              Not ready to jump in yet? Stay in touch at{' '}
              <a
                href="https://rebelwithsuz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal font-semibold underline decoration-2 underline-offset-4"
              >
                rebelwithsuz.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <ConnectCTA />
    </div>
  );
};

export default FacebookGroup;
