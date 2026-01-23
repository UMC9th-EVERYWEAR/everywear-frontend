import type { ReviewData } from '@/src/types/ai-fitting/review'
import ReviewStarOff from '@/public/Ai-Fitting/ReviewStarOff.svg'
import ReviewStarOn from '@/public/Ai-Fitting/ReviewStarOn.svg'
import { useState, useRef, type MouseEvent } from 'react' 
import clsx from 'clsx' 

interface ReviewCardProps {
    data : ReviewData
}

const ReviewCard = ({ data } : ReviewCardProps) => {
	// --- 텍스트 더보기 로직 ---
	const [isExpanded, setIsExpanded] = useState(0);
	const MAX_LENGTH = 95; 
    
	const content = data.reviewBody;
	const shouldTruncate = content.length > MAX_LENGTH;

	const displayContent = (isExpanded || !shouldTruncate) 
		? content 
		: content.slice(0, MAX_LENGTH) + '...';

	// --- 3. 이미지 드래그 스크롤 로직 ---
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
		e.preventDefault(); // 텍스트 선택 등 기본 동작 방지
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 1; // 스크롤 속도 조절 (1.5배)
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	return (
		<div className='flex flex-col gap-1 py-1.5 border-b border-solid border-neutral-100 w-full overflow-hidden'>
			{/* 별점 & 날짜 */}
			<div className='flex'>
				{Array.from({ length: 5 }).map((_, index) => (
					<img
						key={index}
						src={index < data.starCount ? ReviewStarOn : ReviewStarOff}
						alt='별점'
					/>
				))}
				<span className='text-neutral-400 font-medium text-[10px] ml-1'>{data.date}</span>
			</div>

			{/* 상품 정보 */}
			<div
				className='py-3.25 pl-3.25 bg-neutral-50 border rounded-xs border-black/10 
            gap-0.75 flex flex-col anonymous-pro-regular text-regular-14'
			>
				<span>구매 정보 : {data.itemName} • {data.size}</span>
				<span>체형 정보 : {data.gender}, {data.height}cm, {data.weight}kg</span>
			</div>

			
            
			{/* 리뷰 본문 */}
			<div className='relative mt-1'>
				<p className='text-regular-14 anonymous-pro-bold text-neutral-900 break-all tracking-[-1px]'>
					{displayContent}
                    
					{shouldTruncate && !isExpanded && (
						<button 
							onClick={() => setIsExpanded(1)}
							className="text-regular-14 text-neutral-400 inline-block cursor-pointer ml-1"
						>
							더보기
						</button>
					)}
				</p>
			</div>

			{/* 이미지 슬라이더 (드래그 기능 추가됨) */}
			{data.reviewImage && data.reviewImage.length > 0 && (
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
				<div
					ref={scrollRef}
					className={clsx(
						'flex gap-2 overflow-x-auto scrollbar-hide focus:outline-none', // 기본 스타일
						isDragging ? 'cursor-grabbing' : 'cursor-grab', // 드래그 시 커서 변경
					)}
					// 드래그 이벤트 연결
					onMouseDown={onDragStart}
					onMouseLeave={onDragEnd}
					onMouseUp={onDragEnd}
					onMouseMove={onDragMove}
					// 웹 접근성 속성
					role="region"
					aria-label="리뷰 이미지 슬라이더"
					//eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
				>
					{data.reviewImage.map((img) => (
						<div
							key={img.id}
							className="relative w-[161.75px] h-[107.833px] shrink-0"
						>
							<img
								src={img.imgUrl}
								alt="리뷰 이미지"
								className="w-full h-full object-cover pointer-events-none"
								// pointer-events-none: 이미지 자체의 드래그 방지 (필수)
							/>
						</div>
					))}
				</div>
			)}
      
		</div>
	)
}

export default ReviewCard
