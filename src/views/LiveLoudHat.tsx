'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, Check, Mail, PenLine, Sparkles, Shirt } from 'lucide-react';

import HatPhoto from '@/components/hat/HatPhoto';
import LiveLoudHatForm from '@/components/hat/LiveLoudHatForm';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { hatPairImage, hatStyles, isHatChoice, type HatChoice } from '@/data/hats';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const steps = [
  {
    icon: Shirt,
    title: 'Pick your hat',
    body: 'Live Loud! in green script, the R with its butterfly, or tell us either one makes you happy.',
  },
  {
    icon: PenLine,
    title: 'Send Suz a short note',
    body: 'Who you are and why you want one, or how you found Rebellious Aging. A few honest sentences are plenty.',
  },
  {
    icon: Mail,
    title: 'Suz picks the next batch',
    body: 'She reads every request herself. If you are in the next round, we will email you. Nothing to pay to ask.',
  },
];

const faqs = [
  {
    question: 'Can I just buy one?',
    answer:
      'Not right now. The hats are not sold in a shop. They are made in small batches, and this request list is how Suz decides who gets the next ones.',
  },
  {
    question: 'Does it cost anything to ask?',
    answer: 'No. There is nothing to pay to join the list.',
  },
  {
    question: 'What is the difference between the two hats?',
    answer:
      'Only the front. Both are black caps with embroidery: one says “Live Loud!” in bright green script, the other has the white Rebellious Aging R with a butterfly on top.',
  },
  {
    question: 'What if I have a size preference?',
    answer: 'Add a size note to your request and Suz will see it with everything else.',
  },
];

const scrollToRequest = () => {
  document.getElementById('hat-request-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const LiveLoudHat = () => {
  const seoConfig = getSeoRouteByPath('/live-loud-hat');
  const [hatChoice, setHatChoice] = React.useState<HatChoice | null>(null);

  // Allow links like /live-loud-hat?hat=r-butterfly to preselect a style.
  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('hat');
    if (isHatChoice(requested)) {
      setHatChoice(requested);
    }
  }, []);

  const requestHat = (choice: HatChoice) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setHatChoice(choice);
    scrollToRequest();
  };

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
          {/* DOM order is headline → photo → copy so phones see the hats right under the
              headline; on desktop the photo spans the right column. */}
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:grid-rows-[auto,1fr] lg:gap-x-14 lg:gap-y-6">
            <div className="space-y-4 sm:space-y-6 lg:col-start-1 lg:row-start-1">
              <PageTopUtilityRow className="mb-0 flex-wrap items-center justify-between gap-3 sm:mb-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-teal shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Invite-only waitlist
                </div>
                <PageShareButton />
              </PageTopUtilityRow>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                The Rebellious Aging hats
              </h1>
            </div>

            <figure className="space-y-3 sm:space-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
              <HatPhoto
                image={hatPairImage}
                sizes="(min-width: 1024px) 560px, 92vw"
                priority
                className="aspect-[4/3] border border-[#e8dfcd] px-4 pb-6 pt-8 shadow-sm sm:px-8"
              />
              <figcaption className="grid grid-cols-2 gap-3 text-center text-sm">
                {hatStyles.map((style) => (
                  <span key={style.id} className="rounded-2xl bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-teal/15">
                    {style.shortName}
                    <span className="block text-xs font-normal text-gray-600">{style.tagline}</span>
                  </span>
                ))}
              </figcaption>
            </figure>

            <div className="space-y-6 lg:col-start-1 lg:row-start-2 lg:self-start">
              <p className="max-w-xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                Two black caps, embroidered in small batches: <strong className="font-semibold text-gray-900">Live Loud!</strong>{' '}
                in bright green script, and the <strong className="font-semibold text-gray-900">Rebellious Aging R</strong>{' '}
                with its butterfly.
              </p>
              <p className="max-w-xl leading-relaxed text-gray-700">
                They are not sold in a shop. Pick the one you love, send Suz a short note, and she
                chooses who gets the next batch.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-12">
                  <a href="#request">Request a hat</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-h-12">
                  <a href="#styles">
                    See both hats up close
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="styles" className="scroll-mt-28 bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">Two styles</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Which one sounds like you?</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Same black cap, two different ways to say it. These photos are the real hats, so what
                you see is what you get.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {hatStyles.map((style) => (
                <article
                  key={style.id}
                  className="flex flex-col overflow-hidden rounded-[2rem] border border-teal/15 bg-[#fbfaf7] shadow-sm"
                >
                  <HatPhoto
                    image={style.image}
                    sizes="(min-width: 768px) 520px, 92vw"
                    className="aspect-[5/4] rounded-none px-10 pb-8 pt-10"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">{style.tagline}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{style.name}</h3>
                    <p className="mt-3 leading-relaxed text-gray-700">{style.description}</p>
                    <ul className="mt-5 space-y-2 text-gray-700">
                      {style.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Button asChild className="min-h-12 w-full sm:w-auto">
                        <a href="#hat-request-form" onClick={requestHat(style.id)}>
                          Request {style.requestName}
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">A request list, not a checkout</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-teal/15 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                      {index + 1}
                    </span>
                    <step.icon className="h-5 w-5 text-teal" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-700">{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl bg-teal px-6 py-6 text-white sm:px-8">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold">Why a waitlist?</span> About twenty hats went to Suz’s
                support crew first, the people who said yes before there was a plan. Then neighbors
                kept stopping her on walks to ask where to get one. This list is how the next batch
                gets shared.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-28 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">Request</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ask for the next batch</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                It takes about a minute. There is no cart and no payment, just a short note to Suz.
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Which hat you would like (or either one)',
                  'Name and email so we can find you',
                  'A few sentences on why, or how you found this community',
                  'Optional: phone, city, or a size note',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="leading-relaxed text-gray-700">
                If you are in the next round, we may ask later for a photo of you wearing it. Totally
                optional, whenever you are ready.
              </p>
            </div>
            <LiveLoudHatForm hatChoice={hatChoice} onHatChoiceChange={setHatChoice} />
          </div>
        </div>
      </section>

      <section className="border-t border-teal/10 bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900">Hat questions</h2>
            <dl className="mt-8 divide-y divide-teal/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="text-lg font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed text-gray-700">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-gray-600">
              Looking for recipes, stories, or the Facebook circle instead?{' '}
              <Link href="/" className="font-medium text-teal underline underline-offset-4">
                Start at home
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveLoudHat;
