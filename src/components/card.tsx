import { text } from '~/components/ui/text';

export function Card({ children }: { children?: React.ReactNode }) {
	return (
		<div className="group linkBox rounded-md border border-solid border-brand-copper/25 bg-brand-black px-4 py-5 transition-colors stack-y-3 hover:border-brand-copper">
			{children}
		</div>
	);
}

export function CardTag({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className="inline-flex rounded-full border border-solid border-brand-copper bg-brand-black p-1">
				<p className={text({ type: 'tag', className: 'leading-none' })}>{children}</p>
			</div>
		</div>
	);
}

export function CardBody({ children }: { children: React.ReactNode }) {
	return <div className="stack-y-2">{children}</div>;
}

// TODO: Hunter - Add a CardLink component and hover animations
