'use client';

import { Suspense, useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';

const URL_FILTERS_EVENT = 'collection-filters-change';
const subscribe = (listener: () => void) => {
  window.addEventListener('popstate', listener);
  window.addEventListener(URL_FILTERS_EVENT, listener);
  return () => {
    window.removeEventListener('popstate', listener);
    window.removeEventListener(URL_FILTERS_EVENT, listener);
  };
};
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => '';

// Keep the URL authoritative without adding a history entry or moving the page
// for every keystroke. The empty server snapshot preserves the full collection
// in exported HTML; query filtering begins after hydration.
export function useUrlFilters<T>(parse: (params: URLSearchParams) => T, write: (filters: T, params: URLSearchParams) => void) {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const filters = useMemo(() => parse(new URLSearchParams(search)), [parse, search]);
  const update = useCallback((patch: Partial<T> | ((current: T) => Partial<T>)) => {
    const url = new URL(window.location.href);
    const current = parse(url.searchParams);
    const next = { ...current, ...(typeof patch === 'function' ? patch(current) : patch) };
    write(next, url.searchParams);
    const destination = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(window.history.state, '', destination);
    window.dispatchEvent(new Event(URL_FILTERS_EVENT));
  }, [parse, write]);
  return [filters, update] as const;
}

// Observe Next's query-only Link/router navigation in an isolated Suspense
// boundary, rather than making server-rendered collection content suspend.
function UrlNavigationObserver() {
  const params = useSearchParams();
  useEffect(() => { window.dispatchEvent(new Event(URL_FILTERS_EVENT)); }, [params]);
  return null;
}
export function UrlFiltersSync() {
  return <Suspense fallback={null}><UrlNavigationObserver /></Suspense>;
}

export const writeParam = (params: URLSearchParams, key: string, value: string | string[], defaultValue = '') => {
  params.delete(key);
  if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
  else if (value && value !== defaultValue) params.set(key, value);
};
export const readAllowedValues = (params: URLSearchParams, key: string, allowed: readonly string[]) =>
  [...new Set(params.getAll(key).filter((value) => allowed.includes(value)))];
