'use client';

import React from 'react';
import { CalendarClock, CheckCircle2, Clock, PartyPopper, Users, Video } from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import { FacebookGroupButton, FacebookLogoMark } from '@/components/common/FacebookGroupCta';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { communityEventsInfo, nextEvent, timePreferenceGroups } from '@/data/communityEvents';
import { buildOrganizationJsonLd } from '@/lib/structuredData';

const joinSteps = [
  {
    title: 'Join our private Facebook group',
    description:
      'Every event lives inside the Rebellious Aging community on Facebook. Membership is free — just answer a couple of quick questions to be approved.',
  },
  {
    title: 'Sign up and pick your times',
    description:
      'Fill out the short form and let us know which days and times work for you. The more responses we get, the better we can choose a slot that suits everyone.',
  },
  {
    title: 'Watch for the date in the group',
    description:
      'Once a time is locked in, Suz posts the date and the Zoom link in the group. Your group membership is your invitation — no separate ticket needed.',
  },
];

const SignupForm = () => {
  const [submitted, setSubmitted] = React.useState(false);

  // Front-end only for now — submission is wired to a backend later.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-teal/20 bg-white p-8 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <PartyPopper className="h-7 w-7 text-teal" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900">You&apos;re on the list!</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-gray-700">
          Thanks for letting us know when works for you. We&apos;ll pick a time that suits the most rebels and share
          the date and Zoom link in the Facebook group.
        </p>
        <FacebookGroupButton variant="primary" size="md" className="mt-6">
          Join the Facebook Group
        </FacebookGroupButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-[2rem] border border-teal/20 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900">Save your spot</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        The date is open on purpose — tell us when works and we&apos;ll schedule it for the time that suits the most
        people.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="event-name">First name</Label>
          <Input id="event-name" name="name" autoComplete="given-name" placeholder="Your first name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-email">Email</Label>
          <Input
            id="event-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        {timePreferenceGroups.map((group) => (
          <fieldset key={group.id} className="space-y-3">
            <legend className="text-sm font-semibold text-gray-900">{group.label}</legend>
            <div className="flex flex-wrap gap-3">
              {group.options.map((option) => {
                const inputId = `pref-${group.id}-${option.id}`;
                return (
                  <Label
                    key={option.id}
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-teal/40 hover:bg-teal/5"
                  >
                    <Checkbox id={inputId} name={`preference-${group.id}`} value={option.id} />
                    {option.label}
                  </Label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="space-y-2">
          <Label htmlFor="event-note">Anything you&apos;d love Suz to cover? (optional)</Label>
          <Textarea
            id="event-note"
            name="note"
            rows={3}
            placeholder="A topic, a question, or just say hi"
          />
        </div>

        <label
          htmlFor="event-fb-member"
          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#0866ff]/20 bg-[#0866ff]/5 p-4"
        >
          <Checkbox id="event-fb-member" name="facebookMember" className="mt-0.5" />
          <span className="text-sm leading-relaxed text-gray-700">
            I&apos;m a member of the Rebellious Aging Facebook group (required to join the call).
            <span className="mt-2 block">
              <FacebookGroupButton variant="soft" size="sm" showArrow={false}>
                Not yet? Join the group
              </FacebookGroupButton>
            </span>
          </span>
        </label>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full bg-teal text-white hover:bg-teal-dark" size="lg">
          Save my spot
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          We&apos;ll share the final time and Zoom link in the Facebook group.
        </p>
      </div>
    </form>
  );
};

const Events = () => {
  const seoConfig = getSeoRouteByPath('/events');

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
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Hero */}
          <section className="rounded-[2rem] border border-teal/20 bg-white/90 px-6 py-8 shadow-sm md:px-10 md:py-12">
            <PageTopUtilityRow>
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
                  <Video className="h-4 w-4" />
                  Live Zoom gatherings for our community
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Community Events</p>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    Show up, connect, and age boldly together
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-gray-700">
                    {communityEventsInfo.description}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#0866ff]/20 bg-gradient-to-br from-[#0866ff]/10 via-white to-teal/10 p-6">
                <div className="flex items-center gap-3">
                  <FacebookLogoMark size="md" />
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0548b8]">Members only</p>
                </div>
                <p className="mt-4 leading-relaxed text-gray-700">
                  These calls are free, but they happen inside our private Facebook group — that is where the Zoom link
                  is posted. Join the circle and you are in.
                </p>
                <FacebookGroupButton variant="primary" size="lg" className="mt-5 w-full">
                  Join the Facebook Group
                </FacebookGroupButton>
              </div>
            </div>
          </section>

          {/* Next event + signup */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Event card */}
            <article className="flex flex-col rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                  <Video className="h-3.5 w-3.5" />
                  {nextEvent.format}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-coral">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Date TBD
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal">The next gathering</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{nextEvent.title}</h2>
              <p className="mt-2 font-medium text-teal">{nextEvent.tagline}</p>
              <p className="mt-3 leading-relaxed text-gray-700">{nextEvent.description}</p>

              <div className="mt-5 grid gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-teal" />
                  <span>To be scheduled — you help pick the time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal" />
                  <span>{nextEvent.durationLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal" />
                  <span>Hosted by {nextEvent.host}</span>
                </div>
              </div>

              {nextEvent.agenda.length > 0 && (
                <div className="mt-5 rounded-2xl border border-teal/15 bg-teal/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">What we&apos;ll do</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {nextEvent.agenda.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-5 text-sm text-gray-600">
                Sign up on the right and the Zoom link will be shared with members in the Facebook group once the date
                is set.
              </p>
            </article>

            {/* Signup form */}
            <SignupForm />
          </section>

          {/* How to join */}
          <section className="rounded-[2rem] border border-teal/20 bg-white/90 px-6 py-8 shadow-sm md:px-10 md:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">How it works</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">Three simple steps</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {joinSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-base font-bold text-teal">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center text-sm text-muted-foreground">
            Times are shown in Pacific Time. Sessions are hosted on Zoom and shared inside the community group.
          </div>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default Events;
