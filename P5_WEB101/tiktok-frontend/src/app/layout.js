'use client';  // run in browser

import { Inter } from 'next/font/google';           // google font
import './globals.css';                              // global styles
import { AuthProvider } from '../context/AuthContext'; // auth context
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // tanstack query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';       // devtools for debugging
import { useState } from 'react';                   // for creating query client

const inter = Inter({ subsets: ['latin'] });         // load Inter font

export default function RootLayout({ children }) {
  // create QueryClient inside component so each user gets their own instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,  // data stays fresh for 60 seconds before refetching
        refetchOnWindowFocus: false,  // don't refetch when user switches tabs
      },
    },
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* QueryClientProvider makes react-query available to all components */}
        <QueryClientProvider client={queryClient}>
          {/* AuthProvider makes auth state available to all components */}
          <AuthProvider>
            {children}
          </AuthProvider>
          {/* DevTools shows query state in browser — only in development */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
