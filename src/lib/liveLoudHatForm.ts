import { LIVE_LOUD_HAT_FORMSPREE_ENDPOINT } from '@/lib/constants';

export type LiveLoudHatRequest = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  why: string;
  sizeNote?: string;
  gotcha?: string;
};

export type LiveLoudHatSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

const readFormspreeError = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as {
      error?: string;
      errors?: Array<{ message?: string }>;
    };
    if (typeof payload.error === 'string' && payload.error.trim()) {
      return payload.error;
    }
    const first = payload.errors?.find((item) => typeof item.message === 'string')?.message;
    if (first?.trim()) {
      return first;
    }
  } catch {
    // Fall through to the generic message when Formspree returns non-JSON.
  }

  return 'Something went sideways. Please try again in a moment.';
};

export async function submitLiveLoudHatRequest(
  payload: LiveLoudHatRequest
): Promise<LiveLoudHatSubmitResult> {
  const response = await fetch(LIVE_LOUD_HAT_FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? '',
      city: payload.city ?? '',
      why: payload.why,
      sizeNote: payload.sizeNote ?? '',
      _subject: 'Live Loud hat waitlist request',
      _gotcha: payload.gotcha ?? '',
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  return { ok: false, message: await readFormspreeError(response) };
}
