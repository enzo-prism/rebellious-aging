import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Layout from '@/components/layout/Layout';

vi.mock('@/components/layout/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('@/components/layout/Footer', () => ({
  default: () => <footer>Footer</footer>,
}));

describe('Layout', () => {
  it('provides a skip link with a focusable main-content target', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(
      <Layout>
        <h1>Page content</h1>
      </Layout>
    );

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content'
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });
});
