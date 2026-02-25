'use client';

import React from 'react';
import { Facebook, Linkedin, Mail, Share2, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogShareActionsProps {
  title: string;
  url?: string;
  excerpt?: string;
  className?: string;
}

interface ShareOption {
  label: string;
  Icon: LucideIcon;
  buildHref: (url: string, title?: string, text?: string) => string;
}

const BLOG_SHARE_OPTIONS: ShareOption[] = [
  {
    label: 'Facebook',
    Icon: Facebook,
    buildHref: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    label: 'X (Twitter)',
    Icon: Twitter,
    buildHref: (url: string, title: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} — ${text}`)}`
  },
  {
    label: 'LinkedIn',
    Icon: Linkedin,
    buildHref: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  {
    label: 'Email',
    Icon: Mail,
    buildHref: (url: string, title: string, text: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
  }
] as const;

export const BlogShareActions: React.FC<BlogShareActionsProps> = ({
  title,
  url,
  excerpt,
  className
}) => {
  const [shareUrl, setShareUrl] = React.useState<string>('');
  const [supportsNativeShare, setSupportsNativeShare] = React.useState(false);

  React.useEffect(() => {
    if (url) {
      setShareUrl(url);
      return;
    }

    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, [url]);

  React.useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setSupportsNativeShare(true);
    }
  }, []);

  const handleNativeShare = React.useCallback(async () => {
    if (!supportsNativeShare || !shareUrl) {
      return;
    }

    try {
      await navigator.share({
        title,
        text: excerpt,
        url: shareUrl
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Unable to open native share dialog', error);
    }
  }, [supportsNativeShare, shareUrl, title, excerpt]);

  if (!shareUrl) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {supportsNativeShare && (
        <Button variant="secondary" size="sm" onClick={handleNativeShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      )}
      {BLOG_SHARE_OPTIONS.map(({ label, Icon, buildHref }) => {
        const href = buildHref(shareUrl, title, excerpt ?? title);
        return (
          <Button key={label} variant="outline" size="sm" asChild>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
              <Icon className="h-4 w-4" />
              {label}
            </a>
          </Button>
        );
      })}
    </div>
  );
};

export default BlogShareActions;
