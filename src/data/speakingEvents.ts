export interface SpeakingEventHighlight {
  title: string;
  description: string;
}

export interface SpeakingEventSlideDeck {
  status: 'coming-soon' | 'ready';
  note: string;
  embedUrl?: string;
  downloadUrl?: string;
}

export interface SpeakingEventContent {
  slug: string;
  title: string;
  label: string;
  host: string;
  location: string;
  dateLabel: string;
  summary: string;
  seoDescription: string;
  intro: string[];
  spotlight: string;
  highlights: SpeakingEventHighlight[];
  audienceResponse: string;
  takeaways: string[];
  nextChapter: string;
  slideDeck: SpeakingEventSlideDeck;
  tags: string[];
}

export const speakingEventsInfo = {
  title: 'Speaking Events',
  description:
    'Explore Suz\'s talks, community presentations, and future speaking appearances as Rebellious Aging keeps growing.',
};

export const speakingEvents: SpeakingEventContent[] = [
  {
    slug: 'eat-for-the-earth-santa-cruz',
    title: 'Eat for the Earth',
    label: 'First speaking event',
    host: 'Beth Love',
    location: 'Santa Cruz, California',
    dateLabel: 'January 20',
    summary:
      'Suz\'s first Rebellious Aging speaking event, hosted by Beth Love in Santa Cruz, where she introduced the movement, connected food with personal and planetary care, and read Dr. Seuss to a delighted audience.',
    seoDescription:
      'Revisit Eat for the Earth, Suz\'s first Rebellious Aging speaking event in Santa Cruz, hosted by Beth Love and remembered for its warmth, humor, and Dr. Seuss reading.',
    intro: [
      'Eat for the Earth marked an exciting milestone for Rebellious Aging: Suz\'s first speaking event. Hosted by Beth Love in Santa Cruz, it gave Suz the chance to stand up in front of a live audience and share the heart behind the movement in person.',
      'The event naturally fit the Rebellious Aging message. It created space to talk about nourishing ourselves well, caring for the planet thoughtfully, and approaching aging with honesty, humor, and agency instead of resignation.',
    ],
    spotlight:
      'What made this event especially memorable was the combination of substance and spirit. Suz introduced Rebellious Aging as a lifestyle and mindset, then brought the room to life by reading from Dr. Seuss\'s "You\'re Only Old Once!" a moment that landed beautifully with the audience.',
    highlights: [
      {
        title: 'Suz introduced the Rebellious Aging mission',
        description:
          'She shared the core idea that aging does not have to mean shrinking, fading, or becoming less fully yourself. Rebellious Aging invites women to live with more confidence, more vitality, and more intention.',
      },
      {
        title: 'Food was framed as care for body and planet',
        description:
          'The "Eat for the Earth" theme opened the door to talk about whole-food, plant-based living as a practice that supports personal health while also reflecting care for the wider world.',
      },
      {
        title: 'Dr. Seuss became the emotional bridge',
        description:
          'Suz read "You\'re Only Old Once!" to the audience, and it was a huge hit. The humor, absurdity, and truth of that book helped everyone relax while still connecting to the deeper realities of aging and healthcare.',
      },
    ],
    audienceResponse:
      'The audience response was warm, engaged, and joyful. People clearly recognized themselves in the themes Suz brought forward and responded especially strongly to the blend of candid truth, shared laughter, and practical hope.',
    takeaways: [
      'Aging conversations land differently when they are honest, funny, and rooted in dignity.',
      'Food can be discussed as both a health choice and a values choice without becoming preachy.',
      'Live speaking gives Suz a powerful way to bring Rebellious Aging to life through warmth, humor, and storytelling.',
      'This first event showed that there is real appetite for more community talks, readings, and conversations in the future.',
    ],
    nextChapter:
      'This page begins the Rebellious Aging speaking archive. As Suz does more talks, workshops, and community conversations, they can live alongside this one so visitors can follow the journey and revisit the ideas that sparked connection in the room.',
    slideDeck: {
      status: 'ready',
      note:
        'Flip through the original PDF of Suz\'s presentation from the Santa Cruz event, or open it in a new tab for a larger view.',
      embedUrl: '/speaking-events/eat-for-the-earth-santa-cruz-slides.pdf#toolbar=1&navpanes=0&view=FitH',
      downloadUrl: '/speaking-events/eat-for-the-earth-santa-cruz-slides.pdf',
    },
    tags: ['speaking', 'event', 'santa cruz', 'beth love', 'dr seuss', 'wfpb'],
  },
];

export const getSpeakingEventPath = (slug: string) => `/speaking-events/${slug}`;

export const getSpeakingEventBySlug = (slug: string) =>
  speakingEvents.find((event) => event.slug === slug);
