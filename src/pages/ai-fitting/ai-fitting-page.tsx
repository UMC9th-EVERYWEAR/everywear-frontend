import { useState, useEffect } from 'react';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo, { type ItemData } from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; // 이름 통일

// 타입 임포트
import type { FittingState, ReviewTabState } from '@/src/types/ai-fitting/status';
import { MOCK_REVIEW_DATA } from '@/src/data/ai-fitting/reviewMockData'; // 이 데이터도 타입에 맞춰주세요

export type TabType = 'fitting' | 'review';

// 목데이터 설정
const itemDataExample: ItemData = {
	company: '무신사',
	rating: 4.7,
	title: '베이직 화이트 티셔츠',
	price: 29000,
	imgUrl: 'https://lh3.googleusercontent.com/d/1Xijhz5zKYVwsYP8ZANbMvCtTdlgIT-YU',
	buyUrl: '',
};

const AiFittingPage = () => {
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [isHearted, setIsHearted] = useState(false);

	const [fittingState, setFittingState] = useState<FittingState>({ status: 'idle' });
    
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModal = () => isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)	


	const handleTabChange = (newTab: TabType) => setActiveTab(newTab);
	const handleHeart = () => setIsHearted((prev) => !prev);
	const handleFittingStateChange = (status : FittingState) => setFittingState(status)

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className="flex flex-col px-4 h-full w-109"> {/* 모바일 너비 고정 예시 */}
                
				<TabBar
					activeTab={activeTab}
					onTabChange={handleTabChange}
				/>

				<FittingItemInfo
					data={itemDataExample}
					isHearted={isHearted}
					handleHeart={handleHeart}
				/>

				{activeTab === 'fitting' && (
					<FittingTab
						state={{ status : 'success', resultUrl : 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI' }}
						onClick={handleFittingStateChange}
						onModalChange={handleModal}
					/>)}
			</div>
		</div>
	);
};

export default AiFittingPage;
