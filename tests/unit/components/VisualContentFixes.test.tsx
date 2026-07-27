import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NutritionTabs from '@/components/nutrition/NutritionTabs';
import Events from '@/views/Events';
import Recipes from '@/views/Recipes';

vi.mock('@/components/common/ConnectCTA', () => ({ default: () => null }));
vi.mock('@/components/seo/Seo', () => ({ default: () => null }));
vi.mock('@/components/share/PageShareButton', () => ({ default: () => null }));
vi.mock('@/components/share/PageTopUtilityRow', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('visual content audit fixes', () => {
  it('requires Facebook membership without putting the group link inside the membership label', () => {
    render(<Events />);

    const membership = screen.getByRole('checkbox', {
      name: /I'm a member of the Rebellious Aging Facebook group/i,
    });
    const submit = screen.getByRole('button', { name: 'Email my availability' });
    const joinLink = screen.getByRole('link', { name: /Not yet\? Join the group/i });

    expect(membership).toHaveAttribute('aria-required', 'true');
    expect(submit).toBeDisabled();
    expect(joinLink.closest('label')).toBeNull();

    fireEvent.click(membership);
    expect(submit).toBeEnabled();
  });

  it('shows every desktop nutrition topic in a wrapping grid', () => {
    render(<NutritionTabs />);

    expect(screen.getAllByRole('tab')).toHaveLength(7);
    expect(screen.getByRole('tablist')).toHaveClass('grid', 'lg:grid-cols-4');
  });

  it('uses a neutral recipe placeholder instead of the site social logo', () => {
    const { container } = render(<Recipes />);

    expect(container.querySelectorAll('[data-recipe-image-placeholder]').length).toBeGreaterThan(0);
    expect(
      container.querySelector('img[src="/lovable-uploads/a1a9d206-a3d9-4f72-aa2b-aea608628d3c.png"]')
    ).not.toBeInTheDocument();
  });
});
