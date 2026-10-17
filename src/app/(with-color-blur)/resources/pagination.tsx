import { twMerge } from 'tailwind-merge';
import { getPageParam } from '~/app/(with-color-blur)/resources/utils/getPageParam';
import { IconArrowLeft } from '~/components/icons/IconArrowLeft';
import { IconArrowRight } from '~/components/icons/IconArrowRight';
import { CircleButton } from '~/components/ui/button';

interface PaginationProps {
  pageSize: number;
  paramKey: string;
  siblingCount: number;
  searchParams: Record<string, string | string[] | undefined>;
}
export function Pagination({ pageSize, paramKey, siblingCount, searchParams }: PaginationProps) {
  const currentPage = getPageParam(paramKey, searchParams);
  const pages = getTransformedRange({
    page: currentPage,
    totalPages: pageSize,
    siblingCount,
  });

  return (
    pageSize > 1 && (
      <div>
        <nav>
          <ul className="justify-between stack-x-1">
            <li>
              <CircleButton
                href={{
                  query: {
                    [paramKey]: Math.max(currentPage - 1, 1),
                  },
                }}
                ghost
              >
                <IconArrowLeft />
              </CircleButton>
            </li>
            <li>
              <ul className="stack-x-[4px] sm:stack-x-1">
                {pages.map((page, i) => {
                  if (page.type === 'page')
                    return (
                      <li key={page.value}>
                        <CircleButton
                          href={{
                            query: {
                              [paramKey]: page.value,
                            },
                          }}
                          ghost
                          className={twMerge(
                            currentPage === page.value
                              ? 'border-brand-copper'
                              : 'border-brand-copper/25',
                            'text-xs leading-none',
                          )}
                        >
                          {page.value}
                        </CircleButton>
                      </li>
                    );
                  else
                    return (
                      <li key={`ellipsis-${i.toString()}`}>
                        <span>&#8230;</span>
                      </li>
                    );
                })}
              </ul>
            </li>
            <li>
              <CircleButton
                href={{
                  query: {
                    [paramKey]: Math.min(currentPage + 1, pageSize),
                  },
                }}
                ghost
              >
                <IconArrowRight />
              </CircleButton>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
}

interface PaginationContext {
  page: number;
  totalPages: number;
  siblingCount: number;
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}
function transform(items: (string | number)[]) {
  return items.map((value) => {
    if (typeof value === 'number') return { type: 'page', value };
    return { type: 'ellipsis' };
  });
}

const ELLIPSIS = 'ellipsis';
function getRange({ siblingCount, page, totalPages }: PaginationContext) {
  // First, last, current, siblings, and two gap slots: always this many items.
  const slots = 2 * siblingCount + 5;
  if (totalPages <= slots) return range(1, totalPages);

  // Keep the sibling window clear of pages 1-2 and the last two, so a gap always hides 2+ pages.
  const start = Math.max(Math.min(page - siblingCount, totalPages - 2 * siblingCount - 2), 3);
  const end = Math.min(Math.max(page + siblingCount, 2 * siblingCount + 3), totalPages - 2);

  return [
    1,
    start > 3 ? ELLIPSIS : 2,
    ...range(start, end),
    end < totalPages - 2 ? ELLIPSIS : totalPages - 1,
    totalPages,
  ];
}

function getTransformedRange(ctx: PaginationContext) {
  return transform(getRange(ctx));
}
