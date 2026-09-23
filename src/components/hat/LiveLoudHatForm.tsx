'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { hatChoiceLabels, hatImageSrcSet, hatStyles, type HatChoice, type HatImage } from '@/data/hats';
import { hatWaitlistFormLeadParams, locationFromPathname, recordFormLead } from '@/lib/ga4';
import { submitLiveLoudHatRequest } from '@/lib/liveLoudHatForm';
import { cn } from '@/lib/utils';

interface LiveLoudHatFormProps {
  hatChoice?: HatChoice | null;
  onHatChoiceChange?: (choice: HatChoice) => void;
}

const hatOptions: Array<{ id: HatChoice; label: string; hint: string; images: HatImage[] }> = [
  ...hatStyles.map((style) => ({
    id: style.id,
    label: hatChoiceLabels[style.id],
    hint: style.tagline,
    images: [style.image],
  })),
  {
    id: 'either',
    label: hatChoiceLabels.either,
    hint: 'Happy with whichever',
    images: hatStyles.map((style) => style.image),
  },
];

const LiveLoudHatForm = ({ hatChoice, onHatChoiceChange }: LiveLoudHatFormProps) => {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [localChoice, setLocalChoice] = React.useState<HatChoice | null>(null);
  const selectedChoice = hatChoice === undefined ? localChoice : hatChoice;
  const [submittedChoice, setSubmittedChoice] = React.useState<HatChoice | null>(null);

  const selectChoice = (choice: HatChoice) => {
    setLocalChoice(choice);
    onHatChoiceChange?.(choice);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const choice = (selectedChoice ?? undefined) as HatChoice | undefined;

    setStatus('submitting');
    setErrorMessage('');

    const result = await submitLiveLoudHatRequest({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      why: String(data.get('why') ?? '').trim(),
      sizeNote: String(data.get('sizeNote') ?? '').trim(),
      hatChoice: choice,
      gotcha: String(data.get('_gotcha') ?? ''),
    });

    if (result.ok === false) {
      setStatus('error');
      setErrorMessage(result.message);
      return;
    }

    form.reset();
    setSubmittedChoice(choice ?? null);
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
        {submittedChoice ? (
          <p className="mt-3 font-medium text-gray-900">
            You asked for: <span className="text-teal">{hatChoiceLabels[submittedChoice]}</span>
          </p>
        ) : null}
        <p className="mt-3 leading-relaxed text-gray-700">
          Suz reads every note and chooses who gets the next small batch. If a hat has your name
          on it, we&apos;ll email you. Nothing to pay, nothing else to do.
        </p>
      </div>
    );
  }

  return (
    <form
      id="hat-request-form"
      onSubmit={handleSubmit}
      className="flex h-full scroll-mt-28 flex-col rounded-[2rem] border border-teal/20 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900">Ask for a hat</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Pick a style, then tell Suz a little about you. She reads every request herself.
      </p>

      <div className="mt-6 space-y-5">
        <fieldset>
          <legend className="text-sm font-medium leading-none">Which hat would you like?</legend>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {hatOptions.map((option) => {
              const checked = selectedChoice === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    'relative flex cursor-pointer flex-col items-center rounded-2xl border-2 bg-[#faf7f1] p-2 text-center transition-colors focus-within:ring-2 focus-within:ring-teal focus-within:ring-offset-2 sm:p-3',
                    checked ? 'border-teal bg-teal/5' : 'border-transparent hover:border-teal/40'
                  )}
                >
                  <input
                    type="radio"
                    name="hatChoice"
                    value={option.id}
                    checked={checked}
                    onChange={() => selectChoice(option.id)}
                    required
                    // Transparent but covering the whole card, so taps land on the real input
                    // and the browser's "please select" bubble points at the picker.
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-2xl opacity-0"
                  />
                  <span className="flex h-16 items-end justify-center sm:h-20" aria-hidden="true">
                    {option.images.map((image, index) => (
                      <img
                        key={image.small}
                        src={image.small}
                        srcSet={hatImageSrcSet(image)}
                        sizes="80px"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          'h-full w-auto object-contain drop-shadow-md',
                          option.images.length > 1 && 'h-[85%]',
                          option.images.length > 1 && index > 0 && '-ml-3'
                        )}
                      />
                    ))}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-gray-900">{option.label}</span>
                  <span className="text-xs leading-snug text-gray-600">{option.hint}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

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
            maxLength={1900}
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
        Nothing to pay to join the list. Suz picks who gets one when the next batch is ready.
      </p>
    </form>
  );
};

export default LiveLoudHatForm;
