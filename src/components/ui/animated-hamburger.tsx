import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHamburgerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  isOpen: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AnimatedHamburger = React.forwardRef<HTMLButtonElement, AnimatedHamburgerProps>(
  ({ isOpen, onClick, className, ...buttonProps }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "lg:hidden relative w-11 h-11 flex flex-col justify-center items-center",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md",
        "transition-all duration-200 hover:bg-accent/10",
        className
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      {...buttonProps}
    >
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
          isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
          isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
        )}
      />
    </button>
  )
);

AnimatedHamburger.displayName = 'AnimatedHamburger';
