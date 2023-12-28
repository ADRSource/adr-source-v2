'use client';
import NextImage from 'next/image';
import * as React from 'react';

const TRANSITION_DURATION = 300;
const GOLDEN_RATIO = 1.618;
const BASE = 4;
const SLIDE_DURATION_MS = GOLDEN_RATIO * BASE * 1000;

interface SlideshowProps {
	urls: string[];
}
export function Slideshow({ urls }: SlideshowProps) {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const [isTransitioning, setIsTransitioning] = React.useState(false);

	// Preload the next image when the current index changes
	React.useEffect(() => {
		const nextIndex = (currentImageIndex + 1) % urls.length;
		preloadImage(urls[nextIndex]);
	}, [currentImageIndex, urls]);

	// Change image every 5 seconds
	React.useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			// Wait for the fade out transition to complete before changing the image
			setTimeout(() => {
				setCurrentImageIndex((current) => (current + 1) % urls.length);
				setIsTransitioning(false);
			}, TRANSITION_DURATION); // Transition duration
		}, SLIDE_DURATION_MS);

		return () => {
			clearInterval(interval);
		};
	}, [urls.length]);

	return (
		<div className="relative h-full">
			{urls.map((url, index) => {
				const isCurrent = index === currentImageIndex;
				const isNext = (currentImageIndex + 1) % urls.length === index;
				return (
					<div
						key={url}
						className="absolute inset-0 transition-opacity"
						style={{
							transitionDuration: `${TRANSITION_DURATION}ms`,
							opacity: isCurrent && !isTransitioning ? 1 : 0,
						}}
					>
						<NextImage
							alt={`Slideshow Image ${index}`}
							src={url}
							fill
							priority={isCurrent}
							className="object-cover"
							style={{
								visibility: isCurrent || isNext ? 'visible' : 'hidden', // Only render the current and the next image
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}

function preloadImage(url: string | undefined) {
	if (typeof url !== 'string') return;

	const image = new Image();
	image.src = url;
}
