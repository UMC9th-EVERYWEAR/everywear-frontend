import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { FittingState, ReviewState, ReviewSummaryState } from '@/src/types/ai-fitting/status';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { Modal } from '@/src/components/common/Modal';
import useLike from '@/src/hooks/service/fitting/useLike';
import usePostFitting from '@/src/hooks/service/fitting/usePostFitting';
import usePostReview from '@/src/hooks/service/review/usePostReveiw';
import usePostReviewAi from '@/src/hooks/service/review/usePostReviewAi';
import useGetReview from '@/src/hooks/service/review/useGetReview';
import useGetReviewAi from '@/src/hooks/service/review/useGetReviewAi';
import useProductsDetail from '@/src/hooks/service/product/useProductsDetail';
import useGetProfileImg from '@/src/hooks/service/user/useGetProfileImg';

export type TabType = 'fitting' | 'review';

const AiFittingPage = () => {
	
	// product_id useParams()로 가져오기
	const { id } = useParams();
	const productId = Number(id);

	// ** useState, useQuery, useMutation, 커스텀 훅 선언 **
	// useState, 커스텀 훅 선언
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();
	const [isReviewEnabled, setIsReviewEnabled] = useState(false);
	const [isReviewAiEnabled, setIsReviewAiEnabled] = useState(false);

	// useQuery, useMutation 선언 
	const { mutate : mutateLike } = useLike({ createToast });
	const { mutate : mutateFitting,  data : resultFitting, isPending : isFittingLoading, isError : isFittingError } = usePostFitting({ createToast });
	const { mutate : mutateReview } = usePostReview();
	const { mutate : mutateReviewAi } = usePostReviewAi();
	const { data : recentReview, isLoading : isReviewLoading } = useGetReview(productId, { enabled : isReviewEnabled });
	const { data : aiReview, isLoading : isAiReviewLoading } = useGetReviewAi(productId, { enabled : isReviewAiEnabled });
	const { data : productData, isLoading, isError } = useProductsDetail(productId);
	const { data : profile } = useGetProfileImg();

	// FittingTab 상태
	const  currentFittingState = useMemo((): FittingState => {
		if (isFittingLoading) {
			return { status: 'loading' };
		}
		if (resultFitting) {
			return { 
				status: 'success', 
				resultUrl: resultFitting?.fittingResultImageUrl,
			};
		}
		if (isFittingError) {
			return { status: 'error' }; 
		}
		return { status: 'idle' };
	}, [isFittingLoading, isFittingError, resultFitting])

	const currentReviewState = useMemo((): ReviewState => {
		if (recentReview?.status === 'processing') {
			return { status: 'loading' };
		}

		if (recentReview?.status === 'failed') {
			return { status: 'error' };
		}

		if (recentReview?.status === 'complete') {
			let summaryState: ReviewSummaryState;

			if (isAiReviewLoading) {
				summaryState = { status: 'loading' };
			} else if (aiReview) {
				summaryState = { 
					status: 'success', 
					result : {
						keywords : aiReview.keywords || [],
						summary : aiReview.summary || '', 
					},
				};
			} else {
				summaryState = { status: 'error' };
			}

			return {
				status: 'success',
				reviews: recentReview.reviews ?? [],
				summary: summaryState,
			};
		}

		// 4. 기본 상태
		return { status: 'idle' };
	}, [recentReview, isAiReviewLoading, aiReview]);

	// 피팅 중 뒤로가기 방지용 
	const allowExitRef = useRef(false);
	const isAnalyzing = isFittingLoading || isReviewLoading || isAiReviewLoading;
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

	if (isLoading) {
		return <div className="flex justify-center p-10">로딩 중...</div>;
	}

	if (isError || !productData) {
		return <div className='flex justify-center p-10'>상품 정보를 찾을 수 없습니다.</div>
	}

	// ** 이벤트 핸들러 **
	
	// 좋아요 토글 핸들러
	const handleHeart = (currentLikedStatus: boolean) => {
		mutateLike({ 
			productId: productId, 
			isLiked: currentLikedStatus, 
		});
	};

	// 쇼핑몰 링크 이동 핸들러
	const handleGoToShop = () => {
		window.open(productData?.product_url, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	// 피팅 시작 핸들러
	const handleStartFitting = () => {
		createToast({ message: 'AI 피팅을 시작하겠습니다.' });

		mutateFitting({
			payload : { productId : productData.product_id },
		})
	};

	const handleGetReview = () => {
		setIsReviewEnabled(true);
	}

	const handleGetReviewAi = () => {
		setIsReviewAiEnabled(true);
	}

	const handleStartReview = () => {
		mutateReview({
			payload: { 
				product_id : productId, 
				product_url : productData.product_url ?? '', 
				shoppingmall_name : productData.shoppingmale_name ?? '', 
			},
		})
	}

	const handleStartReviewAi = () => {
		mutateReviewAi({
			productId : productId,
		})
		handleGetReviewAi();
	}

	const handleFirstFitting = () => {
		handleStartFitting();
		handleStartReview();
		handleGetReview();
	}

	const handleExitConfirm = () => {
		allowExitRef.current = true;
		setModal({ type: 'none' });
		navigate(-2); 
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
						handleStartReviewAi={handleStartReviewAi}

                        
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
