import ReviewKeywordTag from './ReviewKeywordList';
import ReviewCard from './ReviewCard';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/src/utils/cn';
import { AI_FITTING_IMAGES } from '@/src/constants/images';
import type { AiSummaryState, ReviewListState } from '@/src/types/ai-fitting/status';

interface ReviewTabProps {
    state: ReviewListState;
	aiState: AiSummaryState;
	handleStartReviewAi : () => void;
}

const ReviewTab = ({ state, aiState, handleStartReviewAi }: ReviewTabProps) => {

	return (
		<div className='flex flex-col items-center mb-32'>
			<div className='w-full'>
                
				<div className='bg-review-summary border border-none rounded-xl px-2.5 py-1.5 flex flex-col gap-1'>
					<span className='text-bold-16 text-primary-600'>AI 리뷰 요약</span>
                    
					{aiState.status === 'loading' && (
						<div className="w-full flex items-center min-h-10">
							<div className="w-[36.5px] flex justify-center items-center shrink-0">
								<LoadingSpinner size={5}/>
							</div>
							<span className='ml-2 flex flex-1 text-regular-14 break-keep'>
								AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
							</span>
						</div>
					)}

					{state.status === 'success' && aiState.status === 'success'  && aiState.result && (
						<div className='w-full flex min-h-10 text-regular-14 text-neutral-900'>
							{aiState.result.summary}
						</div>
					)}

					{(state.status === 'error' || (state.status === 'success' && aiState.status === 'error')) && (
						<div className={cn('mb-2.5 gap-4 flex flex-col w-full')}>
							<div className={cn('flex flex-col')}>
								<span className={cn('text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex')}>
									{state.status === 'error' ? '리뷰를 불러오는 데 실패했습니다.' : '리뷰를 요약하는 데 실패했습니다.'}
								</span>
								<span className={cn('text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex')}>
									재시도하려면 아래 버튼을 클릭하세요. 
								</span>
							</div>
							<div className={cn('flex w-full items-center justify-center')}>
								<button
									className='p-2.5 bg-review-rotate rounded-full cursor-pointer shadow-2'
									onClick={handleStartReviewAi}
								>
									<img
										src={AI_FITTING_IMAGES.ROTATE_ICON}
										alt='새로고침 버튼'
									/>
								</button>
							</div>
						</div>
					)}
				</div>

				{state.status === 'success' && aiState.status === 'success' && (
					<div className='flex flex-col my-1.5'>
						<span className='text-primary-600 text-bold-16 flex justify-start mb-1'>
							주요 리뷰 키워드
						</span>
						{aiState.result && <ReviewKeywordTag keywordList={aiState.result.keywords} />}
					</div>
				)}

				<div className='flex flex-col'>
					<span className='text-primary-600 text-bold-16 flex justify-start border-b border-solid border-neutral-100 w-full'>
						최신 리뷰
					</span>

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
				</div>
			</div>
		</div>
	)
}

export default ReviewTab;
