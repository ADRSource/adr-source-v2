'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconCalendar } from '~/components/icons/IconCalendar';
import { ButtonLink } from '~/components/ui/button';
import { PATHS } from '~/constants/paths.constants';

export function ScheduleButtonLink() {
  return (
    <ButtonLink
      icon={<IconCalendar />}
      href={PATHS.schedule}
      className="right-2 block leading-none md:absolute md:top-1/2 md:-translate-y-1/2 md:transform"
    >
      Scheduling
    </ButtonLink>
  );
}

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onLinkClick?: (href: string) => void;
}
export function NavigationLink({ href, children, onLinkClick, className }: NavigationLinkProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={href}
      className={twMerge(
        'decoration-none relative py-[calc(theme(spacing.1)/2)] text-center text-xs font-medium uppercase leading-none text-white',
        className,
      )}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        onLinkClick?.(href);
      }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-brand-copper"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </Link>
  );
}
