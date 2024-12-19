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
              <ul className="stack-x-1">
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
  /**
   * `2 * ctx.siblingCount + 5` explanation:
   * 2 * ctx.siblingCount for left/right siblings
   * 5 for 2x left/right ellipsis, 2x first/last page + 1x current page
   *
   * For some page counts (e.g. totalPages: 8, siblingCount: 2),
   * calculated max page is higher than total pages,
   * so we need to take the minimum of both.
   */
  const totalPageNumbers = Math.min(2 * siblingCount + 5, totalPages);

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  const leftSiblingIndex = Math.max(page - siblingCount, firstPageIndex);
  const rightSiblingIndex = Math.min(page + siblingCount, lastPageIndex);

  const showLeftEllipsis = leftSiblingIndex > firstPageIndex + 1;
  const showRightEllipsis = rightSiblingIndex < lastPageIndex - 1;

  const itemCount = totalPageNumbers - 2; // 2 stands for one ellipsis and either first or last page

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, itemCount);
    return [...leftRange, ELLIPSIS, lastPageIndex];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(lastPageIndex - itemCount + 1, lastPageIndex);
    return [firstPageIndex, ELLIPSIS, ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, ELLIPSIS, ...middleRange, ELLIPSIS, lastPageIndex];
  }

  const fullRange = range(firstPageIndex, lastPageIndex);
  return fullRange;
}

function getTransformedRange(ctx: PaginationContext) {
  return transform(getRange(ctx));
}
