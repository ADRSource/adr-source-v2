import * as React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className="z-20 flex-1 pt-[var(--nav-spacing)]">{children}</div>;
}
