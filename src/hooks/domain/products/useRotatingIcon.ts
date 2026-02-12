import { useEffect, useState } from 'react';

export function useRotatingIcon<T>(
	items: T[],
	intervalMs: number,
	enabled: boolean,
) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!enabled) return;

		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % items.length);
		}, intervalMs);

		return () => clearInterval(timer);
	}, [items.length, intervalMs, enabled]);

	return index;
}
