import { useState } from 'react';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo, { type ItemData } from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import { MOCK_REVIEW_DATA } from '@/src/data/ai-fitting/reviewMockData'; 
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';
import toast, { Toaster } from 'react-hot-toast';
export type TabType = 'fitting' | 'review';


// 목데이터 설정
const itemDataExample: ItemData = {
	company: '무신사',
	rating: 4.7,
	title: '베이직 화이트 티셔츠',
	price: 29000,
	imgUrl: 'https://lh3.googleusercontent.com/d/1Xijhz5zKYVwsYP8ZANbMvCtTdlgIT-YU',
	buyUrl: 'https://www.musinsa.com/products/5863714',
};

const AiFittingPage = () => {
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [isHearted, setIsHearted] = useState(false);

	const [fittingState, setFittingState] = useState<FittingState>({ status: 'idle' });
	const [reviewState, setReviewState] = useState<ReviewState>({ status : 'idle' })
	const [modal, setModal]	 = useState<ModalState>({ type : 'none' });

	// 핸들러 함수
	// 탭 변환 핸들러
	const handleTabChange = (newTab: TabType) => setActiveTab(newTab);

	// 피팅 시작 함수(에러 상황까지 구현)
	// 나중에 api 연결되면 api 요청으로 변환할 예정
	const handleSimulateFitting = () => {
		handleSuccessToast();
		setFittingState({ status: 'loading' });

		// 피팅 로딩 처리
		setTimeout(() => {
			const isFittingError = 1;
			
			if (isFittingError) {
				setFittingState({ status: 'error', error: 'INVALID_USER_IMAGE' });
				setModal({ 
					type: 'fittingError', 
					reason: 'INVALID_USER_IMAGE',
				});
			} else {
				setFittingState({ 
					status: 'success', 
					resultUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI', 
				});
				// 성공 시 모달 오픈
				setModal({ type: 'success' }); 
			}
		}, 10000);
		handleSimulateReview();
	};

	const handleSimulateReview = () => {
		setReviewState({ status : 'loading' });
		// 리뷰 로딩 처리
		setTimeout(() => {
			const isReviewError = 0; 
			const isSummaryError = 1;

			if (isReviewError) {
				setReviewState({ status: 'fatal_error', error: 'NETWORK_ERROR' });
				setModal({ 
					type: 'reviewError', 
					reason: 'NETWORK_ERROR',
				});
			} else {
				setReviewState({ 
					status: 'success', 
					summary: isSummaryError ? { status : 'error', error: 'INSUFFICIENT_REVIEWS' } : { status : 'success', text : MOCK_REVIEW_DATA.summary },
					keywords: MOCK_REVIEW_DATA.keywords,
					reviews: MOCK_REVIEW_DATA.reviews,
				});
			}
		}, 5000);
	}

	const handleStartFitting = () => {
		setFittingState({ status: 'loading' });
		handleStartReview();
	}

	const handleStartReview = () => {
		setReviewState({ status : 'loading' });
	}

	const handleSuccessFitting = () => {
		setFittingState({ 
			status: 'success', 
			resultUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI', 
		});
		setModal({ type: 'success' }); 
		handleSuccessReview();
	}

	const handleSuccessReview = () => {
		setReviewState({ status: 'success', keywords: MOCK_REVIEW_DATA.keywords, summary: { status : 'success', text : MOCK_REVIEW_DATA.summary }, reviews: MOCK_REVIEW_DATA.reviews });
		setModal({
			type: 'success',
		})
	}

	// 에러 모달 시 확인 버튼 기능
	// 모달 닫고, 피팅 상태 초기화
	const handleFittingErrorModalClose = () => {
		setModal({ type: 'none' }); 
		setFittingState({ status: 'idle' });
	};

	const handleReviewErrorModalClose = () => {
		setModal({ type: 'none' }); 
		setReviewState({ status: 'idle' });
	};

	// 일반 모달 닫기 (성공, 하트 등에서 사용 - 상태 리셋 안 함)
	const handleGeneralModalClose = () => {
		setModal({ type: 'none' });
	};

	// 하트(찜) 클릭
	const handleHeart = () => {
		const nextState = !isHearted;
		setIsHearted(nextState);
		// 찜이 되었을 때만 모달 열기
		if (nextState) {
			setModal({ type: 'heart' });
		}
	};

	// 구매 클릭
	const handleBuy = () => {
		setModal({ type: 'buy' });
	};

	const handleGoToShop = () => {
		// window.open(주소, '_blank', 보안옵션)
		window.open('https://www.musinsa.com/products/5863714', '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	const handleSuccessToast = () => {
		toast('AI 피팅을 시작하겠습니다.');
	}

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className="flex flex-col px-4 h-full w-109 relative"> {/* 모바일 너비 고정 예시 */}
                
				<Toaster
					containerStyle={
						{ 
							position: 'absolute',
							top: 200,
							right: 200,

						}
					}
					toastOptions={{
						// 토스트 자체의 스타일 (선택사항)
						style: {
							background: '#333',
							color: '#fff',
						},
					}}
				/>

				<TabBar
					activeTab={activeTab}
					onTabChange={handleTabChange}
				/>

				<FittingItemInfo
					data={itemDataExample}
					isHearted={isHearted}
					handleHeart={handleHeart}
					handleBuy={handleBuy}
				/>

				{/* 탭 렌더링 */}
				{activeTab === 'fitting' && (
					<FittingTab
						state={fittingState}
						onStartFitting={handleSimulateFitting}
					/>
				)}

				{activeTab === 'review' && (
					<ReviewTab
						state={reviewState}
					/>
				)}


				<Modal
					isOpen={modal.type === 'success'}
					onClose={handleGeneralModalClose}
					text="가상 피팅이 완료되었습니다."
					btn1Text="확인하러 가기"
					btn1Action={handleGeneralModalClose}
				/>

				<Modal
					isOpen={modal.type === 'fittingError' && modal.reason === 'INVALID_PRODUCT_IMAGE'}
					onClose={handleFittingErrorModalClose}
					title='AI 피팅을 실패했습니다'
					text='피팅이 불가능한 상품입니다'
					btn1Text="확인"
					btn1Action={handleFittingErrorModalClose}
				/>

				<Modal
					isOpen={modal.type === 'fittingError' && modal.reason === 'INVALID_USER_IMAGE'}
					onClose={handleFittingErrorModalClose}
					title='AI 피팅을 실패했습니다'
					text='가이드에 맞는 대표사진으로 변경해주세요'
					btn1Text="확인"
					btn1Action={handleFittingErrorModalClose}
					btn2Text='변경하기'
				/>

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

				<Modal
					isOpen={modal.type === 'reviewSummaryError' && modal.reason === 'GENERATION_FAILED'}
					onClose={handleReviewErrorModalClose}
					text='AI 리뷰 요약을 실패했습니다.'
					btn1Text="재시도"
					btn1Action={handleStartReview}
					btn2Text='닫기'
					btn2Action={handleReviewErrorModalClose}
				/>

				<Modal
					isOpen={modal.type === 'reviewSummaryError' && modal.reason === 'INSUFFICIENT_REVIEWS'}
					onClose={handleReviewErrorModalClose}
					title='AI 리뷰 요약을 실패했습니다.'
					text='리뷰 수가 부족하여 AI 리뷰 요약이 불가능합니다.'
					btn1Text="확인"
					btn1Action={handleReviewErrorModalClose}
				/>

				<Modal
					isOpen={modal.type === 'reviewError' && modal.reason === 'NETWORK_ERROR'}
					onClose={handleReviewErrorModalClose}
					title='AI 리뷰를 가져오는 데 실패했습니다.'
					text='네트워크 오류가 발생했습니다.'
					btn1Text="확인"
					btn1Action={handleReviewErrorModalClose}
				/>

				<Modal
					isOpen={modal.type === 'reviewError' && modal.reason === 'SERVER_ERROR'}
					onClose={handleReviewErrorModalClose}
					title='AI 리뷰를 가져오는 데 실패했습니다.'
					text='예기치 못한 오류가 발생했습니다.'
					btn1Text="확인"
					btn1Action={handleReviewErrorModalClose}
				/>
			</div>
		</div>
	);
};

export default AiFittingPage;
