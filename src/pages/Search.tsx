'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, Loader2, ArrowLeft, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Seo from '@/components/seo/Seo';
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
];

const RECENT_KEY = 'ra-recent-searches';
const MAX_RECENT = 6;

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<SearchType[]>([]);
  const { search, loading, error, ensureIndex } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const applyQueryParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    const nextSearch = params.toString();
    router.push(nextSearch ? `${pathname}?${nextSearch}` : pathname);
  };
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
      applyQueryParam(trimmed);
    } else {
      applyQueryParam('');
    }
  };

  const toggleType = (type: SearchType) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  };

  return (
    <div className="min-h-screen bg-background px-4 py-4 sm:py-12">
      {seoConfig && (
        <Seo title={seoConfig.title} description={seoConfig.description} canonicalPath={seoConfig.path} />
      )}
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-teal font-semibold">Search</p>
          <h1 className="text-4xl font-bold leading-tight">Find pillars, nutrition, blog posts, and resources</h1>
          <p className="text-muted-foreground max-w-3xl">
            Start typing to search everything on Rebellious Aging. Use filters to narrow down by content type.
          </p>
        </div>

        <div className="sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border rounded-2xl p-3 sm:p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => router.back()}
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search blog, pillars, nutrition guide, video series…"
                  className="pl-10 h-12 text-base"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <Badge
                  key={filter.type}
                  variant={selectedTypes.includes(filter.type) ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-2 text-sm rounded-full"
                  onClick={() => toggleType(filter.type)}
                >
                  {filter.label}
                </Badge>
              ))}
              <Button
                variant="ghost"
                type="button"
                onClick={() => setSelectedTypes([])}
                className="text-sm"
              >
                Clear filters
              </Button>
            </div>

            {recent.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recent.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="cursor-pointer px-3 py-2 rounded-full"
                    onClick={() => {
                      setQuery(item);
                      applyQueryParam(item);
                    }}
                  >
                    {item}
                  </Badge>
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

        {error && <div className="text-destructive text-sm">{error}</div>}

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
                  <Badge variant="outline">plant-based</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
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
                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Updated'}
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
