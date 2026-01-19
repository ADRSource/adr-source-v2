'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PATHS } from '~/constants/paths.constants';

export function MemberCardItem({
  name,
  url,
  headshot,
  role,
}: {
  name: string;
  url: string;
  headshot: string;
  role?: string;
}) {
  return (
    <motion.div
      className="group/card linkBox flex h-full flex-col gap-y-[calc(theme(spacing.1)*2)]"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative aspect-[4/5] w-full overflow-clip rounded-lg">
        <Image
          src={headshot}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={`${name} headshot`}
          className="scale-100 bg-brand-black object-cover object-top contrast-125 grayscale transition-all group-hover/card:scale-105 group-hover/card:filter-none"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <Link
            href={`${PATHS.team}/${url}`}
            className="linkOverlay inline-block scroll-auto font-sans text-base/tight underline decoration-transparent transition-all hover:decoration-current"
          >
            {name}
          </Link>
        </div>
        {role && <p className="text-base/tight text-brand-toffee">{role}</p>}
      </div>
    </motion.div>
  );
}
