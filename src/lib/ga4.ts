export const CONTACT_TYPEFORM_ID = 'DbY1YJrs';

export const generateLeadMethods = {
  form: 'form',
} as const;

export type GenerateLeadMethod = (typeof generateLeadMethods)[keyof typeof generateLeadMethods];

export type GenerateLeadParams = {
  form_id?: string;
  form_name?: string;
  lead_source?: string;
  location?: string;
  method?: GenerateLeadMethod;
  contact_method?: GenerateLeadMethod;
};

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

const ALLOWED_GENERATE_LEAD_KEYS = new Set<keyof GenerateLeadParams>([
  'form_id',
  'form_name',
  'lead_source',
  'location',
  'method',
  'contact_method',
]);

const SAFE_PARAM_VALUE = /^[A-Za-z0-9._-]{1,80}$/;

const QUIZ_TYPEFORM_IDS: Record<string, string> = {
  '01K7MB2JPFFBBQYR354JVHSAZP': 'confidence',
  '01K7MBJYZ6KNAJAYPS2P1364PN': 'style',
  '01K7MBQQJ3SQJKTM3T3SPQKZC3': 'health',
};

const QUIZ_PILLARS = new Set(['confidence', 'style', 'health']);

function isSafeLeadParamValue(value: unknown): value is string {
  return typeof value === 'string' && SAFE_PARAM_VALUE.test(value);
}

export function sanitizeGenerateLeadParams(params: GenerateLeadParams): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const key of ALLOWED_GENERATE_LEAD_KEYS) {
    const value = params[key];
    if (isSafeLeadParamValue(value)) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function locationFromPathname(pathname: string): string {
  if (pathname === '/') {
    return 'home';
  }

  const slug = pathname
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);

  return SAFE_PARAM_VALUE.test(slug) ? slug : 'unknown';
}

export function isContactTypeformHref(href: string, baseUrl?: string): boolean {
  try {
    const url = new URL(href, baseUrl ?? 'https://www.rebelwithsuz.com');
    return url.hostname.endsWith('typeform.com') && url.pathname.includes(`/to/${CONTACT_TYPEFORM_ID}`);
  } catch {
    return false;
  }
}

function formLeadParams(
  formId: string,
  leadSource: string,
  location: string
): GenerateLeadParams {
  return {
    form_id: formId,
    form_name: formId,
    lead_source: leadSource,
    location,
    method: generateLeadMethods.form,
    contact_method: generateLeadMethods.form,
  };
}

export function contactFormLeadParams(location: string): GenerateLeadParams {
  return formLeadParams('contact', 'website_contact_form', location);
}

export function newsletterFormLeadParams(location: string): GenerateLeadParams {
  return formLeadParams('newsletter', 'website_newsletter_form', location);
}

export function quizFormLeadParams(pillarId: string, location: string): GenerateLeadParams {
  const pillar = QUIZ_PILLARS.has(pillarId) ? pillarId : 'fallback';
  return formLeadParams(`quiz_${pillar}`, 'website_quiz_form', location);
}

export function resolveTypeformFormLead(
  formId: string | undefined,
  pathname: string
): GenerateLeadParams | null {
  const location = locationFromPathname(pathname);
  const quizPillarFromId = formId ? QUIZ_TYPEFORM_IDS[formId] : undefined;
  const pathPillar = pathname.match(/^\/pillars\/(confidence|style|health)(?:\/|$)/)?.[1];

  if (quizPillarFromId) {
    return quizFormLeadParams(quizPillarFromId, location);
  }

  if (pathPillar) {
    return quizFormLeadParams(pathPillar, location);
  }

  if (pathname === '/contact' || pathname.startsWith('/contact/')) {
    return contactFormLeadParams(location);
  }

  if (
    pathname === '/' ||
    pathname === '/welcome-letter' ||
    pathname.startsWith('/welcome-letter/')
  ) {
    return newsletterFormLeadParams(location);
  }

  if (formId === CONTACT_TYPEFORM_ID) {
    return contactFormLeadParams(location);
  }

  return null;
}

function getGtag(): GtagFunction | null {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return null;
  }

  return window.gtag;
}

export function trackGenerateLead(params: GenerateLeadParams): void {
  const sanitizedParams = sanitizeGenerateLeadParams(params);

  if (process.env.NODE_ENV !== 'production') {
    console.info('[ga4]', 'generate_lead', sanitizedParams);
  }

  getGtag()?.('event', 'generate_lead', sanitizedParams);
}

const FORM_LEAD_DEDUP_PREFIX = 'ra_ga4_generate_lead_form';
const FORM_LEAD_DEDUP_TTL_MS = 10 * 60 * 1000;

function formLeadDedupKey(formId: string | undefined): string {
  return `${FORM_LEAD_DEDUP_PREFIX}_${formId && SAFE_PARAM_VALUE.test(formId) ? formId : 'form'}`;
}

export function shouldRecordFormLead(formId?: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const key = formLeadDedupKey(formId);
    const previous = window.sessionStorage.getItem(key);
    if (previous && Date.now() - Number(previous) < FORM_LEAD_DEDUP_TTL_MS) {
      return false;
    }

    window.sessionStorage.setItem(key, String(Date.now()));
    return true;
  } catch {
    return true;
  }
}

export function recordFormLead(params: GenerateLeadParams): void {
  if (!shouldRecordFormLead(params.form_id)) {
    return;
  }

  trackGenerateLead(params);
}
