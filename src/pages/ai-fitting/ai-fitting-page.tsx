import { useState } from 'react';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo, { type ItemData } from '@/src/components/ai-fitting/FittingItemInfo';
import AiFittingBody from '@/src/components/ai-fitting/AiFittingBody';
import AiReviewBody from '@/src/components/ai-fitting/AiReviewBody';

import { dummyReviewData, dummyReviewKeywordData, dummyReviewSummaryData } from '@/src/data/ai-fitting/reviewMockData';

// type status = 'idle' | 'loading' | 'success' | 'error';

export type TabType = 'fitting' | 'review';

// 목데이터
const imageUrlExample = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI'
	
const itemDataExample : ItemData = {
	company: '무신사',
	rating: 4.7,
	title: '베이직 화이트 티셔츠',
	price: 29000,
	imgUrl: 'https://lh3.googleusercontent.com/d/1Xijhz5zKYVwsYP8ZANbMvCtTdlgIT-YU',
}

const AiFittingPage = () => {
	
	const [activeTab, setActiveTab] = useState<'fitting' | 'review'>('fitting');

	const [isHearted, setIsHearted] = useState(false);

	const [isFittingFetching, setIsFittingFetching] = useState(false);
	const [isFittingPending, setIsFittingPending] = useState(false);
	// const [isReviewPending, setIsReviewPending] = useState(false);
	
	const handleTabChange = (newTab : TabType) => setActiveTab(newTab);

	const handleHeart = () => {
		setIsHearted((prev) => !prev)
	}
	const handleFittingStarted = () => {
		setIsFittingFetching((prev) => !prev)
	}

	const handleFittingPending = () => {
		setIsFittingPending((prev) => !prev)
	}

	return (
		<div className='flex items-center justify-center'>
			<div className="flex flex-col px-4 h-full w-109 ">

				<TabBar
					activeTab={activeTab}
					onTabChange={handleTabChange}
				/>
			
				<FittingItemInfo
					data={itemDataExample}
					isHearted={isHearted}
					handleHeart={handleHeart}
				/>
			
				{activeTab === 'fitting' ? 
					<AiFittingBody
						isFittingFetching={isFittingFetching}
						isFittingPending={isFittingPending}
						imageUrlExample={imageUrlExample}
						handleFittingStarted={handleFittingStarted}
					/> : 
					<AiReviewBody
						isAnalysisStarted={true}
						isReviewFetching={false}
						isReviewSummaryFetching={false}
						summaryData={dummyReviewSummaryData}
						keywordData={dummyReviewKeywordData.data}
						reviewData={dummyReviewData}

					/>}
			</div>
		</div>
	)
}

export default AiFittingPage;
