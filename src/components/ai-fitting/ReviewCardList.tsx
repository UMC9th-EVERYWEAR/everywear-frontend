import type { ReviewListState } from '@/src/types/ai-fitting/status'
import { LoadingSpinner } from './LoadingSpinner'
import ReviewCard from './ReviewCard'
import { cn } from '@/src/utils/cn'

interface ReviewCardListProps {
    state : ReviewListState
}

const ReviewCardList = ({ state } : ReviewCardListProps) => {
	return (
		<>
			{state.status === 'loading' && (
				<div className='flex flex-col items-center gap-2.5'>
					<div className='flex flex-col'>
						<span className='break-all flex justify-center'>최신 리뷰를 업데이트하는 중입니다.</span>
						<span className={cn('break-all flex justify-center')}>1분 정도 시간이 걸릴 수 있어요!</span>
					</div>
					<LoadingSpinner size={8} />
				</div>
			)}

			{state.status === 'success' && (state.reviews.length > 0 ? (
				state.reviews.map((review) => (
					<ReviewCard
						key={review.review_id}
						data={review}
					/>
				))
			) : (
						
				<div className='py-4 text-center text-neutral-400 text-sm'>
					리뷰가 없습니다.
				</div>
						
			))}
		</>
	)
}

export default ReviewCardList;
