import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { DraftModeControls } from '~/components/draft-mode-controls';
import { Footer } from '~/components/footer/footer';
import { Navigation } from '~/components/navigation/navigation';
import { RootHtml } from '~/components/root-html';
import { PATHS } from '~/constants/paths.constants';
import '~/styles/global.css';

const TITLE = 'ADRsource';
const DESCRIPTION = `ADR Source is a company that provides mediation and alternative dispute resolution services. The company's team of experienced mediators has successfully handled thousands of cases across a wide range of civil litigation matters. ADR Source is dedicated to helping parties resolve their disputes in a timely and efficient manner, using the latest online mediation technologies. The company is committed to providing top-quality services and ensuring the satisfaction of its clients.`;

export const metadata: Metadata = {
  metadataBase: new URL(PATHS.absolute),
  robots: 'follow, index',
  title: {
    template: `%s - ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATHS.absolute,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml>
      <Navigation />
      {children}
      <Footer />
      <DraftModeControls />
      <Analytics />
    </RootHtml>
  );
}
