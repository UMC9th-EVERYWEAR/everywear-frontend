import type { AiSummaryState, ReviewListState } from '@/src/types/ai-fitting/status'
import { LoadingSpinner } from './LoadingSpinner'
import { AI_FITTING_IMAGES } from '@/src/constants/images'
import { cn } from '@/src/utils/cn'

interface ReviewSummaryProps {
    state : ReviewListState,
    aiState : AiSummaryState,
    handleStartReviewAi : () => void,
    canRetry: boolean; 
}

const ReviewSummary = ({ state, aiState, handleStartReviewAi, canRetry } : ReviewSummaryProps) => {
	return (
		<div
			className={cn(
				'flex flex-col gap-1 w-full px-2.5 py-1.5 rounded-xl border-none transition-colors duration-300',
				'bg-[var(--color-review-summary)] dark:bg-neutral-800',
			)}
		>
			<span className="text-bold-16 text-primary-600 dark:text-primary-400">
				AI 리뷰 요약
			</span>

			{aiState.status === 'loading' && (
				<div className="w-full flex items-center min-h-10">
					<div className="w-[36.5px] flex justify-center items-center shrink-0">
						<LoadingSpinner size={5}/>
					</div>
					<span className="ml-2 flex flex-1 text-regular-14 break-keep text-neutral-900 dark:text-neutral-300">
						AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
					</span>
				</div>
			)}

			{aiState.status === 'success' && (
				<div className="w-full flex text-regular-14 text-neutral-900 dark:text-neutral-100">
					{aiState.result?.summary
						? aiState.result.summary
						: '리뷰가 존재하지 않아 AI 요약이 불가능합니다.'}
				</div>
			)}

			{(state.status === 'error' || (state.status === 'success' && aiState.status === 'error')) && canRetry && (
				<div className="mb-2.5 gap-4 flex flex-col w-full">
					<div className="flex flex-col">
						<span className="text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex text-neutral-900 dark:text-neutral-300">
							{state.status === 'error'
								? '리뷰를 불러오는 데 실패했습니다.'
								: '리뷰를 요약하는 데 실패했습니다.'}
						</span>
						<span className="text-regular-14 leading-5.2 tracking-[-0.42px] items-center justify-center flex text-neutral-900 dark:text-neutral-300">
							재시도하려면 아래 버튼을 클릭하세요.
						</span>
					</div>

					<div className="flex w-full items-center justify-center">
						<button
							className="p-2.5 bg-review-rotate rounded-full cursor-pointer shadow-2 transition-transform active:scale-90"
							onClick={handleStartReviewAi}
						>
							<img
								src={AI_FITTING_IMAGES.ROTATE_ICON}
								alt="새로고침 버튼"
							/>
						</button>
					</div>
				</div>
			)}
			{aiState.status === 'error' && !canRetry && (
				<div className="py-2 text-center text-regular-12 text-neutral-500">
					재시도 횟수를 초과했습니다. 나중에 다시 시도해 주세요.
				</div>
			)}
		</div>
	)
}

export default ReviewSummary
