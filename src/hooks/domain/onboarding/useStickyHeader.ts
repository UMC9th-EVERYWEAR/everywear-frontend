import { useRef, useState, useEffect } from 'react';

export const useScrollStickyAnimation = () => {
	const [isInViewport, setIsInViewport] = useState(false); // true → 요소가 뷰포트 안에 있음
	const [isSticky, setIsSticky] = useState(true);

	/* ref : IntersectionObserver가 관찰할 실제 DOM 요소 */
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

		const callback = (entries: IntersectionObserverEntry[]) => { // 관찰 중인 요소의 상태가 변할 때마다 호출됨
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// 요소가 화면에 처음 들어왔을 때만 상태를 true로 바꿈
					console.log(entries[0].boundingClientRect); 
					setIsInViewport(true);
				} 
			});
		};

		const options = { 
			root: null, 
			rootMargin: '0px', 
			threshold: 0.9 }; 

		const observer = new IntersectionObserver(callback, options);
		observer.observe(ref.current); // 요소 관찰 시작

		return () => {
			observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
		};
	}, []);

	useEffect(() => {
		if(!isInViewport) return;
		if (isInViewport) {
			const timer = setTimeout(() => {
				setIsSticky(false);
			}, 500);
			return () => clearTimeout(timer);
		} 
		
	}, [isInViewport]);


	return { isInViewport, isSticky, ref };
};

