export function getPageParam(
  key: string,
  searchParams: Record<string, string | string[] | undefined>,
) {
  const page = searchParams[key] ?? 1;
  if (typeof page !== 'string') return 1;

  // `?page=0`, negatives, and non-numbers would otherwise reach the CMS as a bad `skip`.
  const parsed = parseInt(page);
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
}
