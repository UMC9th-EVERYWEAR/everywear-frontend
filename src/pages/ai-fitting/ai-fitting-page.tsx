import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';
import { useProducts } from '@/src/hooks/service/product/useProducts';
import useLike from '@/src/hooks/service/fitting/useLike';
import usePostFitting from '@/src/hooks/service/fitting/usePostFitting';

export type TabType = 'fitting' | 'review';

const AiFittingPage = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [reviewState, setReviewState] = useState<ReviewState>({ status : 'idle' });
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	// 전체 상품 조회 후 url에서 id 가져와 특정 상품 데이터 필터링
	// 단일 상품 조회 api 생성 시 대체 예정
	const { id } = useParams();
	const { data, isSuccess } = useProducts();
	const detailProduct = isSuccess && data ? data.find((p) => p.product_id === Number(id)) : null;

	const { mutate : mutateLike } = useLike({ createToast });
	const { mutate : mutateFitting,  data : resultFitting, isPending : isFittingLoading, isSuccess : isFittingSuccess, isError : isFittingError } = usePostFitting({ createToast })

	const getFittingState = (): FittingState => {
		if (isFittingLoading) {
			return { status: 'loading' };
		}
		if (isFittingSuccess) {
			return { 
				status: 'success', 
				resultUrl: resultFitting?.fittingResultImageUrl,
			};
		}
		if (isFittingError) {
			return { status: 'error', error: 'UNKNOWN_ERROR' }; 
		}
		return { status: 'idle' };
	};

	// FittingTab 상태
	const currentFittingState = getFittingState();

	// 피팅 중 뒤로가기 방지용 
	const allowExitRef = useRef(false);
	const isAnalyzing = isFittingLoading || reviewState.status === 'loading';
	const isAnalyzingRef = useRef(false);

	// useEffect(피팅 중 뒤로가기 방지)
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


	// 이벤트 핸들러
	
	// 좋아요 토글 핸들러
	const handleHeart = (currentLikedStatus: boolean) => {
		if (!detailProduct) return;
        
		mutateLike({ 
			productId: Number(id), 
			isLiked: currentLikedStatus, 
		});
	};

	// 쇼핑몰 링크 이동 핸들러
	const handleGoToShop = () => {
		// '_blank' : 새 창에서 열기
		window.open(detailProduct?.product_url, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	// 피팅 시작 핸들러
	const handleStartFitting = () => {
		if (!detailProduct) return;
		createToast({ message: 'AI 피팅을 시작하겠습니다.' });

		mutateFitting({
			payload : { productId : detailProduct.product_id },
		})
	};

	// 피팅중 뒤로가기 및 경로 초기화 핸들러
	const handleExitConfirm = () => {
		allowExitRef.current = true;
		setModal({ type: 'none' });
		navigate(-2); // pushState로 쌓인 히스토리까지 고려하여 -2 이동
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
					key={detailProduct?.product_id}
					data={detailProduct}
					handleHeart={handleHeart}
					handleBuy={() => setModal({ type: 'buy' })}
				/>

				{activeTab === 'fitting' && (
					<FittingTab
						state={currentFittingState} 
						handleStartFitting={handleStartFitting} 
						handleRestartFitting={handleStartFitting}
                       
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
