import Link from 'next/link';
import * as React from 'react';
import { PATHS } from '~/constants/paths.constants';
import { IconLogo } from '../icons/IconLogo';
import { heading } from '../ui/text';
import { CallToAction } from './call-to-action';

export function Footer() {
  return (
    <footer className="z-10 w-full px-2 pb-2 selection:bg-brand-black/80 selection:text-brand-copper">
      <div className="rounded-lg bg-brand-copper pt-5 text-brand-black md:pt-6">
        <CallToAction />
        <div className="justify-between px-2 py-5 stack-y-3 md:px-4 md:py-6 md:stack-x-3">
          <FooterListSection title="Navigate">
            <FooterList>
              <FooterListItem>
                <FooterInternalLink href={PATHS.team}>Team</FooterInternalLink>
              </FooterListItem>
              <FooterListItem>
                <FooterInternalLink href={PATHS.about}>About</FooterInternalLink>
              </FooterListItem>
              <FooterListItem>
                <FooterInternalLink href={PATHS.resources}>Resources</FooterInternalLink>
              </FooterListItem>
            </FooterList>
          </FooterListSection>
          <FooterListSection title="Contact">
            <FooterList>
              <FooterListItem>
                <p className="text-xs uppercase leading-none">M-F 9am - 5pm EST</p>
              </FooterListItem>
              <FooterListItem>
                <FooterExternalLink href="tel:888-741-2224">
                  <span className="sr-only">Call</span>
                  (888) 741-2224
                </FooterExternalLink>
              </FooterListItem>
              <FooterListItem>
                <FooterExternalLink href={PATHS.linkedin}>LinkedIn</FooterExternalLink>
              </FooterListItem>
            </FooterList>
          </FooterListSection>
          <FooterListSection title="Legal + Credit">
            <FooterList>
              <FooterListItem>
                <IconLogo className="h-[30px] w-auto" theme="monoDark" />
              </FooterListItem>
              <FooterListItem>
                <p className="text-xs uppercase leading-none">&copy;2023 ADRsource, LLC</p>
              </FooterListItem>
              <FooterListItem>
                <FooterExternalLink href={PATHS.hunter}>Code by Hunter</FooterExternalLink>
              </FooterListItem>
            </FooterList>
          </FooterListSection>
        </div>

        {/* TAGLINE */}
        <p className="font-base border-t border-solid border-brand-black/25 px-2 py-2 text-center font-sans font-medium">
          Solving the world&apos;s problems&hellip;one case at a time
        </p>
      </div>
    </footer>
  );
}

interface FooterListSectionProps {
  children: React.ReactNode;
  title: string;
}
function FooterListSection({ children, title }: FooterListSectionProps) {
  return (
    <div className="stack-y-2 md:stack-y-3">
      <h2 className={heading({ type: '6', className: 'text-xl md:text-2xl' })}>{title}</h2>
      {children}
    </div>
  );
}

interface FooterListProps {
  children: React.ReactNode;
}
function FooterList({ children }: FooterListProps) {
  return <ul className="stack-y-2">{children}</ul>;
}

interface FooterListItemProps {
  children: React.ReactNode;
}
function FooterListItem({ children }: FooterListItemProps) {
  return <li className="flex">{children}</li>;
}

interface FooterInternalLinkProps {
  children: React.ReactNode;
  href: string;
}
function FooterInternalLink({ children, href }: FooterInternalLinkProps) {
  return (
    <Link
      href={href}
      className="decoration-none text-xs uppercase leading-none focus-visible:ring-brand-black focus-visible:ring-offset-brand-copper"
    >
      {children}
    </Link>
  );
}

interface FooterExternalLinkProps {
  children: React.ReactNode;
  href: string;
}
function FooterExternalLink({ children, href }: FooterExternalLinkProps) {
  return (
    <a
      href={href}
      className="decoration-none text-xs uppercase leading-none focus-visible:ring-brand-black focus-visible:ring-offset-brand-copper"
    >
      {children}
    </a>
  );
}
