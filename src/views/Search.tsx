'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useUrlFilters, UrlFiltersSync, writeParam, readAllowedValues } from '@/hooks/useUrlFilters';
import { Search as SearchIcon, Loader2, SlidersHorizontal, X } from 'lucide-react';

import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import type { SearchType } from '@/data/searchRecords';
import { useSearch } from '@/hooks/useSearch';

const typeFilters: Array<{ type: SearchType; label: string }> = [
  { type: 'page', label: 'Pages' },
  { type: 'pillar', label: 'Pillars' },
  { type: 'blog', label: 'Blog' },
  { type: 'video', label: 'Video' },
  { type: 'resource', label: 'Resources' },
  { type: 'section', label: 'Sections' },
  { type: 'recipe', label: 'Recipes' },
  { type: 'event', label: 'Events' },
];

const RECENT_KEY = 'ra-recent-searches';
const MAX_RECENT = 6;

const parseSearchFilters = (params: URLSearchParams) => ({
  query: params.get('q') ?? '',
  selectedTypes: readAllowedValues(params, 'type', typeFilters.map((filter) => filter.type)) as SearchType[],
});
const writeSearchFilters = (filters: ReturnType<typeof parseSearchFilters>, params: URLSearchParams) => {
  writeParam(params, 'q', filters.query);
  writeParam(params, 'type', filters.selectedTypes);
};

const Search = () => {
  const [{ query, selectedTypes }, setFilters] = useUrlFilters(parseSearchFilters, writeSearchFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { search, loading, error, ensureIndex } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]');
      if (Array.isArray(parsed)) setRecent(parsed.filter((value): value is string => typeof value === 'string').slice(0, MAX_RECENT));
    } catch {
      // Search remains available when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    void ensureIndex();
  }, [ensureIndex]);

  useEffect(() => {
    const listener = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    };
    window.addEventListener('focus-search-input', listener);
    return () => window.removeEventListener('focus-search-input', listener);
  }, []);

  const seoConfig = getSeoRouteByPath('/search');

  const results = useMemo(
    () => search(query, { types: selectedTypes.length ? selectedTypes : undefined }),
    [query, search, selectedTypes]
  );

  const persistRecent = (term: string) => {
    if (!term) return;
    const next = [term, ...recent.filter((q) => q !== term)].slice(0, MAX_RECENT);
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore write errors */
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      persistRecent(trimmed);
      setFilters({ query: trimmed });
    } else {
      setFilters({ query: '' });
    }
  };

  const toggleType = (type: SearchType) => {
    setFilters((current) => ({ selectedTypes: current.selectedTypes.includes(type) ? current.selectedTypes.filter((item) => item !== type) : [...current.selectedTypes, type] }));
  };

  return (
    <div className="min-h-screen bg-background px-4 py-4 sm:py-12">
      <UrlFiltersSync />
      {seoConfig && (
        <Seo title={seoConfig.title} description={seoConfig.description} canonicalPath={seoConfig.path} />
      )}
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <PageTopUtilityRow className="mb-1">
            <PageShareButton />
          </PageTopUtilityRow>
          <p className="text-sm uppercase tracking-[0.28em] text-teal font-semibold">Search</p>
          <h1 className="text-4xl font-bold leading-tight">Find your next good idea</h1>
          <p className="text-muted-foreground max-w-3xl">
            Search recipes, articles, free guides, and more. Start with a topic that matters to you.
          </p>
        </div>

        <div className="z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border rounded-2xl p-3 sm:p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  ref={inputRef}
                  type="search"
                  aria-label="Search site content"
                  value={query}
                  onChange={(event) => setFilters({ query: event.target.value })}
                  placeholder="Search blog, pillars, speaking events, nutrition guide…"
                  className="pl-10 pr-12 h-12 text-base"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setFilters({ query: '' })}
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" type="button" aria-expanded={filtersOpen} aria-controls="search-type-filters" onClick={() => setFiltersOpen(!filtersOpen)}>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter by type{selectedTypes.length ? ` (${selectedTypes.length})` : ''}
              </Button>
              {selectedTypes.length > 0 && <Button variant="ghost" type="button" onClick={() => setFilters({ selectedTypes: [] })}>Clear filters</Button>}
            </div>
            <div id="search-type-filters" hidden={!filtersOpen}>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.type}
                  type="button"
                  aria-pressed={selectedTypes.includes(filter.type)}
                  className={badgeVariants({
                    variant: selectedTypes.includes(filter.type) ? 'default' : 'outline',
                    className: 'cursor-pointer min-h-11 px-4 py-2 text-sm rounded-full',
                  })}
                  onClick={() => toggleType(filter.type)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            </div>

            {recent.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recent.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={badgeVariants({
                      variant: 'secondary',
                      className: 'cursor-pointer px-3 py-2 rounded-full',
                    })}
                    onClick={() => {
                      setFilters({ query: item });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
            <Button type="submit" className="hidden">Search</Button>
          </form>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading search results…
          </div>
        )}

        {error && <div role="alert" className="space-y-3 rounded-2xl border p-5">
          <p>Search is unavailable. Check your connection and try again.</p>
          <Button variant="outline" onClick={() => void ensureIndex()}>Try again</Button>
        </div>}

        {!loading && !error && (
          <div className="space-y-4">
            {results.length === 0 ? (
              <div className="border rounded-2xl p-6 bg-muted/20">
                <p className="font-semibold mb-2">No results yet</p>
                <p className="text-muted-foreground mb-4">
                  Try a different keyword like &quot;nutrition guide&quot;, &quot;confidence&quot;, or &quot;video&quot;.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">nutrition</Badge>
                  <Badge variant="outline">confidence</Badge>
                  <Badge variant="outline">gratitude</Badge>
                  <Badge variant="outline">video</Badge>
                  <Badge variant="outline">speaking</Badge>
                  <Badge variant="outline">plant-based</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p role="status" className="text-sm text-muted-foreground">
                  Showing {results.length} result{results.length === 1 ? '' : 's'}
                </p>
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="block border rounded-2xl p-4 sm:p-5 hover:border-teal transition-colors bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className="capitalize">
                        {item.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-muted-foreground line-clamp-2 text-base">{item.summary}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
