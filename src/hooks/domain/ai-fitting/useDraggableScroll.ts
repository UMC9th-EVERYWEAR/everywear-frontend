import { useState, useRef, type MouseEvent } from 'react';

const useDraggableScroll = ( scrollSpeed : number ) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		if (scrollRef.current) {
			setStartX(e.pageX - scrollRef.current.offsetLeft);
			setScrollLeft(scrollRef.current.scrollLeft);
		}
	};

	const onDragEnd = () => {
		setIsDragging(false);
	};

	const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * scrollSpeed; // 스크롤 속도 (필요시 인자로 받아서 조절 가능)
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	return {
		scrollRef,
		isDragging,
		// 객체로 묶어서 보내면 {...dragEvents}로 한 번에 적용 가능
		dragEvents: {
			onMouseDown: onDragStart,
			onMouseLeave: onDragEnd,
			onMouseUp: onDragEnd,
			onMouseMove: onDragMove,
		},
	};
};

export default useDraggableScroll;
