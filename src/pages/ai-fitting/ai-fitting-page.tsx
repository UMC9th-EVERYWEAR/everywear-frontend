import { useState } from 'react';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo, { type ItemData } from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import { MOCK_REVIEW_DATA } from '@/src/data/ai-fitting/reviewMockData'; 
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';

export type TabType = 'fitting' | 'review';

const itemDataExample: ItemData = {
	company: '무신사',
	rating: 4.7,
	title: '베이직 화이트 티셔츠',
	price: 29000,
	imgUrl: 'https://lh3.googleusercontent.com/d/1Xijhz5zKYVwsYP8ZANbMvCtTdlgIT-YU',
	buyUrl: 'https://www.musinsa.com/products/5863714',
};

const AiFittingPage = () => {
	// 상태 정의
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [isHearted, setIsHearted] = useState(false);
	const [fittingState, setFittingState] = useState<FittingState>({ status: 'idle' });
	const [reviewState, setReviewState] = useState<ReviewState>({ status : 'idle' })
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();
    
	
	const handleTabChange = (newTab: TabType) => setActiveTab(newTab);

	const handleHeart = () => {
		const nextState = !isHearted;
		setIsHearted(nextState);
		if (nextState) createToast({ message: '내 옷장에 추가되었습니다.' });
	};

	const handleBuy = () => setModal({ type: 'buy' });

	// TODO: 쇼핑몰 이동 시 기기 내 설치된 앱이 열리도록 기능 구현
	const handleGoToShop = () => {
		window.open(itemDataExample.buyUrl, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	const handleStartFitting = () => {
		createToast({ message: 'AI 피팅을 시작하겠습니다.' });
		setFittingState({ status: 'loading' });
	}

	const handleStartReview = () => {
		setReviewState({ status: 'loading' });
	}

	const handleSuccessFitting = () => {
		createToast({ message: '가상 피팅이 완료되었습니다.' });
		setFittingState({ status: 'success', resultUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI' })
	}

	const handleSuccessReview = () => {
		setReviewState({ status: 'success', summary: { status: 'loading' }, keywords: MOCK_REVIEW_DATA.keywords, reviews: MOCK_REVIEW_DATA.reviews })
	}

	const handleSuccessSummary = () => {
		setReviewState((prev) => {
			// 현재 상태가 'success'인지 먼저 확인
			// 'success'가 아니라면 무시(prev 반환)
			if (prev.status !== 'success') {
				return prev;
			}

			// ...prev를 통해 기존 reviews, keywords를 유지하고 summary만 덮어쓰기
			return {
				...prev,
				summary: { 
					status: 'success', 
					text: MOCK_REVIEW_DATA.summary, 
				},
			};
		});
	};

	// const handleErrorSummary = () => {
	// 	setReviewState((prev) => {
	// 		if (prev.status !== 'success') return prev;

	// 		return {
	// 			...prev,
	// 			summary: { 
	// 				status: 'error', 
	// 				error: 'INSUFFICIENT_REVIEWS', 
	// 			},
	// 		};
	// 	});
	// 	createToast({ message : '리뷰 수가 부족하여 AI 리뷰 요약이 불가능합니다.' })

	// };

	// const handleErrorReview = () => {
	// 	setReviewState({ status: 'error', error: 'SERVER_ERROR' });
	// }

	// const handleErrorFitting = ( errorReason  : FittingErrorReason) => {
	// 	setFittingState({ status: 'error', error: errorReason })
	// 	createToast({ message: 'AI 피팅을 실패했습니다.' })
	// 	if (errorReason === 'INVALID_PRODUCT_IMAGE') createToast({ message: '피팅이 불가능한 상품입니다.' });
	// 	else if (errorReason === 'INVALID_USER_IMAGE') createToast({ message: '가이드에 맞는 대표사진으로 변경해주세요.' });
	// 	else if (errorReason === 'UNKNOWN_ERROR') createToast({ message: '예상치 못한 오류가 발생했습니다.' })
	// }

	const handleGeneralModalClose = () => {
		setModal({ type: 'none' });
	};

	// AI 피팅 시뮬레이터 함수
	// TODO : api 연결로 대체
	const handleSimulateFitting = () => {
		handleStartFitting();
		handleStartReview();
		setTimeout(() => {
			handleSuccessFitting();
		}, 10000);
		setTimeout(() => {
			handleSuccessReview();
		}, 1000);
		setTimeout(() => {
			handleSuccessSummary();
		}, 2000);
	}

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className="flex flex-col px-4 h-full w-full max-w-109 relative">
                
				<ToastContainer>
					{toasts.map((toast) => (
						<Toast
							key={toast.id}
							id={toast.id}
							message={toast.message}
							deleteToast={deleteToast}
						/>
					))}
				</ToastContainer>

				<TabBar
					activeTab={activeTab}
					onTabChange={handleTabChange}
					isIdle={fittingState.status === 'idle' && reviewState.status === 'idle' }
					onIdleToast={createToast}
				/>

				<FittingItemInfo
					data={itemDataExample}
					isHearted={isHearted}
					handleHeart={handleHeart}
					handleBuy={handleBuy}
				/>

				{activeTab === 'fitting' && (
					<FittingTab
						state={fittingState}
						handleStartFitting={handleSimulateFitting}
						handleRestartFitting={handleStartFitting}
						
					/>
				)}

				{activeTab === 'review' && (
					<ReviewTab
						state={reviewState}
						handleStartReview={handleStartReview}
					/>
				)}

				<Modal
					isOpen={modal.type === 'buy'}
					onClose={handleGeneralModalClose}
					text='해당 쇼핑몰로 이동하시겠습니까?'
					btn1Text="이동하기"
					btn1Action={handleGoToShop}
					btn2Text='취소'
					btn2Action={handleGeneralModalClose}
				/>



				<Modal
					isOpen={modal.type === 'heart'}
					onClose={handleGeneralModalClose}
					text='내 옷장에 추가되었습니다'
					btn1Text="확인"
					btn1Action={handleGeneralModalClose}
				/>


			</div>
		</div>
	);
};

export default AiFittingPage;
