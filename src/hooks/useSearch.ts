import { useCallback, useEffect, useState } from 'react';
import MiniSearch, { type SearchResult } from 'minisearch';
import type { SearchDocument, SearchType } from '@/data/searchRecords';

interface SearchFilters {
  types?: SearchType[];
  tags?: string[];
}

interface SearchResultItem extends SearchDocument {
  score: number;
}

const SEARCH_INDEX_PATH = '/search-index.json';
const INDEX_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION ?? import.meta.env?.VITE_APP_VERSION ?? '';

const FIELD_BOOSTS = {
  title: 3,
  tags: 2,
  summary: 1.2,
  content: 1,
  section: 1,
};

const OR_MIN_SCORE = 5;
const OR_RELATIVE_CUTOFF = 0.3;

const GENERIC_TERMS = new Set([
  'a',
  'an',
  'and',
  'for',
  'how',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
  'without',
  'recipe',
  'recipes',
  'cook',
  'cooking',
  'meal',
  'meals',
  'video',
  'videos',
  'blog',
  'blogs',
  'post',
  'posts',
  'guide',
  'guides',
  'resource',
  'resources',
  'pillar',
  'pillars',
]);

const TERM_BOOSTS: Record<string, number> = {
  recipe: 0.35,
  recipes: 0.35,
  blog: 0.5,
  blogs: 0.5,
  post: 0.5,
  posts: 0.5,
  video: 0.5,
  videos: 0.5,
  guide: 0.55,
  guides: 0.55,
  resource: 0.55,
  resources: 0.55,
  pillar: 0.6,
  pillars: 0.6,
};

const normalizeQuery = (raw: string) => {
  let query = raw.toLowerCase();
  query = query.replace(/[-_]+/g, ' ');
  query = query.replace(/\s+/g, ' ').trim();

  const replacements: Array<[RegExp, string]> = [
    [/\bplantbased\b/g, 'plant based'],
    [/\bwfpb\b/g, 'whole food plant based'],
    [/\bwholefood\b/g, 'whole food'],
    [/\boilfree\b/g, 'oil free'],
    [/\breciepe\b/g, 'recipe'],
    [/\breceipe\b/g, 'recipe'],
    [/\brecepie\b/g, 'recipe'],
    [/\breciep\b/g, 'recipe'],
    [/\brecipp\b/g, 'recipe'],
    [/\brecipie\b/g, 'recipe'],
    [/\brecipies\b/g, 'recipes'],
    [/\bpotatoes\b/g, 'potato'],
    [/\btomatoes\b/g, 'tomato'],
    [/\bberries\b/g, 'berry'],
    [/\bsweetpotato\b/g, 'sweet potato'],
  ];

  replacements.forEach(([pattern, replacement]) => {
    query = query.replace(pattern, replacement);
  });

  return query;
};

const getFuzzyForQuery = (normalized: string, tokenCount: number) => {
  if (!normalized) return 0;
  if (tokenCount <= 1) {
    return normalized.length <= 3 ? 0 : 0.1;
  }
  if (tokenCount >= 3) {
    return 0.25;
  }
  return 0.18;
};

const getTypeBoostForQuery = (normalized: string) => {
  const wantsVideo = /\b(video|episode|watch|series)\b/.test(normalized);
  const wantsPillar = /\b(pillar|quiz|checklist)\b/.test(normalized);
  const wantsBlog = /\b(blog|post)\b/.test(normalized);
  const wantsResource = /\b(guide|nutrition|resource|download)\b/.test(normalized);
  const wantsRecipe = /\b(recipe|recipes|reciepe|receipe|recepie|recipie|cook|cooking|meal|meals|dessert|desserts|salad|salads|soup|soups|muffin|muffins)\b/.test(normalized);
  const wantsSection = /\b(tab|section|protocol|benefits|labels|b12|rebel plate|crowd out|first steps)\b/.test(normalized) || wantsResource;

  return (type: SearchType) => {
    if (wantsRecipe && type === 'recipe') return 1.6;
    if (wantsSection && type === 'section') return 1.35;
    if (wantsVideo && type === 'video') return 1.5;
    if (wantsPillar && type === 'pillar') return 1.4;
    if (wantsBlog && type === 'blog') return 1.3;
    if (wantsResource && (type === 'resource' || type === 'page')) return 1.3;
    return 1;
  };
};

const createMiniSearch = (docs: SearchDocument[]) => {
  const instance = new MiniSearch<SearchDocument>({
    fields: ['title', 'summary', 'content', 'tags', 'section'],
    storeFields: ['id', 'title', 'summary', 'path', 'type', 'tags', 'section', 'updatedAt'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  instance.addAll(docs);
  return instance;
};

interface SearchStoreState {
  loading: boolean;
  error: string | null;
  docs: SearchDocument[];
  miniSearch: MiniSearch<SearchDocument> | null;
}

let storeState: SearchStoreState = {
  loading: false,
  error: null,
  docs: [],
  miniSearch: null,
};

let docsCache: SearchDocument[] = [];
let docMapCache: Record<string, SearchDocument> = {};
let ensurePromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

const emitStoreUpdate = () => {
  listeners.forEach((listener) => listener());
};

const setStoreState = (partial: Partial<SearchStoreState>) => {
  storeState = { ...storeState, ...partial };
  emitStoreUpdate();
};

const ensureIndex = async () => {
  if (storeState.miniSearch || storeState.loading) {
    return ensurePromise ?? Promise.resolve();
  }

  if (!ensurePromise) {
    setStoreState({ loading: true, error: null });

    ensurePromise = (async () => {
      try {
        const url = INDEX_VERSION ? `${SEARCH_INDEX_PATH}?v=${INDEX_VERSION}` : SEARCH_INDEX_PATH;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Unable to load search index (${response.status})`);
        }
        const docs = (await response.json()) as SearchDocument[];
        docsCache = docs;
        docMapCache = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

        const instance = createMiniSearch(docs);
        setStoreState({ docs, miniSearch: instance });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Search index failed to load.';
        setStoreState({ error: message });

        if (!storeState.miniSearch && docsCache.length) {
          const instance = createMiniSearch(docsCache);
          setStoreState({ miniSearch: instance });
        }
      } finally {
        setStoreState({ loading: false });
        ensurePromise = null;
      }
    })();
  }

  return ensurePromise;
};

const searchIndex = (query: string, filters?: SearchFilters): SearchResultItem[] => {
  const normalized = normalizeQuery(query);
  const docs = docsCache;
  const miniSearch = storeState.miniSearch;
  const parseDate = (value?: string) => (value ? new Date(value).getTime() : 0);

  const matchesFilters = (doc: SearchDocument) => {
    if (filters?.types?.length && !filters.types.includes(doc.type)) {
      return false;
    }
    if (filters?.tags?.length) {
      const docTags = doc.tags ?? [];
      const hasAllTags = filters.tags.every((tag) => docTags.includes(tag));
      if (!hasAllTags) {
        return false;
      }
    }
    return true;
  };

  if (!normalized || !miniSearch) {
    return docs.filter(matchesFilters).slice(0, 20).map((doc) => ({ ...doc, score: 0 }));
  }

  const tokens = normalized.split(' ').filter(Boolean);
  const requiredTokens = tokens.filter((token) => !GENERIC_TERMS.has(token));
  const searchTokens = requiredTokens.length ? requiredTokens : tokens;
  const tokenCount = searchTokens.length;
  const searchQuery = searchTokens.join(' ');
  const fuzzy = getFuzzyForQuery(searchQuery, tokenCount);
  const searchOptions = {
    prefix: true,
    fuzzy,
    boost: FIELD_BOOSTS,
    boostTerm: (term: string) => TERM_BOOSTS[term] ?? 1,
  } as const;

  let rawResults = miniSearch.search(searchQuery, { ...searchOptions, combineWith: 'AND' }) as SearchResult[];

  if (!rawResults.length && tokenCount >= 2) {
    const orResults = miniSearch.search(searchQuery, { ...searchOptions, combineWith: 'OR' }) as SearchResult[];
    const topScore = orResults[0]?.score ?? 0;
    if (topScore >= OR_MIN_SCORE) {
      rawResults = orResults.filter((result) => (result.score ?? 0) >= topScore * OR_RELATIVE_CUTOFF);
    } else if (requiredTokens.length && requiredTokens.length !== tokens.length) {
      const relaxedResults = miniSearch.search(normalized, { ...searchOptions, combineWith: 'OR' }) as SearchResult[];
      const relaxedTop = relaxedResults[0]?.score ?? 0;
      if (relaxedTop) {
        rawResults = relaxedResults.filter(
          (result) => (result.score ?? 0) >= relaxedTop * OR_RELATIVE_CUTOFF
        );
      }
    }
  }

  const getTypeBoost = getTypeBoostForQuery(normalized);

  return rawResults
    .map((result) => {
      const doc = docMapCache[result.id];
      if (!doc) {
        return null;
      }
      const baseScore = result.score ?? 0;
      return { ...doc, score: baseScore * getTypeBoost(doc.type) };
    })
    .filter((item): item is SearchResultItem => Boolean(item))
    .filter(matchesFilters)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return parseDate(b.updatedAt) - parseDate(a.updatedAt);
    });
};

export const useSearch = () => {
  const [state, setState] = useState(storeState);

  useEffect(() => {
    const listener = () => {
      setState(storeState);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    void ensureIndex();
  }, []);

  const search = useCallback(
    (query: string, filters?: SearchFilters) => searchIndex(query, filters),
    []
  );

  return {
    loading: state.loading,
    error: state.error,
    docs: state.docs,
    search,
    ensureIndex,
  };
};
