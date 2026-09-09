export const FACEBOOK_GROUP_URL =
  "https://www.facebook.com/groups/1497629461551095/" as const;

export const SUBSTACK_URL = "https://substack.com/@rebelsuz" as const;

export const LIVE_LOUD_HAT_PATH = '/live-loud-hat' as const;

// Formspree endpoint for the Live Loud hat waitlist.
// Notifications go to enzo@design-prism.com. Do not add suz@ here — claiming a
// second recipient emails Suz a confirmation. Enzo can add her later in the
// Formspree dashboard. Official claim URL (creates the form after sign-in):
// https://formspree.io/claim?name=Live+Loud+Hat+Waitlist&project=rebellious-aging&field.name=text,required,maxlength:120&field.email=email,required&field.phone=text,maxlength:40&field.city=text,maxlength:80&field.why=text,maxlength:2000&field.sizeNote=text,maxlength:200&action.email=enzo@design-prism.com
export const LIVE_LOUD_HAT_FORMSPREE_ID = 'mwkynqvd' as const;

export const LIVE_LOUD_HAT_FORMSPREE_ENDPOINT =
  `https://formspree.io/f/${LIVE_LOUD_HAT_FORMSPREE_ID}` as const;
