'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  // create QueryClient — manages all data fetching and caching
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,        // data stays fresh for 60 seconds
        refetchOnWindowFocus: false,  // don't refetch when switching tabs
      },
    },
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* QueryClientProvider makes react-query available everywhere */}
        <QueryClientProvider client={queryClient}>
          {/* AuthProvider makes auth state available everywhere */}
          <AuthProvider>
            {children}
          </AuthProvider>
          {/* DevTools shows query state in browser — development only */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}