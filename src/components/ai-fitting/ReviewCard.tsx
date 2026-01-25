import type { ReviewData } from '@/src/types/ai-fitting/review'
import ReviewStarOff from '@/public/ai-fitting/ReviewStarOff.svg'
import ReviewStarOn from '@/public/ai-fitting/ReviewStarOn.svg'
import { useState, useRef, type MouseEvent } from 'react' 
import clsx from 'clsx' 
import { truncate } from '@/src/utils/truncate'
import useDraggableScroll from '@/src/hooks/domain/ai-fitting'

interface ReviewCardProps {
    data : ReviewData
}

const ReviewCard = ({ data } : ReviewCardProps) => {

	// --- 텍스트 더보기 로직 ---
	const [isExpanded, setIsExpanded] = useState(false);
	const MAX_LENGTH = 115; 
	const content = data.reviewBody;
	const shouldTruncate = content.length > MAX_LENGTH;
	const displayContent = isExpanded 
		? content 
		: truncate(content, MAX_LENGTH);

	// --- 3. 이미지 드래그 스크롤 로직 (커스텀 훅 사용) ---
	// 핵심: 훅을 호출해서 필요한 것만 받아옵니다.
	const { scrollRef, isDragging, dragEvents } = useDraggableScroll(1);

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
							onClick={() => setIsExpanded(true)}
							className="text-regular-14 text-neutral-400 inline-block cursor-pointer ml-1"
						>
							더보기
						</button>
					)}
				</p>
			</div>

			{/* 이미지 슬라이더 (드래그 기능 추가됨) */}
			{data.reviewImage && data.reviewImage.length > 0 && (
			 
				<div
					ref={scrollRef}
					className={clsx(
						'flex gap-2 overflow-x-auto scrollbar-hide focus:outline-none', // 기본 스타일
						isDragging ? 'cursor-grabbing' : 'cursor-grab', // 드래그 시 커서 변경
					)}
					// 드래그 이벤트 연결
					{...dragEvents}
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
							/>
						</div>
					))}
				</div>
			)}
      
		</div>
	)
}

export default ReviewCard
