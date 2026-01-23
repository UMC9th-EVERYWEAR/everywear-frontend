import { useCallback, useRef, useState } from 'react';

export const useHorizontalScrollIndicator = () => {
	const [scrollRatio, setScrollRatio] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		if (!scrollRef.current) return;

		const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
		const maxScrollLeft = scrollWidth - clientWidth;

		if (maxScrollLeft <= 0) return;
		setScrollRatio(scrollLeft / maxScrollLeft);
	}, []);

	return { scrollRef, scrollRatio, handleScroll };
};
