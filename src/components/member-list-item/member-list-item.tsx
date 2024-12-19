'use client';

import * as React from 'react';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { IconCalendar } from '~/components/icons/IconCalendar';
import { ButtonLink, CircleButton } from '~/components/ui/button';
import { IconLink } from '~/components/ui/link';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

interface MemberListItemProps {
  member: {
    name: string;
    url: string;
    headshot: string;
  };
  hasSchedule?: boolean;
  children?: React.ReactNode;
}
export function MemberListItem({ member, hasSchedule = true, children }: MemberListItemProps) {
  const [zIndex, setZIndex] = React.useState(0);
  const url = `${PATHS.team}/${member.url}`;

  return (
    <li
      onMouseEnter={() => {
        setZIndex(1);
      }}
      onMouseLeave={() => {
        setZIndex(0);
      }}
      style={{ zIndex }}
      className="group linkBox relative flex items-center justify-between py-2 transition-colors before:absolute before:left-0 before:top-0 before:h-[1px] before:w-full before:-translate-y-[1px] before:bg-[#716150] before:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#716150] after:content-[''] hover:before:bg-brand-copper hover:after:bg-brand-copper"
    >
      <div className="items-baseline stack-x-1">
        <p className={heading({ type: '5' })}>{member.name}</p>
        {children}
      </div>
      <div className="items-center opacity-100 transition-opacity stack-x-3 group-hover:opacity-100 md:opacity-25">
        <div className="hidden md:block">
          <IconLink
            className="p-1 text-xs font-medium uppercase leading-none text-white transition-colors hover:text-brand-copper"
            href={url}
          >
            View Bio
          </IconLink>
        </div>
        {Boolean(hasSchedule) && (
          <div className="hidden md:block">
            <ButtonLink
              icon={<IconCalendar className="h-[15px] w-[15px]" aria-hidden />}
              href={{
                pathname: url,
                hash: 'schedule',
              }}
              className="leading-none"
            >
              Scheduling <span className="sr-only">for {member.name}</span>
            </ButtonLink>
          </div>
        )}
        <div className="md:hidden">
          {Boolean(hasSchedule) ? (
            <CircleButton
              className="linkOverlay"
              href={{
                pathname: url,
                hash: 'schedule',
              }}
            >
              <IconCalendar className="h-[15px] w-[15px]" />
            </CircleButton>
          ) : (
            <CircleButton className="linkOverlay" href={url}>
              <IconArrowTopRight className="h-[15px] w-[15px]" />
            </CircleButton>
          )}
        </div>
      </div>
    </li>
  );
}
