'use client';
import * as pagination from '@zag-js/pagination';
import { normalizeProps, useMachine } from '@zag-js/react';
import { twMerge } from 'tailwind-merge';
import { IconArrowLeft } from '~/components/icons/IconArrowLeft';
import { IconArrowRight } from '~/components/icons/IconArrowRight';
import { CircleButton } from '~/components/ui/button';

/* TODO: #30 Replace Zag with pure url state and derived values

Zag isn't going to work because we're duplicating the state in the url and in the machine and they can get out of sync. */
interface PaginationProps {
	id: string;
	count: number;
	paramKey: string;
}
export function Pagination({ id, count, paramKey }: PaginationProps) {
	const machine = useMachine(pagination.machine({ id, count, pageSize: 12, type: 'link' }));
	const [state, send] = machine;
	const api = pagination.connect(state, send, normalizeProps);

	return (
		<div>
			{api.totalPages > 1 && (
				<nav {...api.rootProps}>
					<ul className="justify-between stack-x-1">
						<li>
							<CircleButton
								href={{
									hash: 'previous',
									query: {
										[paramKey]: api.previousPage?.toString() ?? '1',
									},
								}}
								{...api.prevTriggerProps}
								ghost
								className={api.previousPage !== null ? '' : 'cursor-not-allowed'}
							>
								<IconArrowLeft />
							</CircleButton>
						</li>
						<li>
							<ul className="stack-x-1">
								{api.pages.map((page, i) => {
									if (page.type === 'page')
										return (
											<li key={page.value}>
												<CircleButton
													href={{
														hash: page.value.toString(),
														query: {
															[paramKey]: page.value.toString(),
														},
													}}
													{...api.getItemProps(page)}
													ghost
													className={twMerge(
														api.page === page.value
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
											<li key={`ellipsis-${i}`}>
												<span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
											</li>
										);
								})}
							</ul>
						</li>
						<li>
							<CircleButton
								href={{
									hash: 'next',
									query: {
										[paramKey]: api.nextPage?.toString() ?? api.totalPages.toString(),
									},
								}}
								{...api.nextTriggerProps}
								ghost
							>
								<IconArrowRight />
							</CircleButton>
						</li>
					</ul>
				</nav>
			)}
		</div>
	);
}
