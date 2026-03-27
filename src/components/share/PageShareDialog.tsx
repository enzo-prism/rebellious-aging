'use client';

import React from 'react';
import { Check, Copy, Link2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type CopyState = 'idle' | 'copied' | 'manual';

interface PageShareDialogProps {
  shareUrl: string;
  pageTitle: string;
  copyState: CopyState;
  inputRef: React.RefObject<HTMLInputElement>;
  onCopy: () => Promise<void> | void;
  onHighlightUrl: () => void;
}

const PageShareDialog: React.FC<PageShareDialogProps> = ({
  shareUrl,
  pageTitle,
  copyState,
  inputRef,
  onCopy,
  onHighlightUrl,
}) => {
  const manualCopyHelp =
    'Clipboard access is unavailable. The link is highlighted below, so you can press Cmd/Ctrl+C to copy it.';
  const inputId = React.useId();
  const helperId = `${inputId}-helper`;

  const description = pageTitle
    ? `Copy the link for ${pageTitle} and share it anywhere you like.`
    : 'Copy this page link and share it anywhere you like.';

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Share this page</DialogTitle>
        <DialogDescription>
          {copyState === 'manual' ? manualCopyHelp : description}
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-2xl border border-teal/25 bg-teal/10 p-4">
        <label
          htmlFor={inputId}
          className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900"
        >
          <Link2 className="h-4 w-4" />
          Page link
        </label>
        <Input
          id={inputId}
          ref={inputRef}
          value={shareUrl}
          readOnly
          onFocus={onHighlightUrl}
          onClick={onHighlightUrl}
          className="h-12 rounded-xl border-teal/20 bg-white font-mono text-sm"
          aria-describedby={helperId}
        />
        <p
          id={helperId}
          className="mt-2 text-xs text-slate-800"
        >
          {copyState === 'copied'
            ? 'Copied to clipboard.'
            : 'Anyone with this link can open the page directly.'}
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Close
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={onCopy}
          className="bg-teal-dark text-white hover:bg-teal"
          disabled={!shareUrl}
        >
          {copyState === 'copied' ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy URL
            </>
          )}
        </Button>
      </div>
    </DialogContent>
  );
};

export default PageShareDialog;
