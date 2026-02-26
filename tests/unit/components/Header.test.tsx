import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Header from '@/components/layout/Header';
import { mockUsePathname } from '../../setup';

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders primary navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Recipes' })[0]).toHaveAttribute(
      'href',
      '/recipes'
    );
    expect(screen.getByRole('link', { name: 'Facebook Group' })).toHaveAttribute(
      'href',
      'https://www.facebook.com/groups/1497629461551095/'
    );
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/blog'
    );
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  it('opens the search dialog when Search button clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const openButton = screen.getByLabelText('Open search');
    await user.click(openButton);
    expect(screen.getAllByRole('button', { name: 'Close search' })[0]).toBeInTheDocument();
  });

  it('highlights active nav path', () => {
    mockUsePathname.mockReturnValue('/recipes');
    render(<Header />);
    const recipesLink = screen.getAllByRole('link', { name: 'Recipes' })[0];
    expect(recipesLink.className).toContain('active-nav-link');
  });

  it('opens the More dropdown and exposes menu links', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const moreButton = screen.getByRole('button', { name: 'More' });
    await user.click(moreButton);

    expect(moreButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: /Our Story/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Contact/i })).toBeInTheDocument();
  });
});
