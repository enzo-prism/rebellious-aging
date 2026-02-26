import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders core footer navigation links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Our Story' })).toHaveAttribute('href', '/our-story');
    expect(screen.getByRole('link', { name: 'Welcome Letter' })).toHaveAttribute('href', '/welcome-letter');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: 'Video Series' })).toHaveAttribute('href', '/video-series');
  });

  it('renders copyright and disclaimer copy', () => {
    render(<Footer />);
    expect(screen.getAllByText(/Rebellious Aging/i)).toHaveLength(2);
    expect(screen.getByText(/Medical Disclaimer/i)).toBeInTheDocument();
  });
});
