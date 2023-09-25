export function Container({ children }: { children: React.ReactNode }) {
	return (
		<section className="w-full px-2">
			<div className="mx-auto max-w-block">{children}</div>
		</section>
	);
}
