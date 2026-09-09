import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LIVE_LOUD_HAT_FORMSPREE_ENDPOINT } from '@/lib/constants';
import { submitLiveLoudHatRequest } from '@/lib/liveLoudHatForm';

describe('submitLiveLoudHatRequest', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts named fields to the Formspree hat endpoint', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const result = await submitLiveLoudHatRequest({
      name: 'Jordan',
      email: 'jordan@example.com',
      phone: '555-0100',
      city: 'Santa Cruz',
      why: 'A neighbor asked about the green hat.',
      sizeNote: 'Usually a medium',
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      LIVE_LOUD_HAT_FORMSPREE_ENDPOINT,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
    );

    const body = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body));
    expect(body).toMatchObject({
      name: 'Jordan',
      email: 'jordan@example.com',
      phone: '555-0100',
      city: 'Santa Cruz',
      why: 'A neighbor asked about the green hat.',
      sizeNote: 'Usually a medium',
      _subject: 'Live Loud hat waitlist request',
    });
  });

  it('returns Formspree error copy when the request fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Form not found' }),
    });

    await expect(
      submitLiveLoudHatRequest({
        name: 'Jordan',
        email: 'jordan@example.com',
        why: 'Found you on Facebook.',
      })
    ).resolves.toEqual({ ok: false, message: 'Form not found' });
  });
});
