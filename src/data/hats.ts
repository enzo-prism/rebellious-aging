// The two Rebellious Aging hats. Both are black caps; they differ only in the
// front embroidery. Photos are real product shots (subject-lifted from Enzo's
// photos) — do not swap in stock or AI imagery of the hats.

export type HatStyleId = 'live-loud' | 'r-butterfly';
export type HatChoice = HatStyleId | 'either';

export interface HatImage {
  small: string;
  smallWidth: number;
  large: string;
  largeWidth: number;
  width: number;
  height: number;
  alt: string;
}

export interface HatStyle {
  id: HatStyleId;
  name: string;
  shortName: string;
  requestName: string;
  tagline: string;
  description: string;
  details: string[];
  image: HatImage;
}

export const hatStyles: HatStyle[] = [
  {
    id: 'live-loud',
    name: 'The Live Loud! hat',
    shortName: 'Live Loud!',
    requestName: 'the Live Loud! hat',
    tagline: 'Green script on black',
    description:
      'Our motto, stitched right on the front in bright green script. Age boldly, live loudly, and let people read it from across the room.',
    details: ['Black cap', '“Live Loud!” in lime-green script', 'Embroidered, not printed'],
    image: {
      small: '/hats/live-loud-hat-sm.webp',
      smallWidth: 480,
      large: '/hats/live-loud-hat-lg.webp',
      largeWidth: 859,
      width: 859,
      height: 1161,
      alt: 'Black baseball cap with “Live Loud!” embroidered across the front in lime-green script.',
    },
  },
  {
    id: 'r-butterfly',
    name: 'The R hat',
    shortName: 'The R',
    requestName: 'the R hat',
    tagline: 'White R with a butterfly',
    description:
      'The Rebellious Aging logo: a white R with a curl at its tail and a butterfly perched on top. A quieter hat with the same rebellious heart.',
    details: ['Black cap', 'White Rebellious Aging R + butterfly', 'Embroidered, not printed'],
    image: {
      small: '/hats/r-butterfly-hat-sm.webp',
      smallWidth: 480,
      large: '/hats/r-butterfly-hat-lg.webp',
      largeWidth: 908,
      width: 908,
      height: 1322,
      alt: 'Black baseball cap with the white embroidered Rebellious Aging R logo, a butterfly resting on top of the letter.',
    },
  },
];

export const hatPairImage: HatImage = {
  small: '/hats/rebellious-aging-hats-pair-sm.webp',
  smallWidth: 480,
  large: '/hats/rebellious-aging-hats-pair-lg.webp',
  largeWidth: 960,
  width: 960,
  height: 610,
  alt: 'The two Rebellious Aging hats side by side: a black cap with “Live Loud!” in green script, and a black cap with the white R and butterfly logo.',
};

export const hatSocialImage = '/hats/rebellious-aging-hats-og.jpg';

export const hatChoiceLabels: Record<HatChoice, string> = {
  'live-loud': 'Live Loud!',
  'r-butterfly': 'The R',
  either: 'Either one',
};

export const isHatChoice = (value: unknown): value is HatChoice =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(hatChoiceLabels, value);

export const hatImageSrcSet = (image: HatImage) =>
  `${image.small} ${image.smallWidth}w, ${image.large} ${image.largeWidth}w`;
