import { Gloock, Inter } from 'next/font/google';

export const inter = Inter({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-sans',
  fallback: ['system-ui', 'sans-serif'],
});

export const gloock = Gloock({
  display: 'swap',
  preload: true,
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  fallback: ['serif'],
  adjustFontFallback: false,
});
