interface ReviewKeywordProps {
    keywordList: string[] | undefined;
}

const ReviewKeywordList = ({ keywordList }: ReviewKeywordProps) => {
	if (!keywordList) return null;

	return (
		<div className="flex flex-wrap gap-2.5">
			{keywordList.map((keyword) => (
				<div
					key={keyword}
					className="flex justify-center items-center border border-solid border-primary-600 rounded-full px-2 py-1 whitespace-nowrap bg-white"
				>
					<span className="text-primary-600 text-regular-14">
						{keyword} 
					</span>
				</div>
			))}
		</div>
	);
};

export default ReviewKeywordList;
