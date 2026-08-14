'use client';

import { useEffect } from 'react';

import {
  CONTACT_TYPEFORM_ID,
  isContactTypeformHref,
  recordFormLead,
  resolveTypeformFormLead,
} from '@/lib/ga4';

const TYPEFORM_EMBED_SCRIPT = 'https://embed.typeform.com/next/embed.js';
const TYPEFORM_POPUP_CSS = 'https://embed.typeform.com/next/css/popup.css';

type TypeformSubmitPayload = {
  formId?: string;
};

type TypeformPopup = {
  open: () => void;
  close?: () => void;
  unmount?: () => void;
};

type TypeformEmbedApi = {
  load?: () => void;
  reload?: () => void;
  createPopup?: (
    formId: string,
    options: {
      size?: number;
      onSubmit?: (payload: TypeformSubmitPayload) => void;
    }
  ) => TypeformPopup;
};

let typeformEmbedPromise: Promise<TypeformEmbedApi> | null = null;
let activeTypeformPopup: TypeformPopup | null = null;

function getTypeformApi(): TypeformEmbedApi | undefined {
  return (window as Window & { tf?: TypeformEmbedApi }).tf;
}

function ensureTypeformPopupStyles(): void {
  if (document.querySelector('link[data-ra-typeform-popup-css="true"]')) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = TYPEFORM_POPUP_CSS;
  link.dataset.raTypeformPopupCss = 'true';
  document.head.appendChild(link);
}

function loadTypeformEmbed(): Promise<TypeformEmbedApi> {
  const existingApi = getTypeformApi();
  if (existingApi?.createPopup) {
    return Promise.resolve(existingApi);
  }

  if (typeformEmbedPromise) {
    return typeformEmbedPromise;
  }

  typeformEmbedPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://embed.typeform.com/next/embed.js"]'
    );

    const handleReady = () => {
      const api = getTypeformApi();
      if (api?.createPopup) {
        resolve(api);
        return;
      }

      typeformEmbedPromise = null;
      reject(new Error('Typeform embed API was not available'));
    };

    if (existing) {
      if (existing.dataset.loadState === 'ready' || getTypeformApi()?.createPopup) {
        handleReady();
        return;
      }

      existing.addEventListener('load', handleReady, { once: true });
      existing.addEventListener(
        'error',
        () => {
          typeformEmbedPromise = null;
          reject(new Error('Typeform embed script failed to load'));
        },
        { once: true }
      );
      return;
    }

    ensureTypeformPopupStyles();

    const script = document.createElement('script');
    script.src = TYPEFORM_EMBED_SCRIPT;
    script.async = true;
    script.dataset.raTypeformEmbed = 'true';
    script.addEventListener('load', handleReady, { once: true });
    script.addEventListener(
      'error',
      () => {
        typeformEmbedPromise = null;
        reject(new Error('Typeform embed script failed to load'));
      },
      { once: true }
    );
    document.head.appendChild(script);
  });

  return typeformEmbedPromise;
}

function recordLeadForPath(formId: string | undefined, pathname: string): void {
  const params = resolveTypeformFormLead(formId, pathname);
  if (!params) {
    return;
  }

  recordFormLead(params);
}

async function openContactTypeform(pathname: string): Promise<boolean> {
  try {
    const embed = await loadTypeformEmbed();
    if (!embed.createPopup) {
      return false;
    }

    activeTypeformPopup?.unmount?.();
    activeTypeformPopup = embed.createPopup(CONTACT_TYPEFORM_ID, {
      size: 100,
      onSubmit: (payload) => {
        recordLeadForPath(payload?.formId ?? CONTACT_TYPEFORM_ID, pathname);
      },
    });
    activeTypeformPopup.open();
    return true;
  } catch {
    return false;
  }
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isTypeformOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname;
    return hostname === 'typeform.com' || hostname.endsWith('.typeform.com');
  } catch {
    return false;
  }
}

function readTypeformSubmitFormId(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const message = data as { type?: unknown; formId?: unknown; data?: { formId?: unknown } };
  if (message.type !== 'form-submit' && message.type !== 'form-submitted') {
    return undefined;
  }

  if (typeof message.formId === 'string') {
    return message.formId;
  }

  if (typeof message.data?.formId === 'string') {
    return message.data.formId;
  }

  return undefined;
}

function isTypeformSubmitMessage(data: unknown): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const message = data as { type?: unknown };
  return message.type === 'form-submit' || message.type === 'form-submitted';
}

const Ga4LeadTracker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const typeformLink = target.closest<HTMLAnchorElement>('a[href]');
      if (!typeformLink || !isContactTypeformHref(typeformLink.href, window.location.origin)) {
        return;
      }

      const pathname = window.location.pathname;
      event.preventDefault();

      void openContactTypeform(pathname).then((opened) => {
        if (!opened) {
          window.open(typeformLink.href, typeformLink.target || '_blank', 'noopener,noreferrer');
        }
      });
    };

    const handleMessage = (event: MessageEvent) => {
      if (!isTypeformOrigin(event.origin) || !isTypeformSubmitMessage(event.data)) {
        return;
      }

      recordLeadForPath(readTypeformSubmitFormId(event.data), window.location.pathname);
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return null;
};

export default Ga4LeadTracker;
