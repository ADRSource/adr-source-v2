'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { heading } from '~/components/ui/text';

type PageHeaderProps = HTMLMotionProps<'h1'> & {
  headingType?: '3' | '4' | '5' | '6';
};

export function PageHeader({ children, className, headingType = '3', ...props }: PageHeaderProps) {
  return (
    <motion.h1
      className={heading({
        type: headingType,
        className,
      })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 14,
      }}
      {...props}
    >
      {children}
    </motion.h1>
  );
}
