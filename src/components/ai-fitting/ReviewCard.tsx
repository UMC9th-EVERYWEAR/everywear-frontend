import { useState } from 'react';
import { truncate } from '@/src/utils/truncate';
import useDraggableScroll from '@/src/hooks/domain/ai-fitting/useDraggableScroll';
import { cn } from '@/src/utils/cn';
import  { AI_FITTING_IMAGES } from '@/src/constants/images';
import type { ReviewDTO } from '@/src/apis/generated';

interface ReviewCardProps {
    data: ReviewDTO; 
}
const MAX_LENGTH = 115;

const ReviewCard = ({ data }: ReviewCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { scrollRef, isDragging, dragEvents } = useDraggableScroll(1);

	const content = data.content ?? '';
	const shouldTruncate = content.length > MAX_LENGTH;
	const displayContent = isExpanded ? content : truncate(content, MAX_LENGTH);

	// 리뷰 이미지 옆으로 슬라이드 기능

	return (
		<div className="flex flex-col gap-1 py-1.5 border-b border-solid border-neutral-100 w-full overflow-hidden">
			{/* 별점 & 날짜 */}
			<div className="flex items-center">
				<div className="flex">
					{/* 길이 5짜리 배열 만들어 rating에 따라 아이콘 추가 */}
					{Array.from({ length: 5 }).map((_, index) => (
						<img
							key={index}
							src={index < (data.rating ?? 0) ?  AI_FITTING_IMAGES.REVIEW_STAR_ON : AI_FITTING_IMAGES.REVIEW_STAR_OFF}
							alt="별점"
						/>
					))}
				</div>
				<span className="text-neutral-400 text-medium-10 ml-1">{data.review_date ?? ''}</span>
			</div>

			{/* 상품 정보 */}
			<div className="py-3.25 pl-3.25 bg-neutral-50 border rounded-xs border-black/10 gap-0.75 flex flex-col text-regular-14">
				<span>
					구매 정보 : {data.option_text ?? ''}
				</span>
				{data.user_height && data.user_weight && 
					<span>
						체형 정보 : {data.user_height}cm, {data.user_weight}kg
					</span>
				}
			</div>

			{/* 리뷰 본문 */}
			<div className="relative">
				<p className={cn('text-regular-14 text-neutral-900 break-all tracking-[-0.42px]')}>
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

			{/* 이미지 슬라이더 */}
			{data.images && data.images.length > 0 && ( // reviewImage -> images
				<div
					ref={scrollRef}
					className={cn(
						'flex gap-2 overflow-x-auto scrollbar-hide focus:outline-none',
						isDragging ? 'cursor-grabbing' : 'cursor-grab',
					)}
					{...dragEvents}
					role="region"
					aria-label="리뷰 이미지 슬라이더"
					// tabIndex={0}
				>
					{data.images.map((img, index) => (
						<div
							key={index}
							className="relative w-[161.75px] h-[107.833px] shrink-0"
						>
							<img
								src={img}
								alt="리뷰 이미지"
								className="w-full h-full object-cover pointer-events-none"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ReviewCard;
