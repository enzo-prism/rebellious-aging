'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  icon?: string;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  to,
  href,
  children,
  onClick,
  icon
}) => {
  const pathname = usePathname();
  const baseClasses = cn(
    "flex items-center gap-3 py-4 px-4 min-h-[48px]",
    "transition-all duration-200",
    "hover:bg-accent/10 hover:translate-x-1",
    "focus:outline-none focus:bg-accent/10",
    "border-l-2 border-transparent hover:border-primary/30",
    "touch-manipulation"
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, "text-foreground hover:text-primary")}
        onClick={(event) => onClick?.(event)}
      >
        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  if (!to) {
    return null;
  }

  const isActive = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      href={to}
      className={cn(
        baseClasses,
        isActive ? 'text-primary font-medium bg-primary/5 border-l-primary' : 'text-foreground hover:text-primary'
      )}
      onClick={(event) => onClick?.(event)}
    >
      {icon && (
        <span className="text-lg flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </Link>
  );
};
