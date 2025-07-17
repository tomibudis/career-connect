'use client';

import { Suspense, useState } from 'react';
import { UserProvider } from './user-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </QueryClientProvider>
    </Suspense>
  );
};
