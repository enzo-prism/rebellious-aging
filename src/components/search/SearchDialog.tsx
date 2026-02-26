'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, X } from 'lucide-react';

import type { SearchDocument, SearchType } from '@/data/searchRecords';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface SearchDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderTrigger?: (open: () => void) => React.ReactNode;
}

const typeLabel: Record<SearchType, string> = {
  page: 'Pages',
  pillar: 'Pillars',
  blog: 'Blog',
  video: 'Video',
  resource: 'Resources',
  section: 'Sections',
  recipe: 'Recipes',
};

const typeEmoji: Record<SearchType, string> = {
  page: '📄',
  pillar: '🏛️',
  blog: '📝',
  video: '🎥',
  resource: '📚',
  section: '📌',
  recipe: '🍽️',
};

interface ResultGroup {
  type: SearchType;
  items: SearchDocument[];
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onOpenChange,
  renderTrigger,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const resolvedOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchType | 'all'>('all');
  const [isPinned, setIsPinned] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };
  const { search, docs, loading, error, ensureIndex } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const hasUserScrolledRef = useRef(false);
  const userScrollIntentRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const focusPageSearch = useRef(() => {
    window.dispatchEvent(new CustomEvent('focus-search-input'));
  }).current;

  const results = useMemo(
    () => search(query, activeType === 'all' ? undefined : { types: [activeType] }),
    [query, search, activeType]
  );

  const groupedResults: ResultGroup[] = useMemo(() => {
    const groups: Record<SearchType, SearchDocument[]> = {
      page: [],
      pillar: [],
      blog: [],
      video: [],
      resource: [],
      section: [],
      recipe: [],
    };
    const groupOrder = new Map<SearchType, number>();

    results.forEach((item, index) => {
      groups[item.type]?.push(item);
      if (!groupOrder.has(item.type)) {
        groupOrder.set(item.type, index);
      }
    });

    return Object.entries(groups)
      .filter(([, items]) => items.length > 0)
      .sort(
        ([typeA], [typeB]) =>
          (groupOrder.get(typeA as SearchType) ?? 0) - (groupOrder.get(typeB as SearchType) ?? 0)
      )
      .map(([type, items]) => ({ type: type as SearchType, items }));
  }, [results]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (pathname.startsWith('/search')) {
          focusPageSearch();
          return;
        }
        setOpen(true);
        void ensureIndex();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [ensureIndex, setOpen, pathname, focusPageSearch]);

  // Prefetch the index at idle time so mobile opens feel fast
  useEffect(() => {
    type IdleHandle = number;
    type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number };
    type IdleCallback = (deadline: IdleDeadline) => void;
    type IdleOptions = { timeout?: number };

    const supportsIdleCallback =
      typeof window !== 'undefined' && 'requestIdleCallback' in window && 'cancelIdleCallback' in window;

    const schedule: (fn: () => void) => IdleHandle = supportsIdleCallback
      ? (fn) =>
          (
            window as Window & {
              requestIdleCallback: (callback: IdleCallback, options?: IdleOptions) => IdleHandle;
            }
          ).requestIdleCallback(() => fn(), { timeout: 1500 })
      : (fn) => window.setTimeout(fn, 500);

    const cancel: (id: IdleHandle) => void = supportsIdleCallback
      ? (id) =>
          (
            window as Window & {
              cancelIdleCallback: (handle: IdleHandle) => void;
            }
          ).cancelIdleCallback(id)
      : (id) => window.clearTimeout(id);

    const id = schedule(() => {
      void ensureIndex();
    });

    return () => cancel(id);
  }, [ensureIndex]);

  useEffect(() => {
    if (!resolvedOpen) {
      return;
    }

  if (pathname.startsWith('/search')) {
      setOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [resolvedOpen, pathname, setOpen]);

  const markUserScrollIntent = () => {
    userScrollIntentRef.current = true;
    hasUserScrolledRef.current = true;
    setIsPinned(false);
  };

  useEffect(() => {
    if (!resolvedOpen) {
      return;
    }
    hasUserScrolledRef.current = false;
    userScrollIntentRef.current = false;
    setIsPinned(true);
    if (listRef.current) {
      programmaticScrollRef.current = true;
      listRef.current.scrollTop = 0;
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });
    }
  }, [resolvedOpen]);

  useEffect(() => {
    if (!resolvedOpen || !isPinned || hasUserScrolledRef.current) {
      return;
    }
    if (listRef.current) {
      programmaticScrollRef.current = true;
      listRef.current.scrollTop = 0;
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });
    }
  }, [activeType, isPinned, query, results.length, resolvedOpen]);

  const handleSelect = (item: SearchDocument) => {
    setOpen(false);
    setQuery('');
    navigate(item.path);
  };

  const featuredRecipes = useMemo(() => docs.filter((doc) => doc.type === 'recipe').slice(0, 6), [docs]);
  const quickLinks =
    activeType === 'all' ? docs.slice(0, 6) : docs.filter((doc) => doc.type === activeType).slice(0, 6);
  const topResultId = useMemo(() => {
    if (!query && activeType === 'all' && featuredRecipes.length > 0) {
      return featuredRecipes[0]?.id;
    }
    return results[0]?.id ?? null;
  }, [activeType, featuredRecipes, query, results]);
  const itemClass = (id?: string) =>
    cn('border border-transparent rounded-lg', id && id === topResultId && 'border-teal/30 bg-teal/10');

  const openHandler = () => {
    if (pathname.startsWith('/search')) {
      focusPageSearch();
      return;
    }
    setOpen(true);
    void ensureIndex();
  };

  const trigger = renderTrigger ? renderTrigger(openHandler) : null;

  const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false;
  const contentWidth = isMobile ? 'w-full h-full rounded-none border-0' : 'w-[min(100vw-1.5rem,720px)] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl sm:rounded-xl border border-border';
  const emptyMessage = query
    ? 'No matches found.'
    : activeType === 'recipe'
      ? 'Browse recipes or start typing to search.'
      : 'Start typing to search or use a quick link.';

  return (
    <>
      {trigger}
      <CommandDialog
        open={resolvedOpen}
        onOpenChange={setOpen}
        hideCloseButton
        contentClassName={contentWidth}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">Search site content by topic, type, or keyword.</DialogDescription>
        <div className="relative">
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={(value) => {
              setQuery(value);
              void ensureIndex();
            }}
            onKeyDown={(event) => {
              if (
                event.key === 'ArrowDown' ||
                event.key === 'ArrowUp' ||
                event.key === 'PageDown' ||
                event.key === 'PageUp' ||
                event.key === 'Home' ||
                event.key === 'End'
              ) {
                markUserScrollIntent();
              }
            }}
            placeholder="Search recipes, blog posts, pillars, nutrition..."
            className="pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 pb-2 pt-1 border-b">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={activeType === 'all' ? 'secondary' : 'ghost'}
              onClick={() => setActiveType('all')}
            >
              All
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeType === 'recipe' ? 'secondary' : 'ghost'}
              onClick={() => setActiveType('recipe')}
            >
              Recipes
            </Button>
          </div>
        </div>
        <CommandList
          ref={listRef}
          onScroll={(event) => {
            if (programmaticScrollRef.current) {
              return;
            }
            const nextScrollTop = event.currentTarget.scrollTop;
            if (isPinned && !userScrollIntentRef.current && nextScrollTop > 0) {
              programmaticScrollRef.current = true;
              event.currentTarget.scrollTop = 0;
              requestAnimationFrame(() => {
                programmaticScrollRef.current = false;
              });
              return;
            }
            if (userScrollIntentRef.current && nextScrollTop > 2) {
              hasUserScrolledRef.current = true;
              setIsPinned(false);
            }
          }}
          onWheel={markUserScrollIntent}
          onTouchStart={markUserScrollIntent}
          onPointerDown={markUserScrollIntent}
          className="max-h-[calc(100vh-10rem)] sm:max-h-[500px]"
        >
          {loading && (
            <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading search index…
            </div>
          )}
          {error && (
            <CommandEmpty>
              <div className="space-y-2">
                <p className="font-semibold text-destructive">Search is unavailable.</p>
                <p className="text-sm text-muted-foreground">Check your connection or try again.</p>
              </div>
            </CommandEmpty>
          )}
          {!loading && !error && (
            <>
              <CommandEmpty>
                {emptyMessage}
              </CommandEmpty>
              {!query && activeType === 'all' && featuredRecipes.length > 0 && (
                <>
                  <CommandGroup heading="🍽️ Featured Recipes">
                    {featuredRecipes.map((item) => (
                      <CommandItem key={item.id} onSelect={() => handleSelect(item)} className={itemClass(item.id)}>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.title}</span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              Recipe
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                        </div>
                        <CommandShortcut>🍽️</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {groupedResults.length > 0 && <CommandSeparator />}
                </>
              )}
              {groupedResults.map((group, index) => (
                <React.Fragment key={group.type}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup heading={`${typeEmoji[group.type]} ${typeLabel[group.type]}`}>
                    {group.items.map((item) => (
                      <CommandItem key={item.id} onSelect={() => handleSelect(item)} className={itemClass(item.id)}>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.title}</span>
                            {item.tags?.length ? (
                              <Badge variant="secondary" className="text-xs capitalize">
                                {item.tags[0]}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                        </div>
                        <CommandShortcut>{typeLabel[item.type]}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </React.Fragment>
              ))}
              {!query && groupedResults.length === 0 && quickLinks.length > 0 && (
                <CommandGroup heading="⭐ Featured">
                  {quickLinks.map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)} className={itemClass(item.id)}>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.title}</span>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {typeLabel[item.type]}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                      </div>
                      <CommandShortcut>{typeEmoji[item.type]}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
        <div className="hidden sm:flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd>
            <span className="ml-1">to close</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted">K</kbd>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};
