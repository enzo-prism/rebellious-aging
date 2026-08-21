export interface FacebookGroupMonthlyHighlight {
  title: string;
  description: string;
}

export interface FacebookGroupMonthlyHighlights {
  periodLabel: string;
  introduction: string;
  highlights: FacebookGroupMonthlyHighlight[];
}

/**
 * Public, privacy-safe themes to feature on the Facebook Group page.
 * Refresh this single object each month; never include member names or private posts.
 */
export const facebookGroupMonthlyHighlights: FacebookGroupMonthlyHighlights = {
  periodLabel: 'August 2026',
  introduction:
    'A rotating snapshot of the public themes behind the private circle. Member names, stories, and conversations stay inside the group.',
  highlights: [
    {
      title: 'Plant-Strong Possibilities',
      description:
        'Simple ways to add more whole plants to your plate without turning everyday meals into another source of pressure.',
    },
    {
      title: 'Confidence, One Brave Choice at a Time',
      description:
        'Questions and encouragement for challenging limiting beliefs and letting your inner sparkle show.',
    },
    {
      title: 'Style That Feels Like You',
      description:
        'Playful inspiration for expressing personality through color, accessories, and unapologetic self-expression.',
    },
  ],
};
