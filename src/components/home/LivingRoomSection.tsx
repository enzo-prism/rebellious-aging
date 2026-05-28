import React from 'react';
import { Button } from '@/components/ui/button';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';

const sensoryDetails = [
  { emoji: '🫖', text: 'The teapot is always whistling.' },
  { emoji: '🔥', text: 'The fire is crackling and warm.' },
  { emoji: '💛', text: 'The company is amazing.' },
] as const;

const houseRules = [
  { text: 'No perfection required.', emphatic: false },
  { text: 'No judgment allowed.', emphatic: false },
  { text: 'Just real women walking one another home.', emphatic: true },
] as const;

const LivingRoomSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-coral/10 via-coral/5 to-teal/5 section-padding">
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-coral/15 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
    />

    <div className="container mx-auto container-padding relative">
      <div className="max-w-3xl mx-auto text-center">
        <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-coral">
          BUT
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          The real gathering place is our private Facebook community.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
          This is my cozy, safe living room &mdash; where fabulous women come together to share stories,
          encourage and support one another, laugh, learn, and grow.
        </p>
      </div>

      <div className="mt-10 lg:mt-14 grid gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
        {sensoryDetails.map(({ emoji, text }) => (
          <div
            key={text}
            className="group card-lift-coral rounded-3xl border border-coral/20 bg-white/80 backdrop-blur-sm p-6 text-center shadow-sm"
          >
            <div className="icon-pop mx-auto w-fit text-4xl mb-3" aria-hidden>
              {emoji}
            </div>
            <p className="text-lg font-medium text-gray-800">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 lg:mt-14 max-w-3xl mx-auto text-center space-y-7">
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          And a huge welcome is waiting just for you.{' '}
          <span className="font-semibold text-gray-900">All ladies 55&ndash;105 are welcome here.</span>
        </p>

        <div className="flex flex-col items-center gap-2">
          {houseRules.map(({ text, emphatic }) => (
            <p
              key={text}
              className={
                emphatic
                  ? 'text-lg md:text-xl font-semibold italic text-teal'
                  : 'text-base md:text-lg font-semibold text-teal'
              }
            >
              {text}
            </p>
          ))}
        </div>

        <div className="pt-1">
          <Button
            asChild
            size="lg"
            className="bg-coral text-white hover:bg-coral-dark shadow-lg text-base font-semibold px-8 min-h-[44px]"
          >
            <a
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFacebookGroupNavigation}
              className="group"
            >
              Join Right Here <span className="arrow-nudge">&rarr;</span>
            </a>
          </Button>
        </div>

        <div className="pt-4">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">Pull up a chair.</p>
          <p className="mt-2 text-lg text-gray-600">We saved a spot for you.</p>
        </div>
      </div>
    </div>
  </section>
);

export default LivingRoomSection;
