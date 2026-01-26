import ReviewKeywordTag from './ReviewKeywordList';
import ReviewCard from './ReviewCard';
import type { ReviewState } from '@/src/types/ai-fitting/status';
import { LoadingSpinner } from './LoadingSpinner';

interface ReviewTabProps {
   state: ReviewState;
}

const ReviewTab = ({ state }: ReviewTabProps) => {
	
	return (
		<div className='flex flex-col items-center mb-[34px]'>
			<div className='w-full'>
                
				{/* AI 리뷰 요약 */}
				<div className='bg-[#E3E6FE] border border-none rounded-xl p-[10px] flex flex-col'>
					<span className='font-bold text-sm text-primary-600 mb-1'>AI 리뷰 요약</span>
                    
					{/* 로딩 중일 때 */}
					{/* AI 리뷰 가져오기 로딩중 또는 AI 리뷰는 가져왔지만 요약이 로딩중일때 */}
					{(state.status === 'loading' || state.status === 'success' && state.summary.status === 'loading') && (
						<div className="w-full flex items-center min-h-[42px]">
							<div className="w-[36.5px] flex justify-center items-center flex-shrink-0">
								<LoadingSpinner size={5}/>
							</div>
							<span className='ml-2 flex flex-1 text-regular-14 break-keep'>
								AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
							</span>
						</div>
					)}

					{/* AI 리뷰 가져오기 성공 & 요약 성공 */}
					{state.status === 'success' && state.summary.status === 'success' && (
						<div className='w-full flex min-h-[42px] text-regular-14 text-neutral-900'>
							{state.summary.text}
						</div>
					)}

					
				</div>


				{/* 주요 리뷰 키워드 */}
				{state.status === 'success'  && (
					<div className='flex flex-col my-1.5'>
						<span className='text-primary-600 font-bold text-sm flex justify-start mb-1'>
							주요 리뷰 키워드
						</span>

						<ReviewKeywordTag keywordList={state.keywords} />
					</div>)}


				{/* 최신 리뷰 */}
				<div className='flex flex-col'>
					<span className='text-primary-600 text-semibold-14 flex justify-start border-b border-solid border-neutral-100 w-full mb-2'>
						최신 리뷰
					</span>

					{/* 로딩 중 */}
					{state.status === 'loading' && (
						<div className='flex flex-col items-center py-10'>
							<span className='break-all'>최신 리뷰를 업데이트하는 중입니다. <br />1분 정도 시간이 걸릴 수 있어요!</span>
							<LoadingSpinner size={8} />
						</div>
					)}

					{/* 데이터 있음 (props로 받은 reviewData 매핑) */}
					{state.status === 'success' && state.reviews.length > 0 ? (
						state.reviews.map((review) => (
							<ReviewCard
								key={review.id}
								data={review}
							/>
						))
					) : (
					// 로딩 끝났는데 데이터가 없을 때
						state.status === 'success' && (
							<div className='py-4 text-center text-neutral-400 text-sm'>
								리뷰가 없습니다.
							</div>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default ReviewTab;
