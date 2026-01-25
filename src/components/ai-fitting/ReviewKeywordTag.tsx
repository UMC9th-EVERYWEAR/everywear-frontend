import type { ReviewKeyword } from '@/src/types/ai-fitting/review';

interface ReviewKeywordTagProps {
    keywordList: ReviewKeyword[]; // 배열 형태로 받음
}

const ReviewKeywordTag = ({ keywordList }: ReviewKeywordTagProps) => {
	return (
	// 1. 전체 태그들을 감싸는 컨테이너 (줄바꿈 및 간격 설정)
		<div className="flex flex-wrap gap-2.5"> 
			{keywordList.map((keyword) => (
				// 2. 개별 태그 스타일 (반복 렌더링)
				<div
					key={keyword.id} 
					className="flex justify-center items-center 
                               border border-solid border-primary-600 
                               rounded-full px-2 py-1 whitespace-nowrap bg-white"
				>
					<span className="text-primary-600 text-regular-14">
						{keyword.data}
					</span>
				</div>
			))}
		</div>
	);
};

export default ReviewKeywordTag;
