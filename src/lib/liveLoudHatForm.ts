import { hatChoiceLabels, type HatChoice } from '@/data/hats';
import { LIVE_LOUD_HAT_FORMSPREE_ENDPOINT } from '@/lib/constants';

export type LiveLoudHatRequest = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  why: string;
  sizeNote?: string;
  hatChoice?: HatChoice;
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

// The Formspree form only defines name/email/phone/city/why/sizeNote, so the
// hat choice rides in the subject line and at the top of the note instead of a
// new field Formspree might reject.
export const buildSubject = (hatChoice?: HatChoice) =>
  hatChoice
    ? `Hat request: ${hatChoiceLabels[hatChoice]} (Rebellious Aging hat waitlist)`
    : 'Live Loud hat waitlist request';

const formatWhy = ({ why, hatChoice }: LiveLoudHatRequest) =>
  hatChoice ? `Hat choice: ${hatChoiceLabels[hatChoice]}\n\n${why}` : why;

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
      why: formatWhy(payload),
      sizeNote: payload.sizeNote ?? '',
      _subject: buildSubject(payload.hatChoice),
      _gotcha: payload.gotcha ?? '',
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  return { ok: false, message: await readFormspreeError(response) };
}
