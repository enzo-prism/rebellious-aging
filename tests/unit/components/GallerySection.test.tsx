import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import GallerySection from '@/components/pillar/GallerySection';
import type { PillarContent } from '@/data/pillarContent';

const content: PillarContent = {
  title: 'Confidence',
  description: 'Confidence pillar',
  quizTitle: 'Quiz',
  quizDescription: 'Quiz description',
  checklistTitle: 'Checklist',
  checklistUrl: '/checklist',
  galleryImages: [
    {
      src: '/first.png',
      description: 'First gallery image',
      width: 997,
      height: 1562,
    },
    {
      src: '/second.png',
      description: 'Second gallery image',
      width: 1080,
      height: 1620,
    },
  ],
};

describe('GallerySection', () => {
  it('loads only the selected image with responsive dimensions', () => {
    render(<GallerySection content={content} />);

    const firstImage = screen.getByRole('img', { name: 'First gallery image' });
    expect(firstImage).toHaveAttribute('loading', 'lazy');
    expect(firstImage).toHaveAttribute('decoding', 'async');
    expect(firstImage).toHaveAttribute('width', '997');
    expect(firstImage).toHaveAttribute('height', '1562');
    expect(firstImage).toHaveAttribute(
      'sizes',
      '(min-width: 640px) 512px, calc(100vw - 2rem)'
    );
    expect(screen.queryByRole('img', { name: 'Second gallery image' })).not.toBeInTheDocument();
  });
});
