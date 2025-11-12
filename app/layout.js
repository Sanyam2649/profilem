'use client';

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { UserProvider } from '@/contexts/UserContext';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar/footer for profile pages like /[profileId] or /profile/[id]
  const isProfilePage = /^\/(?:profile\/)?[a-f0-9]{24}$/i.test(pathname || '');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          {!isProfilePage && <Navbar />}
          {children}
          {!isProfilePage && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
