
'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const defaultQueryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children, queryClient }) => (
  <QueryClientProvider client={queryClient ?? defaultQueryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

const App = ({ children }: { children: React.ReactNode }) => (
  <AppProviders>{children}</AppProviders>
);

export default App;
