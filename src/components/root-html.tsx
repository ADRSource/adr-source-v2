import { gloock, inter } from '~/styles/fonts';

export function RootHtml({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${gloock.variable}`}>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta name="theme-color" content="#1B1B1B" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="relative isolate flex min-h-screen flex-col bg-brand-black text-brand-copper">
        {children}
      </body>
    </html>
  );
}
