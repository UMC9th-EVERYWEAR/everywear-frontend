import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo, { type ItemData } from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type {  FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import { MOCK_REVIEW_DATA } from '@/src/data/ai-fitting/reviewMockData'; 
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';
import { useProducts } from '@/src/hooks/service/product/useProducts';

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
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [isHearted, setIsHearted] = useState(false);
	const [fittingState, setFittingState] = useState<FittingState>({ status: 'idle' });
	const [reviewState, setReviewState] = useState<ReviewState>({ status : 'idle' });
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const allowExitRef = useRef(false);
	const isAnalyzing = fittingState.status === 'loading' || reviewState.status === 'loading';
	const isAnalyzingRef = useRef(false);

	// 전체 상품 조회 후 url에서 id 가져와 특정 상품 데이터 필터링
	// 단일 상품 조회 api 생성 시 대체 예정
	const { id } = useParams();
	const { data, isSuccess } = useProducts();
	const detailProduct = isSuccess && data ? data.find((p) => p.product_id === Number(id)) : null;
	console.log('detailProduct : ', detailProduct);
	useEffect(() => {
		isAnalyzingRef.current = isAnalyzing;
		// 분석이 시작되는 순간 히스토리를 하나 쌓아서 뒤로가기를 가로챕니다. -> 즉 1이 쌓이고 이때부턴 뒤로가기 되려면 -2가 되야함.
		if (isAnalyzing) {
			window.history.pushState(null, '', window.location.href);
		}
	}, [isAnalyzing]);

	useEffect(() => {
		const handlePopState = () => {
			if (allowExitRef.current) return;

			if (isAnalyzingRef.current) {
				// 분석 중이면 현재 페이지에 머물게 하고 모달을 띄움
				window.history.pushState(null, '', window.location.href);
				setModal({ type: 'exit_confirm' });
			} else {
				// 분석 중이 아니면 정상적으로 뒤로가기 허용
				navigate(-1);
			}
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, [navigate]);

	const handleHeart = () => {
		const nextState = !isHearted;
		setIsHearted(nextState);
		if (nextState) createToast({ message: '내 옷장에 추가되었습니다.' });
	};

	const handleGoToShop = () => {
		window.open(itemDataExample.buyUrl, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	const handleStartFitting = () => {
		createToast({ message: 'AI 피팅을 시작하겠습니다.' });
		setFittingState({ status: 'loading' });
	};

	const handleSuccessFitting = () => {
		createToast({ message: '가상 피팅이 완료되었습니다.' });
		setFittingState({
			status: 'success',
			resultUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		});
	};

	const handleSuccessReview = () => {
		setReviewState({
			status: 'success',
			summary: { status: 'loading' },
			keywords: MOCK_REVIEW_DATA.keywords,
			reviews: MOCK_REVIEW_DATA.reviews,
		});
	};

	const handleSuccessSummary = () => {
		setReviewState((prev) => {
			if (prev.status !== 'success') return prev;
			return {
				...prev,
				summary: { status: 'success', text: MOCK_REVIEW_DATA.summary },
			};
		});
	};

	// const handleErrorFitting = (errorReason: FittingErrorReason) => {
	// 	setFittingState({ status: 'error', error: errorReason });
	// 	createToast({ message: 'AI 피팅을 실패했습니다.' });
	// };

	// const handleErrorReview = () => {
	// 	setReviewState({ status: 'error', error: 'SERVER_ERROR' });
	// };

	// const handleErrorSummary = () => {
	// 	setReviewState((prev) => {
	// 		if (prev.status !== 'success') return prev;
	// 		return {
	// 			...prev,
	// 			summary: { status: 'error', error: 'INSUFFICIENT_REVIEWS' },
	// 		};
	// 	});
	// 	createToast({ message: '리뷰 요약에 실패했습니다.' });
	// };

	const handleExitConfirm = () => {
		allowExitRef.current = true;
		setModal({ type: 'none' });
		navigate(-2); // pushState로 쌓인 히스토리까지 고려하여 -2 이동
	};

	const handleSimulateFitting = () => {
		handleStartFitting();
		setReviewState({ status: 'loading' });
		setTimeout(handleSuccessFitting, 5000);
		setTimeout(handleSuccessReview, 1000);
		setTimeout(handleSuccessSummary, 2000);
	};

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className="flex flex-col px-4 h-full w-full max-w-109 relative">
				<ToastContainer>
					{toasts.map((t) => (
						<Toast
							key={t.id}
							id={t.id}
							message={t.message}
							deleteToast={deleteToast}
						/>
					))}
				</ToastContainer>

				<TabBar 
					activeTab={activeTab} 
					onTabChange={setActiveTab} 
					isIdle={!isAnalyzing}
					onIdleToast={createToast}
				/>

				<FittingItemInfo
					data={itemDataExample}
					isHearted={isHearted}
					handleHeart={handleHeart}
					handleBuy={() => setModal({ type: 'buy' })}
				/>

				{activeTab === 'fitting' && (
					<FittingTab 
						state={fittingState} 
						handleStartFitting={handleSimulateFitting} 
						handleRestartFitting={handleSimulateFitting}
                       
					/>
				)}

				{activeTab === 'review' && (
					<ReviewTab 
						state={reviewState} 
						handleStartReview={() => setReviewState({ status: 'loading' })}
                        
					/>
				)}

				{/* 모달 섹션 */}
				<Modal
					isOpen={modal.type === 'buy'}
					onClose={() => setModal({ type: 'none' })}
					text="쇼핑몰로 이동할까요?"
					btn1Text="이동"
					btn1Action={handleGoToShop}
					btn2Text="취소"
					btn2Action={() => setModal({ type: 'none' })}
				/>
                
				<Modal 
					isOpen={modal.type === 'exit_confirm'} 
					onClose={() => setModal({ type: 'none' })} 
					title="분석을 중단할까요?"
					text="지금 나가시면 분석 결과가 저장되지 않습니다." 
					btn1Text="나가기" 
					btn1Action={handleExitConfirm} 
					btn2Text="취소" 
					btn2Action={() => setModal({ type: 'none' })} 
				/>
			</div>
		</div>
	);
};

export default AiFittingPage;
