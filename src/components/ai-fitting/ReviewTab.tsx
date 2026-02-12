import ReviewKeywordTag from './ReviewKeywordList';
import type { AiSummaryState, ReviewListState } from '@/src/types/ai-fitting/status';
import ReviewCardList from './ReviewCardList';
import ReviewSummary from './ReviewSummary';

interface ReviewTabProps {
	state: ReviewListState;
	aiState: AiSummaryState;
	handleStartReviewAi: () => void;
}

const ReviewTab = ({ state, aiState, handleStartReviewAi }: ReviewTabProps) => {
	return (
		<div className='flex flex-col items-center mb-32 w-full'>
			<ReviewSummary
				state={state}
				aiState={aiState}
				handleStartReviewAi={handleStartReviewAi}
			/>

			{state.status === 'success' && aiState.status === 'success' && aiState.result && (
				<div className='flex flex-col my-1.5 w-full'>
					<span className='text-primary-600 text-bold-16 flex justify-start mb-1'>주요 리뷰 키워드</span>
					<ReviewKeywordTag keywordList={aiState.result.keywords} />
				</div>
			)}

			<div className='flex flex-col w-full'>
				<span className='text-primary-600 text-bold-16 flex justify-start border-b border-solid border-neutral-100 dark:border-neutral-700 w-full'>
					최신 리뷰
				</span>
				<ReviewCardList state={state} />
			</div>
		</div>
	);
};

export default ReviewTab;
