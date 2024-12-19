import { heading } from '~/components/ui/text';

type ErrorViewProps = ({ type: '404' } | { type: '500' }) & { children?: React.ReactNode };

export function ErrorView({ children, type }: ErrorViewProps) {
  const content = ERROR_VIEW_CONTENT[type];

  return (
    <>
      <div className="relative z-10 flex-1 pt-[calc(theme(spacing.1)_+_theme(spacing.nav-height))] md:pt-[calc(theme(spacing.2)_+_theme(spacing.nav-height))]">
        <main className="mx-auto max-w-[1058px] px-2 pb-7 pt-6">
          <div className="relative z-20 stack-y-4">
            <h1
              className={heading({
                type: '3',
                className: 'text-center',
              })}
            >
              {content.heading}
            </h1>

            <p
              className={heading({
                type: '5',
                className: '[text-wrap: balance] mx-auto text-center',
              })}
            >
              {content.body}
            </p>

            <div className="flex justify-center">{children}</div>
          </div>

          <div className="pointer-events-none absolute inset-0 isolate z-10 h-full w-full overflow-x-clip">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 z-10 aspect-square w-[50%] -translate-x-1/2 translate-y-[33%] rounded-full bg-brand-blue opacity-10 blur-[70px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 rounded-full bg-brand-red opacity-20 blur-[70px]"
            />
          </div>
        </main>
      </div>
    </>
  );
}

const ERROR_VIEW_CONTENT: Record<
  ErrorViewProps['type'],
  {
    heading: string | React.ReactNode;
    body: string | React.ReactNode;
  }
> = {
  '404': {
    heading: (
      <>
        404 <span className="sr-only">- Page Not Found</span>
      </>
    ),
    body: "We were unable to locate the page you're looking for.",
  },
  '500': {
    heading: (
      <>
        500 <span className="sr-only">- Error</span>
      </>
    ),
    body: 'An unexpected error has occurred.',
  },
};
