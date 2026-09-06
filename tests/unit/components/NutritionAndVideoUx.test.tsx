import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockPush, mockUsePathname, mockUseSearchParams } from '../../setup';
import NutritionTabs from '@/components/nutrition/NutritionTabs';
import FeaturedRecipes from '@/components/nutrition/Recipes';
import NutritionGuide from '@/views/NutritionGuide';
import { VideoCard } from '@/components/home/VideoCard';
import { videoSeriesData } from '@/data/videoSeries';

vi.mock('@/components/seo/Seo', () => ({ default: () => null }));
vi.mock('@/components/share/PageShareButton', () => ({ default: () => null }));

describe('nutrition and video journeys', () => {
  it('falls back to real content for an unknown nutrition topic', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('tab=missing'));
    render(<NutritionTabs />);
    expect(screen.getByRole('combobox', { name: 'Choose a nutrition topic' })).toHaveValue('what-is-wfpb');
    expect(screen.getByRole('tabpanel')).not.toBeEmptyDOMElement();
  });

  it('reflects URL history changes and avoids scrolling away on topic selection', () => {
    mockUsePathname.mockReturnValue('/nutrition');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('tab=foods'));
    const { rerender } = render(<NutritionTabs />);
    const select = screen.getByRole('combobox', { name: 'Choose a nutrition topic' });
    expect(select).toHaveValue('foods');
    fireEvent.change(select, { target: { value: 'recipes' } });
    expect(mockPush).toHaveBeenCalledWith('/nutrition?tab=recipes', { scroll: false });
    mockUseSearchParams.mockReturnValue(new URLSearchParams('tab=benefits'));
    rerender(<NutritionTabs />);
    expect(select).toHaveValue('benefits');
    expect(screen.getByRole('tabpanel')).not.toBeEmptyDOMElement();
  });

  it('shows food titles without substituting branding for dish photos', () => {
    const { container } = render(<FeaturedRecipes />);
    expect(container.querySelectorAll('img')).toHaveLength(0);
    expect(screen.getByRole('link', { name: 'Explore all recipes' })).toHaveAttribute('href', '/recipes');
  });

  it('provides native guide anchors that work without click handlers', () => {
    render(<NutritionGuide />);
    expect(screen.getByRole('link', { name: /Jump to What to Eat/ })).toHaveAttribute('href', '#rebel-plate');
    expect(screen.getByRole('navigation', { name: 'In this nutrition guide' })).toBeVisible();
  });

  it('hands keyboard focus to the player and removes the episode overlay', () => {
    render(<VideoCard video={videoSeriesData[0]} />);
    const play = screen.getByRole('button', { name: `Play ${videoSeriesData[0].title}` });
    play.focus();
    fireEvent.click(play);
    expect(screen.getByTitle(videoSeriesData[0].title)).toHaveFocus();
    expect(screen.queryByText('01')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Watch on YouTube' })).toBeVisible();
  });
});
