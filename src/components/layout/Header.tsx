'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, ExternalLink } from "lucide-react";
import { AnimatedHamburger } from '@/components/ui/animated-hamburger';
import { MobileMenuSection } from '@/components/ui/mobile-menu-section';
import { MobileNavItem } from '@/components/ui/mobile-nav-item';
import { FacebookGroupButton } from '@/components/common/FacebookGroupCta';
import { SUBSTACK_URL } from '@/lib/constants';
import { SearchDialog } from '@/components/search/SearchDialog';

const getLinkBase = (path: string) => path.split('?')[0];
const isActivePath = (pathname: string, target: string) => {
  const base = getLinkBase(target);
  if (base === '/') {
    return pathname === '/';
  }
  return pathname === base || pathname.startsWith(`${base}/`);
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/lovable-uploads/996bea95-9371-4561-b396-1e00f4198ca3.png" 
            alt="Rebellious Aging Logo" 
            className="h-12 w-auto transition-transform hover:scale-105 animate-logo-glow rounded-lg"
          />
        </Link>

        <AnimatedHamburger
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <nav className="hidden lg:flex items-center space-x-1">
          <Link 
            href="/" 
            className={`nav-link ${isActivePath(pathname, '/') ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className={`nav-link ${isActivePath(pathname, '/blog') ? 'active-nav-link' : ''}`}
          >
            Blog
          </Link>
          <Link 
            href="/recipes" 
            className={`nav-link ${isActivePath(pathname, '/recipes') ? 'active-nav-link' : ''}`}
          >
            Recipes
          </Link>
          <FacebookGroupButton variant="nav" size="sm" showArrow={false} className="ml-1">
            Facebook Group
          </FacebookGroupButton>

          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link inline-flex items-center">
              More <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-background border shadow-md z-[9999] min-w-[240px]">
              <DropdownMenuLabel className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Discover
              </DropdownMenuLabel>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/our-story" className="w-full flex items-center gap-2 px-3 py-2">
                  📖 Our Story
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/welcome-letter" className="w-full flex items-center gap-2 px-3 py-2">
                  💌 Welcome Letter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/events" className="w-full flex items-center gap-2 px-3 py-2">
                  📅 Community Events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/speaking-events" className="w-full flex items-center gap-2 px-3 py-2">
                  🎤 Speaking Events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/dr-seuss" className="w-full flex items-center gap-2 px-3 py-2">
                  📚 Dr. Seuss &amp; Aging
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="px-3 pt-2 pb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Pillars
              </DropdownMenuLabel>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/confidence" className="w-full flex items-center gap-2 px-3 py-2">
                  🌟 Confidence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/style" className="w-full flex items-center gap-2 px-3 py-2">
                  👗 Style
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/health" className="w-full flex items-center gap-2 px-3 py-2">
                  🌱 Health
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/gratitude" className="w-full flex items-center gap-2 px-3 py-2">
                  💖 Gratitude
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="px-3 pt-2 pb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Nutrition (WFPB)
              </DropdownMenuLabel>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/nutrition?tab=what-is-wfpb" className="w-full flex items-center gap-2 px-3 py-2">
                  🌱 What is WFPB?
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/health/nutrition-guide" className="w-full flex items-center gap-2 px-3 py-2">
                  🥗 Nutrition Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/pillars/health/resource-guide" className="w-full flex items-center gap-2 px-3 py-2">
                  📚 Resource Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/nutrition?tab=benefits" className="w-full flex items-center gap-2 px-3 py-2">
                  💪 Benefits
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/nutrition?tab=protocol" className="w-full flex items-center gap-2 px-3 py-2">
                  ❤️ Dr. Esselstyn&apos;s Protocol
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/nutrition?tab=dr-campbell" className="w-full flex items-center gap-2 px-3 py-2">
                  👨‍🔬 Dr. T. Colin Campbell
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/nutrition?tab=foods" className="w-full flex items-center gap-2 px-3 py-2">
                  🍎 Why &amp; How
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/video-series" className="w-full flex items-center gap-2 px-3 py-2">
                  🎥 Video Series
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/contact" className="w-full flex items-center gap-2 px-3 py-2">
                  📧 Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-teal hover:bg-teal/10 lg:hidden"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-teal text-teal hover:bg-teal hover:text-white hidden lg:inline-flex"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-coral text-white hover:bg-coral-dark hidden lg:inline-flex"
          >
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
              Substack
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>

        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed top-[80px] left-0 w-full bg-background/95 backdrop-blur-md shadow-lg border-b animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto z-[9998]">
            <div className="min-h-0">
              <nav className="flex flex-col">
                <MobileNavItem
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="🏠"
                >
                  Home
                </MobileNavItem>
                <FacebookGroupButton
                  variant="soft"
                  size="md"
                  showArrow={false}
                  className="mx-3 my-2 justify-start rounded-xl border-[#0866ff]/25 px-4"
                  onNavigateSuccess={() => setIsMobileMenuOpen(false)}
                  onNavigateFailure={() => setIsMobileMenuOpen(false)}
                >
                  Facebook Group
                </FacebookGroupButton>
                <MobileNavItem
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="📝"
                >
                  Blog
                </MobileNavItem>
                <MobileNavItem
                  to="/recipes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="🍽️"
                >
                  Recipes
                </MobileNavItem>
                <MobileNavItem
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  icon="🔍"
                >
                  Search
                </MobileNavItem>
                <MobileNavItem
                  href={SUBSTACK_URL}
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="📬"
                >
                  Substack
                </MobileNavItem>
                <MobileMenuSection
                  title="More"
                  icon="➕"
                  defaultOpen={false}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                  items={[
                    { to: '/our-story', label: 'Our Story', icon: '📖' },
                    { to: '/welcome-letter', label: 'Welcome Letter', icon: '💌' },
                    { to: '/events', label: 'Community Events', icon: '📅' },
                    { to: '/speaking-events', label: 'Speaking Events', icon: '🎤' },
                    { to: '/dr-seuss', label: 'Dr. Seuss & Aging', icon: '📚' },
                    { to: '/pillars/confidence', label: 'Pillars: Confidence', icon: '🌟' },
                    { to: '/pillars/style', label: 'Pillars: Style', icon: '👗' },
                    { to: '/pillars/health', label: 'Pillars: Health', icon: '🌱' },
                    { to: '/pillars/gratitude', label: 'Pillars: Gratitude', icon: '💖' },
                    { to: '/nutrition?tab=what-is-wfpb', label: 'Nutrition: What is WFPB?', icon: '🌱' },
                    { to: '/pillars/health/nutrition-guide', label: 'Nutrition: Guide', icon: '🥗' },
                    { to: '/pillars/health/resource-guide', label: 'Nutrition: Resource Guide', icon: '📚' },
                    { to: '/nutrition?tab=benefits', label: 'Nutrition: Benefits', icon: '💪' },
                    { to: '/nutrition?tab=protocol', label: "Nutrition: Dr. Esselstyn's Protocol", icon: '❤️' },
                    { to: '/nutrition?tab=dr-campbell', label: 'Nutrition: Dr. T. Colin Campbell', icon: '👨‍🔬' },
                    { to: '/nutrition?tab=foods', label: 'Nutrition: Why & How', icon: '🍎' },
                    { to: '/video-series', label: 'Video Series', icon: '🎥' },
                    { to: '/contact', label: 'Contact', icon: '📧' },
                  ]}
                />
              </nav>
            </div>
          </div>
        )}
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
