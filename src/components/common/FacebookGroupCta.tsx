'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';

type FacebookLogoSize = 'xs' | 'sm' | 'md' | 'lg';
type FacebookButtonVariant = 'primary' | 'coral' | 'outline' | 'soft' | 'nav';
type FacebookButtonSize = 'sm' | 'md' | 'lg';

const logoSizes: Record<FacebookLogoSize, string> = {
  xs: 'h-5 w-5',
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

const buttonVariants: Record<FacebookButtonVariant, string> = {
  primary:
    'border-[#0866ff] bg-[#0866ff] text-white shadow-[0_18px_34px_-22px_rgba(8,102,255,0.9)] hover:bg-[#075ce5] hover:shadow-[0_22px_40px_-22px_rgba(8,102,255,0.95)]',
  coral:
    'border-coral bg-coral text-white shadow-[0_18px_34px_-24px_rgba(249,115,22,0.9)] hover:bg-coral-dark',
  outline:
    'border-[#0866ff]/30 bg-white text-[#075ce5] shadow-sm hover:border-[#0866ff]/50 hover:bg-[#0866ff]/5',
  soft:
    'border-[#0866ff]/20 bg-[#0866ff]/10 text-[#0548b8] hover:border-[#0866ff]/35 hover:bg-[#0866ff]/15',
  nav:
    'border-[#0866ff]/25 bg-white/90 text-[#075ce5] shadow-sm backdrop-blur-sm hover:border-[#0866ff] hover:bg-[#0866ff] hover:text-white',
};

const buttonSizes: Record<FacebookButtonSize, string> = {
  sm: 'min-h-[38px] px-3 py-2 text-sm',
  md: 'min-h-[44px] px-5 py-3 text-sm',
  lg: 'min-h-[48px] px-6 py-3.5 text-base',
};

interface FacebookLogoMarkProps {
  size?: FacebookLogoSize;
  className?: string;
  imgClassName?: string;
}

export const FacebookLogoMark: React.FC<FacebookLogoMarkProps> = ({
  size = 'md',
  className,
  imgClassName,
}) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm ring-1 ring-black/5',
      logoSizes[size],
      className
    )}
    aria-hidden="true"
  >
    <img
      src="/logos/facebook.svg"
      alt=""
      loading="lazy"
      decoding="async"
      className={cn('h-full w-full object-contain', imgClassName)}
    />
  </span>
);

interface FacebookGroupButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  variant?: FacebookButtonVariant;
  size?: FacebookButtonSize;
  logoSize?: FacebookLogoSize;
  showArrow?: boolean;
  onNavigateSuccess?: () => void;
  onNavigateFailure?: () => void;
}

export const FacebookGroupButton = React.forwardRef<HTMLAnchorElement, FacebookGroupButtonProps>(
  (
    {
      children = 'Join the Facebook Group',
      className,
      variant = 'primary',
      size = 'md',
      logoSize,
      showArrow = true,
      onClick,
      onNavigateSuccess,
      onNavigateFailure,
      ...props
    },
    ref
  ) => {
    const resolvedLogoSize =
      logoSize ?? (size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm');

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (!event.defaultPrevented) {
        handleFacebookGroupNavigation(event, {
          onSuccess: onNavigateSuccess,
          onFailure: onNavigateFailure,
        });
      }
    };

    return (
      <a
        ref={ref}
        href={FACEBOOK_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          'group/facebook-cta inline-flex max-w-full items-center justify-center gap-2 rounded-full border font-semibold leading-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0866ff] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        <FacebookLogoMark size={resolvedLogoSize} />
        <span className="min-w-0 text-center">{children}</span>
        {showArrow && (
          <ArrowRight
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/facebook-cta:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </a>
    );
  }
);

FacebookGroupButton.displayName = 'FacebookGroupButton';
