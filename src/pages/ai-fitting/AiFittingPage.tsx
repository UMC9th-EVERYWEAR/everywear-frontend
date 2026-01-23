import { useState } from 'react';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import AiFittingBody from '@/src/components/ai-fitting/AiFittingBody';
import AiReviewBody from '@/src/components/ai-fitting/AiReveiwBody';

const AiFittingPage = () => {
	// 목데이터
	const imageUrlExample = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI'
	const fittingItemInfoImgExample = 'https://lh3.googleusercontent.com/d/1Xijhz5zKYVwsYP8ZANbMvCtTdlgIT-YU'
	
	const [isAiFitting, setIsAiFitting] = useState(0);

	const [isHearted, setIsHearted] = useState(false);

	const [isFittingFetching, setIsFittingFetching] = useState(false);
	const [isFittingPending, setIsFittingPending] = useState(false);
	const [isReviewPending, setIsReviewPending] = useState(false);
	
	const handleTabBarFitting = () => {
		setIsAiFitting(0);
	}
	const handleTabBarReview = () => {
		setIsAiFitting(1);
	}

	const handleHeart = () => {
		setIsHearted((prev) => prev ? false : true)
	}
	const handleFittingStarted = () => {
		setIsFittingFetching((prev) => prev? false : true)
	}

	const handleFittingPending = () => {
		setIsFittingPending((prev) => prev? false : true)
	}

	return (
		<div className="flex flex-col px-4 h-full w-full">

			<TabBar
				isAiFitting={isAiFitting}
				handleTabBarFitting={handleTabBarFitting}
				handleTabBarReview={handleTabBarReview}
			/>
			
			<FittingItemInfo
				itemImgUrl={fittingItemInfoImgExample}
				isHearted={isHearted}
				handleHeart={handleHeart}
			/>
			
			{!isAiFitting ? <AiFittingBody
				isFittingFetching={isFittingFetching}
				isFittingPending={isFittingPending}
				imageUrlExample={imageUrlExample}
				handleFittingStarted={handleFittingStarted}
			                /> : <AiReviewBody />}
		</div>
	)
}

export default AiFittingPage;
