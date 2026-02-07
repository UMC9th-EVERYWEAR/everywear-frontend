import { useEffect } from 'react';
import React from 'react';

export const useStickyObserver = (
	containerRef: React.RefObject<HTMLElement | null>,
	onChange: (stuck: boolean) => void,
) => {
	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					onChange(!entry.isIntersecting);
				});
			},
			{
				root: containerRef.current,
				threshold: 0,
			},
		);

		const sentinel = document.createElement('div');
		sentinel.style.position = 'absolute';
		sentinel.style.top = '-1px';
		containerRef.current.appendChild(sentinel);
		observer.observe(sentinel);

		return () => observer.disconnect();
	}, []);
};
