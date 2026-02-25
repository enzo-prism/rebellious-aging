'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search } from "lucide-react";
import { AnimatedHamburger } from '@/components/ui/animated-hamburger';
import { MobileMenuSection } from '@/components/ui/mobile-menu-section';
import { MobileNavItem } from '@/components/ui/mobile-nav-item';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';
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
            href="/our-story"
            className={`nav-link ${isActivePath(pathname, '/our-story') ? 'active-nav-link' : ''}`}
          >
            Our Story
          </Link>
          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleFacebookGroupNavigation}
          >
            Facebook Group
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link inline-flex items-center">
              Pillars <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background border shadow-md z-[9999] min-w-[200px]">
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
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link inline-flex items-center">
              Nutrition (WFPB) <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border shadow-md z-[9999]">
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
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/recipes" className="w-full flex items-center gap-2 px-3 py-2">
                  👩‍🍳 Recipes
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            href="/recipes" 
            className={`nav-link ${isActivePath(pathname, '/recipes') ? 'active-nav-link' : ''}`}
          >
            Recipes
          </Link>
          <Link 
            href="/welcome-letter" 
            className={`nav-link ${isActivePath(pathname, '/welcome-letter') ? 'active-nav-link' : ''}`}
          >
            Welcome Letter
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link inline-flex items-center">
              Updates <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background border shadow-md z-[9999] min-w-[200px]">
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/blog" className="w-full flex items-center gap-2 px-3 py-2">
                  📝 Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-accent focus:text-accent-foreground">
                <Link href="/video-series" className="w-full flex items-center gap-2 px-3 py-2">
                  🎥 Video Series
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

          <Link 
            href="/contact" 
            className={`nav-link ${isActivePath(pathname, '/contact') ? 'active-nav-link' : ''}`}
          >
            Contact
          </Link>
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
                <MobileNavItem
                  to="/our-story"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="📖"
                >
                  Our Story
                </MobileNavItem>
                <MobileNavItem
                  href={FACEBOOK_GROUP_URL}
                  onClick={(event) =>
                    handleFacebookGroupNavigation(event, {
                      onSuccess: () => setIsMobileMenuOpen(false),
                      onFailure: () => setIsMobileMenuOpen(false),
                    })
                  }
                  icon="💬"
                >
                  Facebook Group
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
                  to="/welcome-letter"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="💌"
                >
                  Welcome Letter
                </MobileNavItem>
                <MobileNavItem
                  to="/recipes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="🍽️"
                >
                  Recipes
                </MobileNavItem>

                <MobileMenuSection
                  title="Pillars"
                  icon="🏛️"
                  defaultOpen={false}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                  items={[
                    { to: '/pillars/confidence', label: 'Confidence', icon: '🌟' },
                    { to: '/pillars/style', label: 'Style', icon: '👗' },
                    { to: '/pillars/health', label: 'Health', icon: '🌱' },
                    { to: '/pillars/health/nutrition-guide', label: 'Nutrition Guide', icon: '🥗' },
                    { to: '/pillars/health/resource-guide', label: 'Resource Guide', icon: '📚' },
                    { to: '/pillars/gratitude', label: 'Gratitude', icon: '💖' }
                  ]}
                />

                <MobileMenuSection
                  title="Nutrition (WFPB)"
                  icon="🥬"
                  defaultOpen={false}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                  items={[
                    { to: '/nutrition?tab=what-is-wfpb', label: 'What is WFPB?', icon: '🌱' },
                    { to: '/pillars/health/nutrition-guide', label: 'Nutrition Guide', icon: '🥗' },
                    { to: '/pillars/health/resource-guide', label: 'Resource Guide', icon: '📚' },
                    { to: '/nutrition?tab=benefits', label: 'Benefits', icon: '💪' },
                    { to: '/nutrition?tab=protocol', label: "Dr. Esselstyn&apos;s Protocol", icon: '❤️' },
                    { to: '/nutrition?tab=dr-campbell', label: 'Dr. T. Colin Campbell', icon: '👨‍🔬' },
                    { to: '/nutrition?tab=foods', label: 'Why &amp; How', icon: '🍎' },
                    { to: '/recipes', label: 'Recipes', icon: '👩‍🍳' }
                  ]}
                />

                <MobileMenuSection
                  title="Updates"
                  icon="📰"
                  defaultOpen={false}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                  items={[
                    { to: '/blog', label: 'Blog', icon: '📝' },
                    { to: '/video-series', label: 'Video Series', icon: '🎥' }
                  ]}
                />

                <MobileNavItem
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  icon="📧"
                >
                  Contact
                </MobileNavItem>
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
