import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PageShareButton from '@/components/share/PageShareButton';
import { toast } from '@/components/ui/sonner';
import { mockUsePathname, mockUseSearchParams } from '../../setup';

const setLocation = (url: string) => {
  window.history.pushState({}, '', url);
};

describe('PageShareButton', () => {
  beforeEach(() => {
    vi.spyOn(toast, 'success').mockImplementation(() => '' as never);
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  });

  it('opens the dialog, shows the current URL, and closes again', async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue('/nutrition');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('tab=benefits'));
    document.title = 'Nutrition | Rebellious Aging';
    setLocation('/nutrition?tab=benefits');

    render(<PageShareButton />);

    await user.click(screen.getByRole('button', { name: /share page/i }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByLabelText(/page link/i)).toHaveValue(window.location.href);

    await user.click(within(dialog).getAllByRole('button', { name: /^close$/i })[0]);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('copies the current URL to the clipboard', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: { writeText },
    });

    mockUsePathname.mockReturnValue('/blog');
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    document.title = 'Blog | Rebellious Aging';
    setLocation('/blog');

    render(<PageShareButton />);

    await user.click(screen.getByRole('button', { name: /share page/i }));
    await user.click(screen.getByRole('button', { name: /copy url/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(window.location.href);
    });
    expect(toast.success).toHaveBeenCalledWith('Link copied to clipboard');
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
  });

  it('falls back to manual copy guidance when clipboard access fails', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error('blocked'));

    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: { writeText },
    });

    mockUsePathname.mockReturnValue('/search');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('q=greens'));
    document.title = 'Search | Rebellious Aging';
    setLocation('/search?q=greens');

    render(<PageShareButton />);

    await user.click(screen.getByRole('button', { name: /share page/i }));
    await user.click(screen.getByRole('button', { name: /copy url/i }));

    await waitFor(() => {
      expect(screen.getByText(/clipboard access is unavailable/i)).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/page link/i) as HTMLInputElement;
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  });
  it('offers device sharing when available using the exact current URL', async () => {
    const user = userEvent.setup();
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    setLocation('/nutrition?tab=benefits');
    document.title = 'Nutrition';
    render(<PageShareButton />);
    await user.click(screen.getByRole('button', { name: /share page/i }));
    await user.click(screen.getByRole('button', { name: 'Share using your device' }));
    expect(share).toHaveBeenCalledWith({ title: 'Nutrition', url: window.location.href });
  });

  it('treats cancellation of device sharing as normal', async () => {
    const user = userEvent.setup();
    const share = vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError'));
    const toastError = vi.spyOn(toast, 'error');
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    render(<PageShareButton />);
    await user.click(screen.getByRole('button', { name: /share page/i }));
    await user.click(screen.getByRole('button', { name: 'Share using your device' }));
    await waitFor(() => expect(share).toHaveBeenCalled());
    expect(toastError).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /copy url/i })).toBeEnabled();
  });

  it('keeps a copyable link when device sharing fails', async () => {
    const user = userEvent.setup();
    const share = vi.fn().mockRejectedValue(new Error('Unavailable'));
    vi.spyOn(toast, 'error').mockImplementation(() => '' as never);
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    render(<PageShareButton />);
    await user.click(screen.getByRole('button', { name: /share page/i }));
    await user.click(screen.getByRole('button', { name: 'Share using your device' }));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Device sharing is unavailable. Copy the page link instead.'));
    expect(document.activeElement).toBe(screen.getByLabelText(/page link/i));
  });

});
