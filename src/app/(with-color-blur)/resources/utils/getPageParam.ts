export function getPageParam(
	key: string,
	searchParams: Record<string, string | string[] | undefined>,
) {
	const page = searchParams[key] ?? 1;
	if (typeof page !== 'string') return 1;

	return parseInt(page);
}
