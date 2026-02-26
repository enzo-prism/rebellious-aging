import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import type { SearchDocument } from '@/data/searchRecords';

const searchDocs: SearchDocument[] = [
  {
    id: 'recipe-1',
    type: 'recipe',
    title: 'Apple Salad',
    path: '/recipes/apple-salad',
    summary: 'A crunchy and sweet start to your day.',
    tags: ['recipe', 'salad'],
  },
  {
    id: 'blog-1',
    type: 'blog',
    title: 'Plant-Based Basics',
    path: '/blog/plant-basics',
    summary: 'A guide for first-time readers.',
    tags: ['blog'],
  },
];

describe('useSearch hook', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  beforeEach(async () => {
    fetchSpy = vi.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => searchDocs,
      } as Response)
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchSpy;
    await Promise.resolve();
  });

  it('loads index and returns docs on empty query', async () => {
    const useSearch = (await import('@/hooks/useSearch')).useSearch;
    const { result } = renderHook(() => useSearch());

    await waitFor(() => {
      expect(result.current.docs.length).toBe(searchDocs.length);
      expect(result.current.loading).toBe(false);
    });

    const results = result.current.search('');
    expect(results.length).toBe(2);
  });

  it('filters by query terms and type filters', async () => {
    const useSearch = (await import('@/hooks/useSearch')).useSearch;
    const { result } = renderHook(() => useSearch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const recipesOnly = result.current.search('apple', { types: ['recipe'] });
    expect(recipesOnly.length).toBe(1);
    expect(recipesOnly.every((item) => item.type === 'recipe')).toBe(true);
  });

  it('captures search index fetch errors as state errors', async () => {
    fetchSpy.mockResolvedValue({ ok: false, status: 500 } as Response);
    const useSearch = (await import('@/hooks/useSearch')).useSearch;
    const { result } = renderHook(() => useSearch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('Unable to load search index (500)');
  });
});
