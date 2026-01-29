import { useRef, useState, useEffect } from 'react';

export const useScrollAnimation = () => {
	const [isInViewport, setIsInViewport] = useState(false); // true → 요소가 뷰포트 안에 있음

	/* ref : IntersectionObserver가 관찰할 실제 DOM 요소 */
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

		const callback = (entries: IntersectionObserverEntry[]) => { // 관찰 중인 요소의 상태가 변할 때마다 호출됨
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// 요소가 화면에 처음 들어왔을 때만 상태를 true로 바꾸고,
					setIsInViewport(true);
					// 애니메이션은 한 번만 실행되도록 ,이후에는 더 이상 IntersectionObserver가 해당 요소를 감시하지 않도록 함
					observer.unobserve(entry.target);
				} else {
					// 요소가 뷰포트를 벗어난 경우
					setIsInViewport(false);
				}
			});
		};

		const options = { 
			root: null, // 브라우저 뷰포트를 기준으로 관찰
			rootMargin: '0px', // 뷰포트와 정확히 겹칠 때만 감지
			threshold: 0 }; // 1px이라도 보이면 콜백 실행

		const observer = new IntersectionObserver(callback, options);
		observer.observe(ref.current); // 요소 관찰 시작

		return () => {
			observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
		};
	}, []);

	return { isInViewport, ref };
};



// IntersectionObserver는
// “어떤 요소가 지금 화면에 들어왔는지(겹쳤는지)를
// 브라우저가 대신 감시해주는 API”


