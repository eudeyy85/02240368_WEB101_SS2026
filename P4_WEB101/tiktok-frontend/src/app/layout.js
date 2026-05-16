import { Geist, Geist_Mono } from 'next/font/google';  // import fonts
import './globals.css';                                   // import global styles
import { AuthProvider } from '../context/AuthContext';   // import auth provider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// metadata for the app (shows in browser tab)
export const metadata = {
  title: 'TikTok Clone',
  description: 'A TikTok clone built with Next.js and Express',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f1f1f2] text-black`}>
        {/* wrap entire app with AuthProvider so all pages can access auth state */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
