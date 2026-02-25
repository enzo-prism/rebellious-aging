'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MenuItem {
  to: string;
  label: string;
  icon?: string;
}

interface MobileMenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemClick: () => void;
  defaultOpen?: boolean;
  icon?: string;
}

export const MobileMenuSection: React.FC<MobileMenuSectionProps> = ({
  title,
  items,
  onItemClick,
  defaultOpen = false,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const pathname = usePathname();

  return (
    <div className="border-b border-border/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between py-3 px-4",
          "text-left font-medium text-foreground",
          "hover:bg-accent/5 transition-colors duration-200",
          "focus:outline-none focus:bg-accent/10"
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-accent/5 border-t border-border/10">
          {items.map((item, index) => (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex items-center gap-3 py-3 px-6 pl-8",
                "transition-all duration-200",
                "hover:bg-accent/10 hover:translate-x-1",
                "focus:outline-none focus:bg-accent/10",
                "border-l-2 border-transparent hover:border-primary/30",
                pathname === item.to || pathname.startsWith(`${item.to}/`)
                  ? "text-primary font-medium bg-primary/5 border-l-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={onItemClick}
            >
              {item.icon && (
                <span className="text-base flex-shrink-0">{item.icon}</span>
              )}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
