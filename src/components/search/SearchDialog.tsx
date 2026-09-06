'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import type { SearchDocument, SearchType } from '@/data/searchRecords';
import { useSearch } from '@/hooks/useSearch';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface SearchDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRestoreFocus?: () => void;
  renderTrigger?: (open: () => void) => React.ReactNode;
}

const typeLabel: Record<SearchType, string> = {
  page: 'Page', pillar: 'Wellbeing', blog: 'Article', video: 'Video',
  resource: 'Guide', section: 'Nutrition', recipe: 'Recipe', event: 'Event',
};

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange, onRestoreFocus, renderTrigger }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const resolvedOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchType | 'all'>('all');
  const pathname = usePathname();
  const router = useRouter();
  const { search, docs, loading, error, ensureIndex } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const results = useMemo(
    () => search(query, activeType === 'all' ? undefined : { types: [activeType] }),
    [query, search, activeType]
  );
  const suggestions = useMemo(() => {
    const paths = activeType === 'recipe' ? [] : ['/guides', '/recipes', '/blog', '/nutrition', '/our-story'];
    return paths.length
      ? paths.flatMap((path) => docs.filter((doc) => doc.path === path).slice(0, 1))
      : docs.filter((doc) => doc.type === 'recipe').slice(0, 6);
  }, [docs, activeType]);
  const shownResults = query.trim() ? results.slice(0, 30) : suggestions;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (pathname.startsWith('/search')) {
          window.dispatchEvent(new CustomEvent('focus-search-input'));
        } else {
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setOpen, pathname]);

  useEffect(() => {
    if (!resolvedOpen) return;
    if (pathname.startsWith('/search')) {
      setOpen(false);
      window.dispatchEvent(new CustomEvent('focus-search-input'));
      return;
    }
    void ensureIndex();
  }, [ensureIndex, resolvedOpen, pathname, setOpen]);

  const selectResult = (item: SearchDocument) => {
    setOpen(false);
    setQuery('');
    router.push(item.path);
  };
  const openSearch = () => {
    if (pathname.startsWith('/search')) {
      window.dispatchEvent(new CustomEvent('focus-search-input'));
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {renderTrigger?.(openSearch)}
      <CommandDialog
        open={resolvedOpen}
        onOpenChange={setOpen}
        hideCloseButton
        shouldFilter={false}
        contentClassName="flex flex-col top-[max(1rem,env(safe-area-inset-top))] w-[calc(100%-2rem)] max-w-2xl translate-y-0 rounded-2xl border p-0 sm:top-[12vh] sm:max-h-[80dvh]"
        onOpenAutoFocus={(event) => {
          openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          event.preventDefault();
          inputRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (onRestoreFocus) onRestoreFocus();
          else openerRef.current?.focus();
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 px-4 pt-3">
          <div>
            <DialogTitle className="text-lg">Search Rebellious Aging</DialogTitle>
            <DialogDescription className="mt-1 text-sm">Find recipes, inspiration, and practical advice.</DialogDescription>
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-11 w-11 shrink-0" onClick={() => setOpen(false)} aria-label="Close search">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CommandInput ref={inputRef} value={query} onValueChange={setQuery}
          placeholder="Search recipes, blog posts, speaking events, nutrition..."
          aria-label="Search site content" className="text-base" />
        <div className="flex shrink-0 gap-2 border-b px-4 py-2" aria-label="Search filters">
          <Button type="button" size="sm" variant={activeType === 'all' ? 'secondary' : 'ghost'} aria-pressed={activeType === 'all'} onClick={() => setActiveType('all')}>All</Button>
          <Button type="button" size="sm" variant={activeType === 'recipe' ? 'secondary' : 'ghost'} aria-pressed={activeType === 'recipe'} onClick={() => setActiveType('recipe')}>Recipes</Button>
        </div>
        {/* cmdk requires its list to stay mounted while input updates, including loading/error states. */}
        <CommandList className="min-h-0 max-h-[min(48dvh,420px)] flex-1 overscroll-contain">
        {loading ? (
          <div role="status" className="flex items-center gap-2 p-5 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading search…</div>
        ) : error ? (
          <div role="alert" className="space-y-3 p-5">
            <p>Search is unavailable. Check your connection and try again.</p>
            <Button variant="outline" onClick={() => void ensureIndex()}>Try again</Button>
          </div>
        ) : (
          <>
            <CommandEmpty>No matches found. Try a topic like nutrition or confidence.</CommandEmpty>
            <CommandGroup heading={query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Explore the site'}>
              {shownResults.map((item) => (
                <CommandItem key={item.id} value={item.id} onSelect={() => selectResult(item)} className="cursor-pointer rounded-lg">
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="block text-base font-medium">{item.title}</span>
                    <p className="line-clamp-2 text-sm text-muted-foreground group-data-[selected=true]:text-accent-foreground">{item.summary}</p>
                    <span className="block text-xs font-medium text-muted-foreground group-data-[selected=true]:text-accent-foreground">{typeLabel[item.type]}</span>
                  </div>
                  <ArrowRight className="ml-3 h-4 w-4 shrink-0" aria-hidden="true" />
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        </CommandList>
        <div className="flex shrink-0 items-center justify-between border-t px-4 py-3">
          <Link href={`/search${query.trim() || activeType !== 'all' ? `?${new URLSearchParams({ ...(query.trim() ? { q: query.trim() } : {}), ...(activeType !== 'all' ? { type: activeType } : {}) }).toString()}` : ''}`} className="inline-flex min-h-11 items-center gap-2 font-medium text-teal hover:underline" onClick={() => setOpen(false)}>
            View all search results <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="hidden text-xs text-muted-foreground sm:block">Esc to close</span>
        </div>
      </CommandDialog>
    </>
  );
};
