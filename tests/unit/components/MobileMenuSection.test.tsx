import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MobileMenuSection } from '@/components/ui/mobile-menu-section';

describe('MobileMenuSection', () => {
  it('expands to the full content height without clipping the final link', async () => {
    const user = userEvent.setup();
    const items = Array.from({ length: 20 }, (_, index) => ({
      to: `/section-${index + 1}`,
      label: `Section ${index + 1}`,
    }));

    render(
      <MobileMenuSection
        title="More"
        items={items}
        onItemClick={vi.fn()}
      />
    );

    const trigger = screen.getByRole('button', { name: 'More' });
    const content = document.getElementById(trigger.getAttribute('aria-controls') ?? '');

    expect(content).toHaveAttribute('hidden');
    expect(screen.getByRole('link', { name: 'Section 20', hidden: true })).toBeInTheDocument();
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).not.toHaveAttribute('hidden');
    expect(content).not.toHaveClass('max-h-96');

    const finalLink = screen.getByRole('link', { name: 'Section 20' });
    expect(finalLink).toHaveAttribute('href', '/section-20');
  });
});
