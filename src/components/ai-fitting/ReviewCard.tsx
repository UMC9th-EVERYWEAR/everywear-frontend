import type { ReviewItem } from '@/src/types/ai-fitting/data'; // 경로 수정 필요
import ReviewStarOff from '@/public/ai-fitting/ReviewStarOff.svg';
import ReviewStarOn from '@/public/ai-fitting/ReviewStarOn.svg';
import { useState } from 'react';
import clsx from 'clsx';
import { truncate } from '@/src/utils/truncate';
import useDraggableScroll from '@/src/hooks/domain/ai-fitting';

interface ReviewCardProps {
    data: ReviewItem; 
}

const ReviewCard = ({ data }: ReviewCardProps) => {
	// 텍스트 3줄 제한 및 더보기 버튼 여부
	const [isExpanded, setIsExpanded] = useState(false);
	const MAX_LENGTH = 115;
	const content = data.content; // reviewBody -> content
	const shouldTruncate = content.length > MAX_LENGTH;
	const displayContent = isExpanded ? content : truncate(content, MAX_LENGTH);

	// 리뷰 이미지 옆으로 슬라이드 기능
	const { scrollRef, isDragging, dragEvents } = useDraggableScroll(1);

	return (
		<div className="flex flex-col gap-1 py-1.5 border-b border-solid border-neutral-100 w-full overflow-hidden">
			{/* 별점 & 날짜 */}
			<div className="flex items-center">
				<div className="flex">
					{/* 길이 5짜리 배열 만들어 rating에 따라 아이콘 추가 */}
					{Array.from({ length: 5 }).map((_, index) => (
						<img
							key={index}
							src={index < data.rating ? ReviewStarOn : ReviewStarOff} // starCount -> rating
							alt="별점"
						/>
					))}
				</div>
				<span className="text-neutral-400 font-medium text-[10px] ml-1">{data.date}</span>
			</div>

			{/* 상품 정보 */}
			<div className="py-3.25 pl-3.25 bg-neutral-50 border rounded-xs border-black/10 gap-0.75 flex flex-col anonymous-pro-regular text-regular-14">
				<span>
					구매 정보 : {data.productName} • {data.productSize}
				</span>
				<span>
					체형 정보 : {data.gender}, {data.buyerHeight}cm, {data.buyerWeight}kg
				</span>
			</div>

			{/* 리뷰 본문 */}
			<div className="relative mt-1">
				<p className="text-regular-14 font-anonymous text-neutral-900 break-all tracking-[-1px]">
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
					className={clsx(
						'flex gap-2 overflow-x-auto scrollbar-hide focus:outline-none mt-2',
						isDragging ? 'cursor-grabbing' : 'cursor-grab',
					)}
					{...dragEvents}
					role="region"
					aria-label="리뷰 이미지 슬라이더"
					tabIndex={-1}
				>
					{data.images.map((img) => (
						<div
							key={img.id}
							className="relative w-[161.75px] h-[107.833px] shrink-0"
						>
							<img
								src={img.imgUrl}
								alt="리뷰 이미지"
								className="w-full h-full object-cover pointer-events-none rounded-md"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ReviewCard;
