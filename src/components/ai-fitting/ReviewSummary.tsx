import type { AiSummaryState, ReviewListState } from '@/src/types/ai-fitting/status'
import { LoadingSpinner } from './LoadingSpinner'
import { AI_FITTING_IMAGES } from '@/src/constants/images'
import { cn } from '@/src/utils/cn'

interface ReviewSummaryProps {
    state : ReviewListState,
    aiState : AiSummaryState,
    handleStartReviewAi : () => void,
	canRetry? : boolean;
}

const ReviewSummary = ({ state, aiState, handleStartReviewAi, canRetry = false } : ReviewSummaryProps) => {
	return (
		<div
			className='
				bg-white
				dark:bg-neutral-800
				border border-none
				rounded-xl
				px-2.5 py-1.5
				flex flex-col gap-1 w-full
			'
		>
			<span className='text-bold-16 text-primary-600 dark:text-primary-400'>
				AI 리뷰 요약
			</span>
							
			{aiState.status === 'loading' && (
				<div className="w-full flex items-center min-h-10">
					<div className="w-[36.5px] flex justify-center items-center shrink-0">
						<LoadingSpinner size={5}/>
					</div>
					<span className='ml-2 flex flex-1 text-regular-14 break-keep text-neutral-900 dark:text-neutral-300'>
						AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
					</span>
				</div>
			)}
		
			{aiState.status === 'success' && aiState && (
				<div className='w-full flex text-regular-14 text-neutral-900 dark:text-neutral-100'>
					{aiState.result?.summary
						? aiState.result.summary
						: '리뷰가 존재하지 않아 AI 요약이 불가능합니다.'}
				</div>
			)}
		
			{(state.status === 'error' || (state.status === 'success' && aiState.status === 'error')) && (
				<div className={cn('mb-2.5 gap-4 flex flex-col w-full')}>
					<div className={cn('flex flex-col')}>
						<span className={cn('text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex')}>
							{!canRetry 
								? '리뷰 수가 부족하여 AI 요약이 불가능합니다.'
							 	: (state.status === 'error' ? '리뷰를 불러오는 데 실패했습니다.' : '리뷰를 요약하는 데 실패했습니다.')}
						</span>
						{canRetry && 
							<span className={cn('text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex')}>
								재시도하려면 아래 버튼을 클릭하세요. 
							</span>
						}
					</div>
					{canRetry && 
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
					}
				</div>
			)}
		</div>
	)
}

export default ReviewSummary
