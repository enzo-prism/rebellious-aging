'use client';

import React, { useEffect, useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const STORAGE_KEY = 'ra-blog-unlocked';
const ACCESS_PASSWORD = 'rebel';

interface BlogPasswordGateProps {
  children: React.ReactNode;
  /** Optional "Releasing …" date shown on the lock screen. */
  releaseLabel?: string;
}

/**
 * Lightweight client-side gate for preview/unlisted blog posts. Visitors must
 * enter the shared password before the post content is shown, and the unlock is
 * remembered for the rest of the browser session so reading several gated posts
 * only prompts once.
 *
 * Note: this is a soft gate on a statically exported site, not real security —
 * the gated content still ships inside the page bundle. It keeps casual visitors
 * and (together with noindex + sitemap exclusion) search engines out, but anyone
 * determined can read the source. Use platform-level protection for true privacy.
 */
export const BlogPasswordGate = ({ children, releaseLabel }: BlogPasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputId = useId();

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
        setUnlocked(true);
      }
    } catch {
      // Ignore environments where sessionStorage is unavailable.
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().toLowerCase() === ACCESS_PASSWORD) {
      setUnlocked(true);
      setError(false);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // Unlock still applies for this render even if storage fails.
      }
    } else {
      setError(true);
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-teal/20 bg-teal/10 p-8 text-center">
      <div className="text-4xl mb-4" aria-hidden>
        🔒
      </div>
      <h2 className="text-2xl font-semibold mb-2">This post is password protected</h2>
      {releaseLabel && (
        <p className="mb-2 font-semibold text-teal">Releasing {releaseLabel}</p>
      )}
      <p className="text-muted-foreground mb-6">
        {releaseLabel
          ? 'Have the password? Enter it below for early access. Otherwise, check back on release day.'
          : 'Enter the password to read this post. Don’t have it? Ask Suz for access.'}
      </p>

      <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Password
        </label>
        <Input
          id={inputId}
          type="password"
          autoComplete="off"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) {
              setError(false);
            }
          }}
          placeholder="Password"
          aria-invalid={error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="flex-1 bg-background"
        />
        <Button type="submit">Unlock</Button>
      </form>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-3 text-sm text-destructive">
          That password isn&apos;t right. Please try again.
        </p>
      )}
    </div>
  );
};

export default BlogPasswordGate;
