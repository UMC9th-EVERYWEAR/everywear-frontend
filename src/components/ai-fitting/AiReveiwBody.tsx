import { LoadingSpinner } from './LoadingSpinner';
import ReviewKeywordTag from './ReviewKeywordTag';
import ReviewCard from './ReviewCard';
// 타입 import 경로를 실제 프로젝트에 맞게 수정해주세요
import type { ReviewData } from '@/src/types/ai-fitting/review'; 



interface KeywordItem {
    id: number;
    data: string;
}

interface AiReviewBodyProps {
    isAnalysisStarted: boolean;       // AI 분석 시작 여부
    isReviewSummaryFetching: boolean; // 요약 로딩 상태
    isReviewFetching: boolean;        // 리뷰/키워드 로딩 상태
    summaryData: string | null;       // 요약 데이터
    reviewData: ReviewData[] | null;  // 리뷰 데이터
    // 키워드 데이터 (목데이터 구조에 맞게 조정, 여기서는 string[] 대신 목데이터 형식을 따름)
    keywordData: KeywordItem[] | null; 
}

const AiReviewBody = ({ 
	isAnalysisStarted,
	isReviewSummaryFetching,
	isReviewFetching, 
	summaryData, 
	reviewData,
	keywordData,
}: AiReviewBodyProps) => {


	return (
		<div className='flex flex-col items-center mb-[34px]'>
			<div className='w-[343px]'>
                
				{/* AI 리뷰 요약 */}
				<div className='bg-[#E3E6FE] border border-none rounded-xl p-[10px] flex flex-col'>
					<span className='font-bold text-sm text-primary-600 mb-1'>AI 리뷰 요약</span>
                    
					{/* 로딩 중일 때 */}
					{isReviewSummaryFetching && (
						<div className="w-full flex items-center min-h-[42px]">
							<div className="w-[36.5px] flex justify-center items-center flex-shrink-0">
								<LoadingSpinner size={5}/>
							</div>
							<span className='ml-2 flex flex-1 text-regular-14 break-keep'>
								AI가 리뷰 분석 결과를 계속 업데이트하고 있어요.
							</span>
						</div>
					)}

					{/* 로딩 끝 & 데이터 받음 */}
					{!isReviewSummaryFetching && summaryData && (
						<div className='w-full flex min-h-[42px] text-regular-14 text-neutral-900'>
							{summaryData}
						</div>
					)}

					
				</div>


				{/* 주요 리뷰 키워드 */}
				{keywordData && (
					<div className='flex flex-col my-1.5'>
						<span className='text-primary-600 font-bold text-sm flex justify-start mb-1'>
							주요 리뷰 키워드
						</span>

						{!isReviewFetching && keywordData && (
							<ReviewKeywordTag keywordList={keywordData} />
						)}
					</div>)}


				{/* 최신 리뷰 */}
				<div className='flex flex-col'>
					<span className='text-primary-600 font-bold text-sm flex justify-start border-b border-solid border-neutral-100 w-full mb-2'>
						최신 리뷰
					</span>

					{/* 로딩 중 */}
					{isReviewFetching && (
						<div className='flex justify-center py-10'>
							<LoadingSpinner size={8} />
						</div>
					)}

					{/* 데이터 있음 (props로 받은 reviewData 매핑) */}
					{!isReviewFetching && reviewData && reviewData.length > 0 ? (
						reviewData.map((review, index) => (
							<ReviewCard
								key={index}
								data={review}
							/>
						))
					) : (
					// 로딩 끝났는데 데이터가 없을 때
						!isReviewFetching && (
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

export default AiReviewBody;
