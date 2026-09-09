'use client';

import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';

import LiveLoudHatForm from '@/components/hat/LiveLoudHatForm';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const storyBeats = [
  {
    title: 'A first round for the crew',
    body: 'About twenty hats went to the people who showed up early — Suz’s support crew. The ones who said yes before there was a shop, a waitlist, or a plan.',
  },
  {
    title: 'Neighbors keep asking',
    body: 'Then the questions started. On walks. In the community. “Where can I get one?” There is not a storefront for this. There is a next batch, and Suz wants to choose who is in it.',
  },
  {
    title: 'Suz reads every request',
    body: 'This page is an application, not a cart. Tell her why you want one, or how you found Rebellious Aging. She reviews the list and picks the next round herself.',
  },
];

const LiveLoudHat = () => {
  const seoConfig = getSeoRouteByPath('/live-loud-hat');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal/5 to-white">
      {/* Layout already clears the sticky header — extra page pt-* creates a large empty band. */}
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}

      <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-14">
            <div className="space-y-6">
              <PageTopUtilityRow className="mb-2 justify-start">
                <PageShareButton />
              </PageTopUtilityRow>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-teal shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Invite-only waitlist
              </div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                The Live Loud hat
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                A small-batch green cap with <strong className="font-semibold text-teal">Live Loud</strong> on
                the front and the Rebellious Aging R logo on the back. Not for sale. Not a shop. A request
                list Suz reads herself.
              </p>
              <p className="max-w-xl leading-relaxed text-gray-700">
                If you are in the next round, we may ask later for a photo of you wearing it — optional,
                whenever you are ready. No pressure for this first note.
              </p>
              <p className="text-sm text-gray-500">
                Looking for recipes, stories, or the Facebook circle instead?{' '}
                <Link href="/" className="font-medium text-teal underline underline-offset-4">
                  Start at home
                </Link>
                .
              </p>
            </div>

            {/* TODO: Replace this brand-forward placeholder with real Live Loud hat
                photos from the Enzo/RA Shared Album Drive export once it lands.
                Do not invent stock photography of the hat. Expected shots: front
                ("Live Loud" wordmark) and back (Rebellious Aging R + butterfly logo). */}
            <aside
              className="relative overflow-hidden rounded-[2rem] border border-teal/20 bg-gradient-to-br from-teal via-[#0a7a7e] to-teal-dark p-8 text-white shadow-sm sm:p-10"
              aria-label="Brand placeholder for the Live Loud hat"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
              <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-coral/20" aria-hidden="true" />
              <div className="relative space-y-6">
                <div className="inline-flex items-center rounded-2xl bg-white p-3 shadow-sm">
                  <img
                    src="/lovable-uploads/996bea95-9371-4561-b396-1e00f4198ca3.png"
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  Front wordmark
                </p>
                <p className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">LIVE LOUD</p>
                <p className="max-w-sm text-base leading-relaxed text-white/85">
                  Hat photos are coming. Until the shared album lands, this is the mark: teal, rebellious,
                  and meant to be worn out loud.
                </p>
                <p className="text-sm font-medium text-white/75">R logo rides on the back</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {storyBeats.map((beat) => (
              <article
                key={beat.title}
                className="rounded-2xl border border-teal/15 bg-[#f7faf9] p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900">{beat.title}</h2>
                <p className="mt-3 leading-relaxed text-gray-700">{beat.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">Apply</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ask for the next batch</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                There is no cart, no size chart checkout, and no promise of a ship date. There is a
                short note to Suz. That is the whole invitation.
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Name and email so we can find you',
                  'Optional phone or city if that helps',
                  'A few sentences on why — or how you found this community',
                  'A size note if you have one',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <LiveLoudHatForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveLoudHat;
