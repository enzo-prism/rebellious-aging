import React from 'react';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { buildOrganizationJsonLd } from '@/lib/structuredData';

const starterPrinciples = [
  {
    title: 'Nibble',
    description: 'How you choose to nourish your body.',
  },
  {
    title: 'Wiggle',
    description: 'How you lovingly move your body.',
  },
  {
    title: 'Dazzle',
    description: 'How you express your confidence and presence.',
  },
  {
    title: 'Gratefulness',
    description: 'How you remember what is still good and powerful.',
  },
];

const startingPoints = [
  {
    title: 'Nibble',
    description: 'Add one plant to your plate today.',
  },
  {
    title: 'Wiggle',
    description: 'Move your body for 5 gentle minutes today.',
  },
  {
    title: 'Dazzle',
    description: 'Do one small thing that makes you feel like yourself.',
  },
  {
    title: 'Gratefulness',
    description: 'Name one thing that was good today.',
  },
];

const StarterKit = () => {
  const seoConfig = getSeoRouteByPath('/starter-kit');

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal/10 via-white to-coral/5 py-12">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={buildOrganizationJsonLd()}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-teal font-semibold">Starter Kit</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Rebellious Aging Starter Kit
            </h1>
            <p className="text-lg text-gray-700 mt-3">For Women 55-105</p>
            <p className="text-xl font-semibold text-coral mt-4">Nibble. Wiggle. Dazzle. Be Grateful.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10">
            <section className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <p className="text-xl font-semibold text-gray-900">
                Welcome to Rebellious Aging, I am so happy you stopped by.
              </p>
              <p>
                Out of all the places you could have landed today, you landed here, I don't think that is by accident. Something in
                you was curious. Or hopeful. Or maybe just a little tired of being told who you should be at a certain age.
              </p>
              <p>Wherever you are today, steady or unsure, energized or weary, you are welcome exactly as you are.</p>
            </section>

            <section className="rounded-xl border border-teal/20 bg-teal/5 p-6 space-y-3 text-gray-700 text-base md:text-lg">
              <p>You don't need to change to be here.</p>
              <p>You don't need to fix yourself to be here.</p>
              <p>You don't need to prove anything.</p>
              <p>You don't need to be ready.</p>
            </section>

            <section className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Rebellious Aging isn't about fighting or pushing or proving. It is about something much quieter and much braver, it's
                about yourself again. Choosing to care about how you feel in your body. Choosing to listen to your own voice. Choosing
                to believe this season of life can still be rich with good health, confidence, curiosity, joy and a whole load of
                gratitude.
              </p>

              <div className="space-y-3">
                <p>I created Rebellious Aging for women like YOU, and for women like me.</p>
                <ul className="space-y-1 font-semibold text-gray-900">
                  <li>Women who have lived.</li>
                  <li>Women who have learned.</li>
                  <li>Women who are not finished.</li>
                </ul>
              </div>

              <p>
                You might be here because you are thinking about your health, your purpose, or simply wondering &quot;What is next for
                me?&quot; The thing is you don't need all the answers today. All you need today is a tiny willingness to be kind to
                yourself and see what is possible.
              </p>
              <p>
                Everything in this starter kit is offered gently, nothing to force, nothing to perform. Take what serves you. Leave
                what doesn't. You are the expert on your own life.
              </p>
              <p>
                If at any point you feel quiet recognition, &quot;Oh this feels like it is for me&quot;, then know this. It is.
              </p>
              <div className="rounded-lg border border-coral/20 bg-coral/5 p-5 text-gray-700">
                <p className="font-semibold text-coral">One heart at a time. That is how this adventure will grow.</p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Rebellious Aging Really Means</h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Rebellious Aging is not loud. It doesn't shout. It doesn't actively protest. It doesn't try to prove anything.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  It is instead a quiet decision you make, sometimes in the smallest moments, to live from choice instead of habit,
                  from kindness instead of criticism, from possibility instead of limitation.
                </p>
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Now you get to care for yourself. Not later. Not when everything else is handled. NOW.
                </p>
              </div>

              <div className="rounded-2xl border border-teal/20 bg-teal/5 p-6 space-y-4">
                <p className="text-lg font-semibold text-teal">Nibble. Wiggle. Dazzle. Gratefulness.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {starterPrinciples.map((item) => (
                    <div key={item.title} className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 text-base md:text-lg">
                  These are not tasks to master. They are simply places to begin.
                </p>
              </div>
            </section>

            <section className="space-y-6 text-gray-700 text-base md:text-lg">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Tiny Starting Points</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {startingPoints.map((item) => (
                    <div key={item.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-semibold text-teal">One small choice, one gentle step, one grateful heart.</p>
              <p>
                And so, my fabulous Rebel, this is not the end. It is simply your beginning. You don't need to rush. You don't need to
                be perfect. YOU only need to be willing. There will always be room for you here. The light is on, the kettle is
                warm. Your next beautiful chapter is waiting.
              </p>
              <p className="text-teal font-semibold">Suz</p>
            </section>
          </div>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default StarterKit;
