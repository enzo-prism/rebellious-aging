import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LiveLoudHat from '@/views/LiveLoudHat';

vi.mock('@/components/seo/Seo', () => ({ default: () => null }));
vi.mock('@/components/hat/LiveLoudHatForm', () => ({
  default: () => <form aria-label="Ask for a hat" />,
}));

describe('LiveLoudHat', () => {
  it('does not double-pad under the sticky header', () => {
    const { container } = render(<LiveLoudHat />);
    const page = container.firstElementChild;

    expect(page).toBeTruthy();
    expect(page?.className).not.toMatch(/\bpt-24\b/);
    expect(page?.className).toMatch(/from-white/);
    expect(page?.className).toMatch(/via-teal\/5/);

    const hero = container.querySelector('section');
    expect(hero?.className).toMatch(/\bpt-6\b/);
    expect(hero?.className).not.toMatch(/\bpy-12\b/);
    expect(hero?.className).not.toMatch(/\bpt-24\b/);
  });

  it('keeps the invite-only hero and waitlist heading', () => {
    render(<LiveLoudHat />);

    expect(screen.getByRole('heading', { level: 1, name: 'The Rebellious Aging hats' })).toBeInTheDocument();
    expect(screen.getByText(/Invite-only waitlist/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ask for the next batch' })).toBeInTheDocument();
  });

  it('shows both real hat photos with descriptive alt text', () => {
    render(<LiveLoudHat />);

    expect(screen.getByRole('heading', { name: 'The Live Loud! hat' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'The R hat' })).toBeInTheDocument();
    expect(screen.getByAltText(/two Rebellious Aging hats side by side/i)).toHaveAttribute(
      'src',
      '/hats/rebellious-aging-hats-pair-lg.webp'
    );
    expect(screen.getByAltText(/Live Loud!.*lime-green script/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Rebellious Aging R logo, a butterfly/i)).toBeInTheDocument();
    expect(screen.queryByText(/green cap/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/photos are coming/i)).not.toBeInTheDocument();
  });
});
