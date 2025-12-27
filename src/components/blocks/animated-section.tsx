'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 30,
        mass: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
}
