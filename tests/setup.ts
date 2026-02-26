import React from 'react';
import { afterEach, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

export const mockUsePathname = vi.fn(() => '/');
export const mockUseSearchParams = vi.fn(() => new URLSearchParams());
export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockBack = vi.fn();

export const mockUseRouter = vi.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  refresh: vi.fn(),
}));

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: React.ComponentProps<'a'> & { href?: string }) =>
    React.createElement('a', { href, ...props }, children),
}));

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname,
  useRouter: mockUseRouter,
  useSearchParams: mockUseSearchParams,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    React.createElement('img', { src, alt, ...props }),
}));

beforeEach(() => {
  mockPush.mockReset();
  mockReplace.mockReset();
  mockBack.mockReset();
  mockUsePathname.mockReset().mockReturnValue('/');
  mockUseSearchParams.mockReset().mockReturnValue(new URLSearchParams());

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matchesMedia: false,
    })),
  });

  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    constructor(_callback: IntersectionObserverCallback) {}
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    constructor(_callback: ResizeObserverCallback) {}
  }

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });

  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    writable: true,
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
