'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { UserProvider } from '@/contexts/UserContext';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isProfilePage = /^\/(?:profile\/)?[a-f0-9]{24}$/i.test(pathname || '');

  return (
    <html lang="en">
      <body>
        <UserProvider>
          {!isProfilePage && <Navbar />}
          {children}
          {!isProfilePage && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
