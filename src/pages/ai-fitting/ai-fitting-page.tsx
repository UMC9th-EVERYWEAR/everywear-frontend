import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { AiSummaryState, FittingState, ReviewListState } from '@/src/types/ai-fitting/status';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/useToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';
import useLike from '@/src/hooks/service/fitting/useLike';
import usePostFitting from '@/src/hooks/service/fitting/usePostFitting';
import usePostReview from '@/src/hooks/service/review/usePostReview';
import usePostReviewAi from '@/src/hooks/service/review/usePostReviewAi';
import useGetReview from '@/src/hooks/service/review/useGetReview';
import useGetReviewAi from '@/src/hooks/service/review/useGetReviewAi';
import useProductsDetail from '@/src/hooks/service/product/useProductsDetail';
import useGetProfileImg from '@/src/hooks/service/user/useGetProfileImg';
import useGetRecentFitting from '@/src/hooks/service/fitting/useGetRecentFitting';
import usePreventRefresh from '@/src/hooks/domain/products/usePreventRefresh';

export type TabType = 'fitting' | 'review';

const AiFittingPage = () => {
	
	const { id } = useParams();
	const productId = Number(id);
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const [isPollingStarted, setIsPollingStarted] = useState(false);
	const [isPollingStartedAi, setIsPollingStartedAi] = useState(false);
	const [hasRequestedAi, setHasRequestedAi] = useState(false);
	const [reviewAiRetryCount, setReviewAiRetryCount] = useState(0);
	const [isFittingCompleted, setIsFittingCompleted] = useState(false);

	const { mutate : mutateLike } = useLike({ createToast });
	const { mutate : mutateFitting,  isPending : isFittingLoading, isError : isFittingError } = usePostFitting({ createToast });
	const { mutate : startCrawl, isPending : isCrawling } = usePostReview();
	const { 
		mutate: mutateReviewAi, 
		isPending: isAiPostLoading, 
		isError: isAiPostError, 
	} = usePostReviewAi({ createToast });

	const { data : recentReview } = useGetReview(productId, isPollingStarted);
	const { 
		data: aiReview, 
		isError: isAiGetError,
		isLoading : isAiGetLoading,
	} = useGetReviewAi(productId, isPollingStartedAi);
	const { data : productData, isLoading, isError } = useProductsDetail(productId);
	const { data : profile } = useGetProfileImg();
	const { data : fittingResult, isLoading : isLoadingFittingResult } = useGetRecentFitting({ productId, isEnabled : isFittingCompleted })

	useEffect(() => {
		const reviewStatus = recentReview?.result?.status;
    
		if (aiReview?.summary || hasRequestedAi) return;
		if (reviewStatus === 'completed') {
			// eslint-disable-next-line
			setHasRequestedAi(true);

			mutateReviewAi(
				{ productId },
				{
					onSuccess: () => {
						setIsPollingStartedAi(true);
					},
				},
			);
		}
	}, [
		recentReview,     
		aiReview,         
		hasRequestedAi,   
		mutateReviewAi, 
		productId, 
		createToast,
		setIsPollingStartedAi,
	]);
	
	const currentFittingState = useMemo((): FittingState => {
		if (isFittingLoading || isLoadingFittingResult) return { status: 'loading' };
		if (fittingResult) return { status: 'success', resultUrl: fittingResult.fittingResultImageUrl };
		if (isFittingError) return { status: 'error' };
		return { status: 'idle' };
	}, [isFittingLoading, fittingResult, isFittingError, isLoadingFittingResult]);

	const currentReviewState = useMemo((): ReviewListState => {
		const status = recentReview?.result?.status;
		if (status === 'completed') {
			return { 
				status: 'success', 
				reviews: recentReview?.result?.reviews ?? [], 
			};
		}
		if (status === 'failed') {
			return { status: 'error' };
		}
		if (status === 'processing' || status === 'not_started' || isCrawling) {
			return { status: 'loading' };
		}
		return { status: 'idle' };
	}, [isCrawling, recentReview]);

	const currentAiReviewState = useMemo((): AiSummaryState => {
		if (isAiPostError || isAiGetError) {
			return { status: 'error' };
		}

		if (aiReview) {
			return { status: 'success', result: aiReview };
		}

		const isReviewProcessing = recentReview?.result?.status === 'processing';
    
		if (isReviewProcessing || isAiPostLoading || isAiGetLoading) {
			return { status: 'loading' };
		}

		return { status: 'idle' };

	}, [
		isAiPostError, 
		isAiGetError, 
		aiReview, 
		recentReview, 
		isAiPostLoading, 
		isAiGetLoading,
	]);



	const allowExitRef = useRef(false);
	const isAnalyzing = isFittingLoading || recentReview?.result?.status === 'processing' || isCrawling;
	const isAnalyzingRef = useRef(false);

	usePreventRefresh(isAnalyzing);

	useEffect(() => {
		isAnalyzingRef.current = isAnalyzing;
		if (isAnalyzing) {
			window.history.pushState(null, '', window.location.href);
		}
	}, [isAnalyzing]);

	useEffect(() => {
		const handlePopState = () => {
			if (allowExitRef.current) return;

			if (isAnalyzingRef.current) {
				window.history.pushState(null, '', window.location.href);
				setModal({ type: 'exit_confirm' });
			} else {
				navigate(-1);
			}
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, [navigate]);

	if (isLoading) {
		return <div className="flex justify-center p-10">로딩 중...</div>;
	}

	if (isError || !productData) {
		return <div className='flex justify-center p-10'>상품 정보를 찾을 수 없습니다.</div>
	}

	const handleHeart = (currentLikedStatus: boolean) => {
		mutateLike({ 
			productId: productId, 
			isLiked: currentLikedStatus, 
		});
	};

	const handleGoToShop = () => {
		if (productData?.product_url && /^https?:\/\//.test(productData.product_url)) {
			window.open(productData.product_url, '_blank', 'noopener,noreferrer');
			setModal({ type: 'none' });
		}
	};

	const handleStartFitting = () => {
		createToast({ message: 'AI 피팅을 시작하겠습니다.' });

		mutateFitting({
			payload : { productId : productData.product_id },
		}, {
			onSuccess: () => {
				setIsFittingCompleted(true);
			},
			onError: () => {
				setIsFittingCompleted(false);
			},
		})
	};

	const handleStartCrawl = () => {
		startCrawl(
			{
				payload: { 
					product_id : productId, 
					product_url : productData.product_url ?? '', 
					shoppingmall_name : productData.shoppingmale_name ?? '', 
				},
			},
			{
				onSuccess : () => {
					setIsPollingStarted(true);
				},
				onError : () => {
					createToast({ message : '상품을 찾을 수 없습니다.' })
				},
			},
		)
	}

	const handleFirstFitting = () => {
		handleStartFitting();
		handleStartCrawl();
	}

	const handleExitConfirm = () => {
		allowExitRef.current = true;
		setModal({ type: 'none' });
		navigate(-2); 
	};

	const handleStartReviewAi = () => {
		if (reviewAiRetryCount >= 1) return;
		setHasRequestedAi(true);
		setReviewAiRetryCount((prev) => prev + 1);
		mutateReviewAi(
			{ productId },
			{
				onSuccess: () => setIsPollingStartedAi(true),
				onError: () => {
					setHasRequestedAi(false);
				},
			},
		);
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
					isIdle={currentFittingState.status === 'idle'}
					onIdleToast={createToast}
				/>

				<FittingItemInfo
					key={productData?.product_id}
					data={productData}
					handleHeart={handleHeart}
					handleBuy={() => setModal({ type: 'buy' })}
				/>

				{activeTab === 'fitting' && (
					<FittingTab
						profileImg={profile?.representative_img?.imageUrl || ''}
						state={currentFittingState} 
						handleStartFitting={handleFirstFitting} 
						handleRestartFitting={handleStartFitting}
					/>
				)}

				{activeTab === 'review' && (
					<ReviewTab 
						state={currentReviewState}
						aiState={currentAiReviewState}
						handleStartReviewAi={handleStartReviewAi}  
						canRetry={reviewAiRetryCount < 1}                     
					/>
				)}

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
