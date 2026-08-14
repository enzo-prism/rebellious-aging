import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CONTACT_TYPEFORM_ID,
  contactFormLeadParams,
  isContactTypeformHref,
  isTypeformOrigin,
  isTypeformSubmitMessage,
  locationFromPathname,
  quizFormLeadParams,
  readTypeformSubmitFormId,
  recordFormLead,
  resolveTypeformFormLead,
  sanitizeGenerateLeadParams,
  shouldRecordFormLead,
  trackGenerateLead,
} from '@/lib/ga4';

describe('ga4 generate_lead helpers', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.dataLayer = [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.gtag;
    delete window.dataLayer;
    window.sessionStorage.clear();
  });

  it('keeps only allowlisted generate_lead params', () => {
    expect(
      sanitizeGenerateLeadParams({
        form_id: 'contact',
        form_name: 'contact',
        lead_source: 'website_contact_form',
        location: 'contact',
        method: 'form',
        contact_method: 'form',
      })
    ).toEqual({
      form_id: 'contact',
      form_name: 'contact',
      lead_source: 'website_contact_form',
      location: 'contact',
      method: 'form',
      contact_method: 'form',
    });
  });

  it('drops PII-like or unsafe param values', () => {
    expect(
      sanitizeGenerateLeadParams({
        form_id: 'suz@rebelwithsuz.com',
        form_name: 'tel:+15555550100',
        lead_source: 'please call me back',
        location: 'Santa Cruz',
        method: 'form',
        contact_method: 'form',
      })
    ).toEqual({
      method: 'form',
      contact_method: 'form',
    });
  });

  it('builds low-cardinality location slugs from pathnames', () => {
    expect(locationFromPathname('/')).toBe('home');
    expect(locationFromPathname('/contact')).toBe('contact');
    expect(locationFromPathname('/pillars/health')).toBe('pillars_health');
    expect(locationFromPathname('/welcome-letter/')).toBe('welcome_letter');
  });

  it('recognizes the existing contact Typeform URL without reading query PII', () => {
    expect(isContactTypeformHref(`https://fxuqp40sseh.typeform.com/to/${CONTACT_TYPEFORM_ID}`)).toBe(
      true
    );
    expect(
      isContactTypeformHref(`https://fxuqp40sseh.typeform.com/to/${CONTACT_TYPEFORM_ID}#email=x`)
    ).toBe(true);
    expect(isContactTypeformHref('https://fxuqp40sseh.typeform.com/to/qYX51Bgz')).toBe(false);
    expect(isContactTypeformHref('/contact')).toBe(false);
  });

  it('maps Typeform success to the page-specific allowlisted form', () => {
    expect(resolveTypeformFormLead(CONTACT_TYPEFORM_ID, '/contact')).toMatchObject({
      form_id: 'contact',
      form_name: 'contact',
      lead_source: 'website_contact_form',
      location: 'contact',
      method: 'form',
      contact_method: 'form',
    });
    expect(resolveTypeformFormLead(CONTACT_TYPEFORM_ID, '/welcome-letter')).toMatchObject({
      form_id: 'newsletter',
      lead_source: 'website_newsletter_form',
      location: 'welcome_letter',
    });
    expect(resolveTypeformFormLead(CONTACT_TYPEFORM_ID, '/')).toMatchObject({
      form_id: 'newsletter',
      lead_source: 'website_newsletter_form',
      location: 'home',
    });
    expect(resolveTypeformFormLead('01K7MBQQJ3SQJKTM3T3SPQKZC3', '/pillars/health')).toMatchObject({
      form_id: 'quiz_health',
      lead_source: 'website_quiz_form',
      location: 'pillars_health',
    });
    expect(resolveTypeformFormLead(undefined, '/pillars/style')).toMatchObject({
      form_id: 'quiz_style',
      lead_source: 'website_quiz_form',
    });
    expect(resolveTypeformFormLead('unknown-form', '/recipes')).toBeNull();
  });

  it('builds quiz fallback params from the pillar id only', () => {
    expect(quizFormLeadParams('confidence', 'pillars_confidence')).toMatchObject({
      form_id: 'quiz_confidence',
      form_name: 'quiz_confidence',
      lead_source: 'website_quiz_form',
    });
    expect(quizFormLeadParams('not-a-pillar', 'pillars_gratitude').form_id).toBe('quiz_fallback');
  });

  it('session-dedupes the same form lead for about 10 minutes', () => {
    const params = contactFormLeadParams('contact');

    recordFormLead(params);
    recordFormLead(params);

    const leadEvents = (window.dataLayer ?? []).filter(
      (entry) => Array.isArray(entry) && entry[0] === 'event' && entry[1] === 'generate_lead'
    );
    expect(leadEvents).toHaveLength(1);
    expect(shouldRecordFormLead(params.form_id)).toBe(false);
  });

  it('lets a different form record a lead in the same session', () => {
    expect(shouldRecordFormLead('contact')).toBe(true);
    expect(shouldRecordFormLead('quiz_health')).toBe(true);
    expect(shouldRecordFormLead('contact')).toBe(false);
  });

  it('accepts Typeform submit postMessages from Typeform origins only', () => {
    expect(isTypeformOrigin('https://fxuqp40sseh.typeform.com')).toBe(true);
    expect(isTypeformOrigin('https://form.typeform.com')).toBe(true);
    expect(isTypeformOrigin('https://evil.example')).toBe(false);
    expect(isTypeformSubmitMessage({ type: 'form-submit', formId: CONTACT_TYPEFORM_ID })).toBe(true);
    expect(isTypeformSubmitMessage({ type: 'form-ready', formId: CONTACT_TYPEFORM_ID })).toBe(false);
    expect(readTypeformSubmitFormId({ type: 'form-submit', formId: CONTACT_TYPEFORM_ID })).toBe(
      CONTACT_TYPEFORM_ID
    );
    expect(readTypeformSubmitFormId({ type: 'form-submitted', data: { formId: '01K7MBQQJ3SQJKTM3T3SPQKZC3' } })).toBe(
      '01K7MBQQJ3SQJKTM3T3SPQKZC3'
    );

    const submit = { type: 'form-submit' as const, formId: CONTACT_TYPEFORM_ID };
    expect(
      isTypeformOrigin('https://fxuqp40sseh.typeform.com') && isTypeformSubmitMessage(submit)
        ? resolveTypeformFormLead(readTypeformSubmitFormId(submit), '/contact')
        : null
    ).toMatchObject({
      form_id: 'contact',
      lead_source: 'website_contact_form',
      method: 'form',
    });
  });

  it('sends generate_lead through the existing gtag bridge', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    trackGenerateLead({
      ...contactFormLeadParams('contact'),
      form_id: 'suz@rebelwithsuz.com',
    });

    expect(window.dataLayer).toEqual([
      [
        'event',
        'generate_lead',
        {
          form_name: 'contact',
          lead_source: 'website_contact_form',
          location: 'contact',
          method: 'form',
          contact_method: 'form',
        },
      ],
    ]);
    expect(info).toHaveBeenCalledWith(
      '[ga4]',
      'generate_lead',
      expect.not.objectContaining({ form_id: 'suz@rebelwithsuz.com' })
    );
  });
});
