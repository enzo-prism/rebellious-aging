import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { VideoCard } from '@/components/home/VideoCard';
import type { VideoSeriesContent } from '@/data/videoSeries';

const video: VideoSeriesContent = {
  id: 'episode-test',
  title: 'Live Boldly',
  description: 'A test episode.',
  youtubeId: 'example-id',
  episodeNumber: 5,
  duration: '3:45',
  publishedDate: '2026-07-26',
};

describe('VideoCard', () => {
  it('gives the play control an accessible name and visible-focus styles', () => {
    render(<VideoCard video={video} />);

    const playButton = screen.getByRole('button', { name: 'Play Live Boldly' });
    expect(playButton).toHaveClass('focus-visible:outline-[4px]');
    expect(playButton).toHaveClass('focus-visible:outline-white');
  });

  it('loads the video player after activation', async () => {
    const user = userEvent.setup();
    render(<VideoCard video={video} />);

    await user.click(screen.getByRole('button', { name: 'Play Live Boldly' }));

    expect(screen.getByTitle('Live Boldly')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/example-id?autoplay=1'
    );
  });
});
