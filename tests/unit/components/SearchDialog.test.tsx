import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchDialog } from '@/components/search/SearchDialog';

import type { SearchDocument } from '@/data/searchRecords';

const docs: SearchDocument[] = [
  {
    id: 'r1',
    type: 'recipe',
    title: 'Banana Oat Muffins',
    path: '/recipes/banana-oat-muffins',
    summary: 'A soft and sweet breakfast favorite.',
    tags: ['recipe', 'dessert'],
  },
  {
    id: 'b1',
    type: 'blog',
    title: 'Rebellious Aging Basics',
    path: '/blog/rebellious-aging-basics',
    summary: 'Foundations for a joyful approach to aging.',
    tags: ['blog'],
  },
];

const mockUseSearch = {
  search: (query: string) => {
    const normalized = query.toLowerCase();
    return docs.filter((item) => item.title.toLowerCase().includes(normalized));
  },
  docs,
  loading: false,
  error: '',
  ensureIndex: vi.fn(() => Promise.resolve()),
};

vi.mock('@/hooks/useSearch', () => ({
  useSearch: () => mockUseSearch,
}));

describe('SearchDialog', () => {
  beforeEach(() => {
    mockUseSearch.ensureIndex.mockClear();
  });

  it('does not load the index while the global dialog stays closed', () => {
    render(<SearchDialog open={false} onOpenChange={vi.fn()} />);

    expect(mockUseSearch.ensureIndex).not.toHaveBeenCalled();
  });

  it('shows results and supports filtering by recipe', async () => {
    const user = userEvent.setup();
    render(<SearchDialog open onOpenChange={vi.fn()} />);

    await waitFor(() => {
      expect(mockUseSearch.ensureIndex).toHaveBeenCalledTimes(1);
    });

    const input = screen.getByPlaceholderText('Search recipes, blog posts, speaking events, nutrition...');
    await user.type(input, 'banana');

    expect(screen.getByText('Banana Oat Muffins')).toBeInTheDocument();
    expect(screen.queryByText('Rebellious Aging Basics')).not.toBeInTheDocument();
    expect(screen.getByText('A soft and sweet breakfast favorite.')).toHaveClass(
      'group-data-[selected=true]:text-accent-foreground'
    );

    await user.click(screen.getByRole('button', { name: 'Recipes' }));
    await user.click(screen.getByText('Banana Oat Muffins'));
    expect(screen.getByRole('button', { name: 'Close search' })).toBeInTheDocument();
  });
});
