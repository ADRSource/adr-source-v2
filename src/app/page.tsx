export default function Home() {
	return (
		<main className='p-6 stack-y-10'>
			<h1 className='text-token-base text-2xl font-bold text-blue-600'>Home</h1>
			<div className='stack-x-5 md:stack-y-10'>
				<ul className='stack-y-3'>
					<li>list item</li>
					<li>list item</li>
					<li>list item</li>
				</ul>
				<ul className='stack-y-[300px]'>
					<li>list item</li>
					<li>list item</li>
					<li>list item</li>
				</ul>
			</div>
		</main>
	);
}
