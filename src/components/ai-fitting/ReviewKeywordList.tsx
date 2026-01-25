import type { ReviewKeyword } from '@/src/types/ai-fitting/data'; // 경로 수정

interface ReviewKeywordProps {
    keywordList: ReviewKeyword[];
}

const ReviewKeywordList = ({ keywordList }: ReviewKeywordProps) => {
	return (
		<div className="flex flex-wrap gap-2.5">
			{keywordList.map((keyword) => (
				<div
					key={keyword.id}
					className="flex justify-center items-center border border-solid border-primary-600 rounded-full px-2 py-1 whitespace-nowrap bg-white"
				>
					<span className="text-primary-600 text-regular-14">
						{keyword.label} {/* data -> label */}
					</span>
				</div>
			))}
		</div>
	);
};

export default ReviewKeywordList;
