import ReviewKeywordTag from './ReviewKeywordList';
import ReviewCard from './ReviewCard';
import type { ReviewState } from '@/src/types/ai-fitting/status';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/src/utils/cn';
import RotateIcon from '@/public/ai-fitting/RotateIcon.svg';
import { useEffect, useState } from 'react';

interface ReviewTabProps {
    state: ReviewState;
    handleStartReview: () => void;
}

const ReviewTab = ({ state, handleStartReview }: ReviewTabProps) => {
	// 15초 타이머 상태
	const [showResult, setShowResult] = useState(false);

	// 의존성 배열 문제를 해결하기 위해 상태값 미리 추출
	const summaryStatus = state.status === 'success' ? state.summary.status : undefined;

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (state.status === 'success' && summaryStatus === 'success') {
			timer = setTimeout(() => {
				setShowResult(true);
			}, 15000);
		}

		return () => {
			clearTimeout(timer);
			setShowResult(false);
		};
	}, [state.status, summaryStatus]); 


	// 리뷰 요약 로딩 상태 계산
	const isSummaryLoading = state.status === 'loading' || 
                             (state.status === 'success' && state.summary.status === 'loading') || 
                             (state.status === 'success' && state.summary.status === 'success' && !showResult);

	// 리뷰 요약 성공 상태 여부 (boolean)
	const isSummaryVisible = state.status === 'success' && state.summary.status === 'success' && showResult;

	// 리뷰 데이터 로드 성공 여부
	const isGlobalSuccess = state.status === 'success'; 


	return (
		<div className='flex flex-col items-center mb-32'>
			<div className='w-full'>
                
				{/* AI 리뷰 요약 */}
				<div className='bg-review-summary border border-none rounded-xl px-2.5 py-1.5 flex flex-col gap-1'>
					<span className='text-bold-16 text-primary-600'>AI 리뷰 요약</span>
                    
					{/* 로딩 표시 */}
					{isSummaryLoading && (
						<div className="w-full flex items-center min-h-10">
							<div className="w-[36.5px] flex justify-center items-center shrink-0">
								<LoadingSpinner size={5}/>
							</div>
							<span className='ml-2 flex flex-1 text-regular-14 break-keep'>
								AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
							</span>
						</div>
					)}

					{isSummaryVisible && state.status === 'success' && state.summary.status === 'success' && (
						<div className='w-full flex min-h-10 text-regular-14 text-neutral-900'>
							{state.summary.text}
						</div>
					)}

					{/* 에러 처리 */}
					{(state.status === 'error' || (state.status === 'success' && state.summary.status === 'error')) && (
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
									onClick={handleStartReview}
								>
									<img
										src={RotateIcon}
										alt='새로고침 버튼'
									/>
								</button>
							</div>
						</div>
					)}
				</div>


				{/* 주요 리뷰 키워드 */}
				{isGlobalSuccess && (
					<div className='flex flex-col my-1.5'>
						<span className='text-primary-600 text-bold-16 flex justify-start mb-1'>
							주요 리뷰 키워드
						</span>
						<ReviewKeywordTag keywordList={state.keywords} />
					</div>
				)}


				{/* 최신 리뷰 */}
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

					{isGlobalSuccess && (state.reviews.length > 0 ? (
						state.reviews.map((review) => (
							<ReviewCard
								key={review.id}
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
