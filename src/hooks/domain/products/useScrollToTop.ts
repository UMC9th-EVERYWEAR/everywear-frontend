import { useEffect } from 'react';
import { useLocation } from 'react-router';
import React from 'react'

interface ScrollToTopProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollToTop({ targetRef }: ScrollToTopProps) {
	const { pathname } = useLocation();

	useEffect(() => {
		targetRef.current?.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [pathname, targetRef]);

	return null;
}
