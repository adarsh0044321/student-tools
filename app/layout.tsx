import '../src/index.css';
import React from 'react';
import { Layout } from '../src/components/Layout';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: {
    default: 'Student Tools | Free Online PDF & Document Tools for Students',
    template: '%s | Student Tools'
  },
  description: 'Merge, split, compress, convert, rotate, protect and watermark PDFs online. 100% free, secure and client-side tool specifically built for student productivity.',
  metadataBase: new URL('https://student-tools-seven.vercel.app'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Student Tools | Free Online PDF & Document Tools',
    description: '100% free offline-first browser tools to edit PDFs, count words, and calculate CGPA.',
    url: 'https://student-tools-seven.vercel.app',
    siteName: 'Student Tools',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 500,
        alt: 'Student Tools Logo'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Tools | Free Online PDF & Document Tools',
    description: '100% free offline-first browser tools to edit PDFs, count words, and calculate CGPA.',
    images: ['/logo.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Anti-adblocker global scripts */}
        <script src="https://heavenlysuspicious.com/b2/ff/4b/b2ff4b12635a5ecb91d0e85187af589f.js" async></script>
        <script src="https://heavenlysuspicious.com/34/0c/03/340c037d9ac17ee3d02e02900b2f07bc.js" async></script>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
