import { dummyReviewData, dummyReviewKeywordData } from '@/src/data/ai-fitting/reviewMockData';
import { LoadingSpinner } from './LoadingSpinner';
import ReviewKeywordTag from './ReviewKeywordTag';
import ReviewCard from './ReviewCard';


interface AiReviewBodyProps {
	summaryData? : string;
	reviewData? : string;
	isReviewSummaryFetching : boolean;
	isReviewFetching : boolean;
}

const AiReviewBody = () => {
	return (
		<div className='flex flex-col items-center mb-[34px]'>
			<div className='w-[343px]'>
				{/* AI 리뷰 요약 */}
				<div className='bg-[#E3E6FE] border border-none rounded-xl p-[10px] flex flex-col'>
					{/* AI 리뷰 요약 제목 */}
					<span className='font-bold text-sm text-primary-600 mb-1'>AI 리뷰 요약</span>
					{/* AI 리뷰 요약 본문 */}
				
					{/* 로딩중 요약 본문 */}
					<div className="w-full flex min-h-[42px]">
						<div className="w-[36.5px] flex justify-center items-center flex-shrink-0">
							<LoadingSpinner size={5}/>
						</div>
						<span className='ml-2 flex flex-1 text-regular-14 w-[262px]'>
							AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
						</span>
					</div>
				
				</div>

				<div className='flex flex-col my-1.5'>
					<span
						className='text-primary-600 font-bold text-sm flex justify-start mb-1'
					>주요 리뷰 키워드</span>
					<ReviewKeywordTag keywordList={dummyReviewKeywordData.data}/>
				</div>

				<div className='flex flex-col'>
					<span
						className='text-primary-600 font-bold text-sm flex justify-start border-b 
					border-solid border-neutral-100 w-full'
					>최신 리뷰</span>
					<ReviewCard data={dummyReviewData[0]}/>
				</div>
			</div>
		</div>
      
	)
}

export default AiReviewBody;
