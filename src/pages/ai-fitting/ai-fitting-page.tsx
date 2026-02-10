import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import type { AiSummaryState, FittingState, ReviewListState } from '@/src/types/ai-fitting/status';
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
	const navigate = useNavigate();

	// ** useState, useQuery, useMutation, 커스텀 훅 선언 **
	// useState, 커스텀 훅 선언
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [modal, setModal] = useState<ModalState>({ type : 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const [isReviewEnabled, setIsReviewEnabled] = useState(false);
	const [isReviewAiEnabled, setIsReviewAiEnabled] = useState(false);
	const [fittingResultUrl, setFittingResultUrl] = useState('');

	// useQuery, useMutation 선언 
	const { mutate : mutateLike } = useLike({ createToast });
	const { mutate : mutateFitting,  data : resultFitting, isPending : isFittingLoading, isError : isFittingError, isSuccess : isFittingSuccess } = usePostFitting({ createToast });
	const { mutate : mutateReview } = usePostReview();
	const { mutate : mutateReviewAi } = usePostReviewAi();

	const { data : recentReview, isLoading : isReviewLoading } = useGetReview(productId, { enabled : isReviewEnabled });
	const { data : aiReview, isLoading : isAiReviewLoading } = useGetReviewAi(productId, { enabled : isReviewAiEnabled });
	const { data : productData, isLoading, isError } = useProductsDetail(productId);
	const { data : profile } = useGetProfileImg();

	// (A) 피팅 결과 이미지 저장
	useEffect(() => {
		if (isFittingSuccess && resultFitting?.fittingResultImageUrl) {
			// eslint-disable-next-line
			setFittingResultUrl(resultFitting?.fittingResultImageUrl);
		}
	}, [resultFitting, isFittingSuccess]);

	// (B) [핵심] 리뷰 크롤링 완료 감지 -> AI 요약 요청 자동 실행
	useEffect(() => {
		// 조건: 
		// 1. 리뷰 조회가 켜져 있고 (분석 시작됨)
		// 2. 리뷰 데이터가 'completed' 상태로 들어왔으며
		// 3. 아직 AI 조회가 켜지지 않았다면 (중복 요청 방지)
		if (
			isReviewEnabled && 
            recentReview?.result?.status === 'completed' && 
            !isReviewAiEnabled
		) {
			console.log('🚀 리뷰 크롤링 완료! AI 요약 생성을 요청합니다.');
            
			// 1. AI 요약 생성 요청 (POST)
			mutateReviewAi({ productId });
            
			// 2. AI 요약 조회 폴링 시작 (GET)
			// eslint-disable-next-line
			setIsReviewAiEnabled(true);
		}
	}, [isReviewEnabled, recentReview, isReviewAiEnabled, mutateReviewAi, productId]);

	// FittingTab 상태
	const currentFittingState = useMemo((): FittingState => {
		if (isFittingLoading) return { status: 'loading' };
		if (fittingResultUrl) return { status: 'success', resultUrl: fittingResultUrl };
		if (isFittingError) return { status: 'error' };
		return { status: 'idle' };
	}, [isFittingLoading, fittingResultUrl, isFittingError]);

	const currentReviewState = useMemo((): ReviewListState => {
		if (isReviewLoading || recentReview?.result?.status === 'processing') {
			return { status: 'loading' };
		}
		if (recentReview?.result?.status === 'failed') {
			return { status: 'error' };
		}
		if (recentReview?.result?.status === 'completed') {
			return { 
				status: 'success', 
				reviews: recentReview.result.reviews ?? [], 
			};
		}
		return { status: 'idle' };
	}, [recentReview, isReviewLoading]);

	const currentAiSummaryState = useMemo((): AiSummaryState => {
		if (!isReviewAiEnabled || isAiReviewLoading || !aiReview) return { status: 'loading' };
                
		if (aiReview) {
			return { 
				status: 'success', 
				result: aiReview, 
			};
		}
        
		return { status: 'error' };
	}, [isReviewAiEnabled, isAiReviewLoading, aiReview]);

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

	console.log('현재 리뷰 상태 : ', currentReviewState);
	console.log('현재 리뷰 데이터 : ', recentReview);
	console.log('피팅 상태 : ', currentFittingState);
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
						aiState={currentAiSummaryState}
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
