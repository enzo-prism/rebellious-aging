import { describe, expect, it, vi } from 'vitest';

import { handleFacebookGroupNavigation } from '@/lib/facebook';

describe('handleFacebookGroupNavigation', () => {
  it('keeps native anchor navigation and reports success', () => {
    const onSuccess = vi.fn();
    const event = {
      defaultPrevented: false,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleFacebookGroupNavigation(event, { onSuccess });

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('reports a navigation cancelled by another click handler', () => {
    const onFailure = vi.fn();
    const event = {
      defaultPrevented: true,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleFacebookGroupNavigation(event, { onFailure });

    expect(onFailure).toHaveBeenCalledOnce();
  });
});
