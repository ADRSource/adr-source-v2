'use client';
import { twMerge } from 'tailwind-merge';

export function ColorBlurContainer() {
  return (
    <div
      className={twMerge(
        'pointer-events-none absolute inset-0 isolate z-10 h-screen max-h-[150vh] min-h-screen w-full overflow-x-clip md:min-h-[832px]',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-10 aspect-square w-[50%] -translate-x-1/2 translate-y-[33%] bg-[radial-gradient(closest-side,theme(colors.brand.blue),transparent)] opacity-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 bg-[radial-gradient(closest-side,theme(colors.brand.red),transparent)] opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/2 z-10 aspect-square w-[50%] translate-x-1/2 translate-y-[66%] bg-[radial-gradient(closest-side,theme(colors.brand.green),transparent)] opacity-20"
      />
    </div>
  );
}
