import { useEffect, useRef, useState, useMemo } from 'react';
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
import { useFittings } from '@/src/hooks/service/fitting/useFittings';
import type { ListDTO } from '@/src/apis/generated';

export type TabType = 'fitting' | 'review';

interface FittingData {
  id: number;
  fittingId?: number;
  productId?: number;
  product_id?: number;
  fittingResultImage: string;
  product?: {
    productId: number;
  };
}

const FittingDetailPage = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [reviewState, setReviewState] = useState<ReviewState>({ status: 'idle' });
	const [modal, setModal] = useState<ModalState>({ type: 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const { id } = useParams();
	const fittingsResult = useFittings() as unknown as { data: FittingData[]; isLoading: boolean };
	const fittingsData = fittingsResult.data;
	const isFittingsLoading = fittingsResult.isLoading;

	const fittingResultFromHistory = useMemo(() => {
		if (!fittingsData || !id) return null;
		const list = Array.isArray(fittingsData) ? fittingsData : (fittingsData as unknown as { data: FittingData[] }).data || [];
		return list.find((f: FittingData) => String(f.id ?? f.fittingId) === String(id)) || null;
	}, [fittingsData, id]);

	const { data: products, isSuccess, isLoading: isProductsLoading } = useProducts();

	const realProductId = useMemo(() => {
		if (!fittingResultFromHistory) return null;
		return (
			fittingResultFromHistory.productId ?? 
      fittingResultFromHistory.product_id ?? 
      fittingResultFromHistory.product?.productId ??
      null
		);
	}, [fittingResultFromHistory]);

	const detailProduct = useMemo(() => {
		if (!isSuccess || !products || !realProductId) return null;
		return products.find((p) => Number(p.product_id) === Number(realProductId)) ?? null;
	}, [isSuccess, products, realProductId]);

	const normalizedProduct = useMemo<ListDTO | null>(() => {
		if (!detailProduct) return null;
		const raw = detailProduct as unknown as Record<string, string | number | boolean>;
		return {
			...detailProduct,
			product_img_url: String(raw.product_img_url || raw.product_image_url || raw.productImageUrl || raw.imageUrl || ''),
			shoppingmale_name: String(raw.shoppingmall_name || raw.siteName || '브랜드'),
		} as ListDTO;
	}, [detailProduct]);

	const { mutate: mutateLike } = useLike({ createToast });
  
	const {
		mutate: mutateFitting,
		data: resultFitting,
		isPending: isFittingLoading,
		isSuccess: isFittingSuccess,
	} = usePostFitting({ createToast });

	const getFittingState = (): FittingState => {
		if (fittingResultFromHistory?.fittingResultImage) {
			return { status: 'success', resultUrl: fittingResultFromHistory.fittingResultImage };
		}
		if (isFittingLoading) return { status: 'loading' };
		if (isFittingSuccess) {
			const res = resultFitting as unknown as Record<string, string>;
			return {
				status: 'success',
				resultUrl: res?.fittingResultImageUrl || res?.fittingResultImage || '',
			};
		}
		return { status: 'idle' };
	};

	const currentFittingState = getFittingState();

	const handleHeart = (status: boolean) => {
		if (normalizedProduct && normalizedProduct.product_id !== undefined) {
			mutateLike({ productId: Number(normalizedProduct.product_id), isLiked: status });
		}
	};

	const handleGoToShop = () => {
		if (!normalizedProduct) return;
		const raw = normalizedProduct as unknown as Record<string, string>;
		const url = raw?.product_url || raw?.purchaseUrl;
		if (url) window.open(url, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	const handleStartFitting = () => {
		if (normalizedProduct) {
			createToast({ message: 'AI 피팅을 시작하겠습니다.' });
			mutateFitting({
				payload: { productId: normalizedProduct.product_id },
			});
		}
	};

	const handleExitConfirm = () => {
		allowExitRef.current = true;
		setModal({ type: 'none' });
		navigate(-2);
	};

	const allowExitRef = useRef(false);
	const isAnalyzing = isFittingLoading || reviewState.status === 'loading';
	const isAnalyzingRef = useRef(false);

	useEffect(() => {
		isAnalyzingRef.current = isAnalyzing;
		if (isAnalyzing) window.history.pushState(null, '', window.location.href);
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

	if (isFittingsLoading || isProductsLoading) {
		return <div className="flex-1 bg-white flex items-center justify-center">정보를 불러오는 중...</div>;
	}

	return (
		<div className="flex items-center justify-center mb-8">
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
					onTabChange={(tab) => setActiveTab(tab as TabType)}
					isIdle={!isAnalyzing}
					onIdleToast={createToast}
				/>

				{normalizedProduct ? (
					<FittingItemInfo
						key={normalizedProduct.product_id}
						data={normalizedProduct}
						handleHeart={handleHeart}
						handleBuy={() => setModal({ type: 'buy' })}
					/>
				) : (
					<div className="h-24 flex items-center justify-center text-gray-400">상품 정보를 찾을 수 없습니다.</div>
				)}

				<div className="flex-1 overflow-y-auto no-scrollbar pb-10">
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
				</div>

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

export default FittingDetailPage;
