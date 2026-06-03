export const communityEventsInfo = {
  title: 'Community Events',
  description:
    'Suz hosts live Zoom gatherings for the Rebellious Aging community. The next one is open — sign up below and tell us when works best, and we will schedule it for the time that suits the most people. Free for members of our private Facebook group, where the meeting link is shared.',
};

export interface NextEvent {
  title: string;
  tagline: string;
  description: string;
  /** How it is hosted, e.g. "Live on Zoom". */
  format: string;
  /** Rough length, e.g. "About 60 minutes". */
  durationLabel: string;
  /** Who is hosting. */
  host: string;
  /** A few bullet points covering what happens in the session. */
  agenda: string[];
}

/** The single upcoming event. Date is intentionally TBD — set by community availability. */
export const nextEvent: NextEvent = {
  title: 'Rebellious Aging Live: Community Zoom Gathering',
  tagline: 'Our next live get-together — connection, encouragement, and a little mischief.',
  description:
    "Suz opens the floor for a warm community get-together on Zoom: what's working, what's hard, and what we're celebrating. Bring a cup of tea, a friendly face, and any questions you've been sitting on. Cameras optional, warmth required.",
  format: 'Live on Zoom',
  durationLabel: 'About 60 minutes',
  host: 'Suz',
  agenda: [
    'Warm welcome and community check-in',
    'A short rebellious-aging theme to spark conversation',
    'Open discussion and group Q&A',
  ],
};

export interface TimePreferenceOption {
  id: string;
  label: string;
}

export interface TimePreferenceGroup {
  id: string;
  /** Question shown above the choices. */
  label: string;
  options: TimePreferenceOption[];
}

/** Choices in the sign-up form for "when is most convenient" — used while the date is TBD. */
export const timePreferenceGroups: TimePreferenceGroup[] = [
  {
    id: 'days',
    label: 'Which days work best?',
    options: [
      { id: 'weekdays', label: 'Weekdays' },
      { id: 'weekends', label: 'Weekends' },
    ],
  },
  {
    id: 'times',
    label: 'What time of day suits you? (Pacific Time)',
    options: [
      { id: 'morning', label: 'Mornings' },
      { id: 'afternoon', label: 'Afternoons' },
      { id: 'evening', label: 'Evenings' },
    ],
  },
];
