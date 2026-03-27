'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

import PageShareDialog from '@/components/share/PageShareDialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface PageShareButtonProps {
  url?: string;
  label?: string;
  className?: string;
}

const PageShareButton: React.FC<PageShareButtonProps> = ({
  url,
  label = 'Share',
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(url ?? '');
  const [pageTitle, setPageTitle] = React.useState('');
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'manual'>('idle');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const syncFromWindow = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        currentShareUrl: url ?? '',
        currentPageTitle: '',
      };
    }

    const currentShareUrl = url ?? window.location.href;
    const currentPageTitle = document.title;

    setShareUrl(currentShareUrl);
    setPageTitle(currentPageTitle);

    return {
      currentShareUrl,
      currentPageTitle,
    };
  }, [url]);

  React.useEffect(() => {
    syncFromWindow();
    setIsReady(true);
  }, [syncFromWindow]);

  const highlightUrl = React.useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.select();
  }, []);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    syncFromWindow();
    setCopyState('idle');

    const frame = window.requestAnimationFrame(() => {
      highlightUrl();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [highlightUrl, open, syncFromWindow]);

  const handleCopy = React.useCallback(async () => {
    if (!shareUrl) {
      return;
    }

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopyState('copied');
      toast.success('Link copied to clipboard');
    } catch {
      setCopyState('manual');
      highlightUrl();
    }
  }, [highlightUrl, shareUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!isReady}
          className={cn(
            'rounded-full border-teal/30 bg-white/90 px-4 text-teal shadow-sm hover:border-teal hover:bg-teal hover:text-white',
            !isReady && 'cursor-wait opacity-75',
            className
          )}
          onClick={() => {
            syncFromWindow();
            setCopyState('idle');
          }}
          aria-label="Share page"
        >
          <Share2 className="h-4 w-4" />
          {label}
        </Button>
      </DialogTrigger>
      <PageShareDialog
        shareUrl={shareUrl}
        pageTitle={pageTitle}
        copyState={copyState}
        inputRef={inputRef}
        onCopy={handleCopy}
        onHighlightUrl={highlightUrl}
      />
    </Dialog>
  );
};

export default PageShareButton;
