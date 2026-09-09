import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LiveLoudHatForm from '@/components/hat/LiveLoudHatForm';

const submitLiveLoudHatRequest = vi.fn();
const recordFormLead = vi.fn();

vi.mock('@/lib/liveLoudHatForm', () => ({
  submitLiveLoudHatRequest: (...args: unknown[]) => submitLiveLoudHatRequest(...args),
}));

vi.mock('@/lib/ga4', async () => {
  const actual = await vi.importActual<typeof import('@/lib/ga4')>('@/lib/ga4');
  return {
    ...actual,
    recordFormLead: (...args: unknown[]) => recordFormLead(...args),
  };
});

describe('LiveLoudHatForm', () => {
  beforeEach(() => {
    submitLiveLoudHatRequest.mockReset();
    recordFormLead.mockReset();
  });

  it('submits the waitlist fields and shows a success state', async () => {
    const user = userEvent.setup();
    submitLiveLoudHatRequest.mockResolvedValue({ ok: true });

    render(<LiveLoudHatForm />);

    await user.type(screen.getByLabelText('Name'), 'Jordan');
    await user.type(screen.getByLabelText('Email'), 'jordan@example.com');
    await user.type(screen.getByLabelText(/Phone/), '555-0100');
    await user.type(screen.getByLabelText(/City/), 'Santa Cruz');
    await user.type(
      screen.getByLabelText('Why you, or how you found Rebellious Aging'),
      'A neighbor asked about the green hat.'
    );
    await user.type(screen.getByLabelText(/Size note/), 'Usually a medium');
    await user.click(screen.getByRole('button', { name: 'Request the next batch' }));

    await waitFor(() => {
      expect(submitLiveLoudHatRequest).toHaveBeenCalledWith({
        name: 'Jordan',
        email: 'jordan@example.com',
        phone: '555-0100',
        city: 'Santa Cruz',
        why: 'A neighbor asked about the green hat.',
        sizeNote: 'Usually a medium',
        gotcha: '',
      });
    });

    expect(await screen.findByRole('status')).toHaveTextContent(/Suz has your request/i);
    expect(recordFormLead).toHaveBeenCalledWith(
      expect.objectContaining({
        form_id: 'live_loud_hat',
        lead_source: 'website_hat_waitlist_form',
      })
    );
  });

  it('keeps the form visible when Formspree returns an error', async () => {
    const user = userEvent.setup();
    submitLiveLoudHatRequest.mockResolvedValue({
      ok: false,
      message: 'Form not found',
    });

    render(<LiveLoudHatForm />);

    await user.type(screen.getByLabelText('Name'), 'Jordan');
    await user.type(screen.getByLabelText('Email'), 'jordan@example.com');
    await user.type(
      screen.getByLabelText('Why you, or how you found Rebellious Aging'),
      'Found you on Facebook.'
    );
    await user.click(screen.getByRole('button', { name: 'Request the next batch' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Form not found');
    expect(screen.getByRole('button', { name: 'Request the next batch' })).toBeEnabled();
    expect(recordFormLead).not.toHaveBeenCalled();
  });
});
