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

export interface SpeakingEventVideoPreview {
  title: string;
  description: string;
  videoUrl: string;
}

export interface SpeakingEventGalleryImage {
  src: string;
  alt: string;
  caption: string;
  layout?: 'featured' | 'portrait' | 'landscape' | 'wide';
}

export interface SpeakingEventConnectionLink {
  href: string;
  label: string;
}

export interface SpeakingEventConnectionSection {
  eyebrow: string;
  title: string;
  intro: string[];
  cards: SpeakingEventHighlight[];
  closing: string;
  links?: SpeakingEventConnectionLink[];
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
  videoPreview?: SpeakingEventVideoPreview;
  slideDeck: SpeakingEventSlideDeck;
  gallery?: SpeakingEventGalleryImage[];
  connectionSection?: SpeakingEventConnectionSection;
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
    connectionSection: {
      eyebrow: 'Where this talk connects',
      title: 'How Eat for the Earth ties into the WFPB heart of the site',
      intro: [
        'This Santa Cruz gathering was not a side topic inside Rebellious Aging. It was a live expression of the same whole-food, plant-based philosophy woven through the site\'s Health pillar, nutrition guides, recipes, and Suz\'s own story. "Eat for the Earth" made room to say out loud that the same plate that can care for the planet can also support healthier cholesterol, steadier energy, easier movement, and a more vibrant way of aging.',
        'Across the rest of the website, WFPB living is never framed as a fad, a purity contest, or a substitute for medical care. It is framed as a practical, evidence-rooted way to move more of life upstream: more nourishment before crisis, more daily agency before diagnosis, and more chances to stay active, clear, and independent instead of waiting passively for the next intervention.',
      ],
      cards: [
        {
          title: 'Plants as prevention, not punishment',
          description:
            'The nutrition pages keep returning to one idea: food is one of the most powerful daily choices we still control. Whole plant foods support the body before trouble escalates, which is very different from waiting until symptoms stack up and then trying to manage the fallout.',
        },
        {
          title: 'A rebel answer to the Dr. Seuss waiting room',
          description:
            'In "You\'re Only Old Once!" Dr. Seuss captures the comic indignity of being moved from room to room, test to test, inside a system that can feel impersonal and absurd. Rebellious Aging does not answer that with denial. It answers it with upstream choices that may help lower the odds of becoming trapped in preventable decline and needless dependence on the medical conveyor belt.',
        },
        {
          title: 'Not anti-doctor. Pro-agency.',
          description:
            'This message is not about rejecting medicine or pretending food solves everything. It is about refusing to make pills, procedures, and worry the entire strategy. WFPB living, movement, rest, curiosity, and community all belong in the conversation if the goal is to preserve quality of life for as long as possible.',
        },
      ],
      closing:
        'That is why this first talk mattered. It connected laughter, science, and values in one room. The Dr. Seuss reading named what so many people fear about aging; the WFPB message offered a practical way to live with more intention so the future is shaped less by resignation and more by participation, nourishment, and choice.',
      links: [
        {
          href: '/nutrition',
          label: 'Explore the Nutrition guide',
        },
        {
          href: '/dr-seuss',
          label: 'Read the Dr. Seuss reflection',
        },
      ],
    },
    nextChapter:
      'This page begins the Rebellious Aging speaking archive. As Suz does more talks, workshops, and community conversations, they can live alongside this one so visitors can follow the journey and revisit the ideas that sparked connection in the room.',
    videoPreview: {
      title: 'Watch a short moment from the event',
      description:
        'This brief video preview captures Suz sharing the spirit of Rebellious Aging live at Eat for the Earth in Santa Cruz.',
      videoUrl:
        'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1774535901/suz_ymm7lu.mp4',
    },
    slideDeck: {
      status: 'ready',
      note:
        'Flip through the original PDF of Suz\'s presentation from the Santa Cruz event, or open it in a new tab for a larger view.',
      embedUrl: '/speaking-events/eat-for-the-earth-santa-cruz-slides.pdf#toolbar=1&navpanes=0&view=FitH',
      downloadUrl: '/speaking-events/eat-for-the-earth-santa-cruz-slides.pdf',
    },
    gallery: [
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622673/IMG_1484_2_j0subu.heic',
        alt: 'Suz speaking at the front of the Santa Cruz event room while attendees listen.',
        caption: 'The room settling in as Suz shared the Rebellious Aging vision.',
        layout: 'featured',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622675/IMG_1429_2_ynm9oa.heic',
        alt: 'Suz smiling beside a table decorated with Dr. Seuss-themed event props.',
        caption: 'Suz setting the stage with playful Dr. Seuss touches before the talk.',
        layout: 'portrait',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622719/IMG_1468_2_nr8wic.heic',
        alt: 'A side view of Suz speaking while a slide is projected behind her.',
        caption: 'A quieter speaking moment with the slide deck in view.',
        layout: 'portrait',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622673/IMG_1446_2_vmsja0.heic',
        alt: 'A table setup with food, books, and Cat in the Hat hats arranged for the event.',
        caption: 'Table details that carried the spirit of the event into the room.',
        layout: 'landscape',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622674/IMG_1438_2_j6gpil.heic',
        alt: 'Projection art visible during the event while Suz stands near the front of the room.',
        caption: 'Projection art and presentation moments during the talk.',
        layout: 'portrait',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto/v1774622703/IMG_1459_2_wabqwp.heic',
        alt: 'Audience members gathered around tables during the Santa Cruz event.',
        caption: 'The audience gathered around the conversation, food, and ideas.',
        layout: 'wide',
      },
    ],
    tags: ['speaking', 'event', 'santa cruz', 'beth love', 'dr seuss', 'wfpb'],
  },
];

export const getSpeakingEventPath = (slug: string) => `/speaking-events/${slug}`;

export const getSpeakingEventBySlug = (slug: string) =>
  speakingEvents.find((event) => event.slug === slug);
