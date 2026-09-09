'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { hatWaitlistFormLeadParams, locationFromPathname, recordFormLead } from '@/lib/ga4';
import { submitLiveLoudHatRequest } from '@/lib/liveLoudHatForm';

const LiveLoudHatForm = () => {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setErrorMessage('');

    const result = await submitLiveLoudHatRequest({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      why: String(data.get('why') ?? '').trim(),
      sizeNote: String(data.get('sizeNote') ?? '').trim(),
      gotcha: String(data.get('_gotcha') ?? ''),
    });

    if (!result.ok) {
      setStatus('error');
      setErrorMessage(result.message);
      return;
    }

    form.reset();
    setStatus('success');
    recordFormLead(hatWaitlistFormLeadParams(locationFromPathname(window.location.pathname)));
  };

  if (status === 'success') {
    return (
      <div
        className="rounded-[2rem] border border-teal/20 bg-white p-6 shadow-sm md:p-8"
        role="status"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">You&apos;re on the list</p>
        <h3 className="mt-3 text-2xl font-bold text-gray-900">Suz has your request</h3>
        <p className="mt-3 leading-relaxed text-gray-700">
          This is an invite-only waitlist, not a checkout. Suz reads every note and chooses who
          gets the next small batch. If a hat has your name on it, you&apos;ll hear from us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-[2rem] border border-teal/20 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900">Ask for a hat</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Tell Suz a little about you. She reviews every request and picks the next round herself.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="hat-name">Name</Label>
          <Input
            id="hat-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hat-email">Email</Label>
          <Input
            id="hat-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hat-phone">
              Phone <span className="font-normal text-gray-500">(optional)</span>
            </Label>
            <Input
              id="hat-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="If it's easier to reach you"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hat-city">
              City <span className="font-normal text-gray-500">(optional)</span>
            </Label>
            <Input
              id="hat-city"
              name="city"
              autoComplete="address-level2"
              placeholder="Where you live loudly"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hat-why">Why you, or how you found Rebellious Aging</Label>
          <Textarea
            id="hat-why"
            name="why"
            required
            minLength={8}
            rows={5}
            placeholder="A neighbor asked. A Facebook post. You just like the vibe. A few honest sentences are plenty."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hat-size">
            Size note <span className="font-normal text-gray-500">(optional)</span>
          </Label>
          <Input
            id="hat-size"
            name="sizeNote"
            placeholder="I usually wear a medium, or I like a looser fit"
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <Label htmlFor="hat-gotcha">Leave this blank</Label>
          <Input id="hat-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === 'error' ? (
        <p className="mt-4 text-sm font-medium text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" className="mt-6 min-h-12" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending your request…' : 'Request the next batch'}
      </Button>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        Not a shop. No charge today. Suz decides who gets one when the next round is ready.
      </p>
    </form>
  );
};

export default LiveLoudHatForm;
