import type { ReviewData } from '@/src/types/ai-fitting/review'
import ReviewStarOff from '@/public/Ai-Fitting/ReviewStarOff.svg'
import ReviewStarOn from '@/public/Ai-Fitting/ReviewStarOn.svg'
import { useState } from 'react'
import clsx from 'clsx'


interface ReviewCardProps {
    data : ReviewData
}

const ReviewCard = ({ data } : ReviewCardProps) => {
	const [isExpanded, setIsExpanded] = useState(0);
	const MAX_LENGTH = 95; 
    
	const content = data.reviewBody;
	const shouldTruncate = content.length > MAX_LENGTH;

	const displayContent = (isExpanded || !shouldTruncate) 
		? content 
		: content.slice(0, MAX_LENGTH) + '...';

	return (
		<div className='flex flex-col gap-1 py-1.5 border-b border-solid border-neutral-100'>
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
			<div className='relative'>
				<p className='text-regular-14 anonymous-pro-bold text-neutral-900 break-all tracking-[-1px]'>
					{/* 1. 텍스트 내용 */}
					{displayContent}
                    
					{/* 2. 버튼을 p태그 내부로 이동 & absolute 제거 */}
					{shouldTruncate && !isExpanded && (
						<button 
							onClick={() => setIsExpanded(1)}
							className="text-regular-14 text-neutral-400 inline-block cursor-pointer"
						>
							더보기
						</button>
					)}
				</p>
			</div>
      
		</div>
	)
}

export default ReviewCard
