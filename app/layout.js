'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { UserProvider } from '@/contexts/UserContext';
import { Roboto } from 'next/font/google';   
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],         // choose weights you need
  variable: '--font-roboto',                    // optional CSS variable
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isProfilePage = /^\/(?:profile\/)?[a-f0-9]{24}$/i.test(pathname || '');

  return (
    <html lang="en" className={roboto.variable}>   {/* Add class here */}
      <body className="font-roboto">               {/* Use font */}
        <UserProvider>
          {!isProfilePage && <Navbar />}
          {children}
          {!isProfilePage && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
