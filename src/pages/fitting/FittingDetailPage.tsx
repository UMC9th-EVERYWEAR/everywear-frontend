import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import useToast from '@/src/hooks/domain/ai-fitting/useToast';
import type { ModalState } from '@/src/types/ai-fitting/modal';
import { useProducts } from '@/src/hooks/service/product/useProducts';
import useLike from '@/src/hooks/service/fitting/useLike';
import {
	useFittingDetail,
	useFittings,
	type FittingDetailDTO,
} from '@/src/hooks/service/fitting/useFittings';
import useGetReview from '@/src/hooks/service/review/useGetReview';
import useGetReviewAi from '@/src/hooks/service/review/useGetReviewAi';
import type { ListDTO } from '@/src/apis/generated';
import type { ReviewState } from '@/src/types/ai-fitting/status';
import { AiFittingLayout, type TabType } from '@/src/components/ai-fitting/AiFittingLayout';
import type { ReviewDTO } from '@/src/apis/generated/data-contracts';

type ExtendedFittingDTO = FittingDetailDTO & {
  afterImageUrl?: string;
  fittingResultImageUrl?: string;
  fittingResultImage?: string;
  fitting_result_image?: string;
  resultUrl?: string;
  reviewSummary?: string;
}

const FittingDetailPage = () => {
	const { id } = useParams();
	const fittingId = Number(id);

	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [modal, setModal] = useState<ModalState>({ type: 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const { data: fittingDetail } = useFittingDetail(fittingId);
	const { data: fittingsList } = useFittings();
	const { data: products } = useProducts();
	const { mutate: mutateLike } = useLike({ createToast });

	const sourceData = useMemo<ExtendedFittingDTO | null>(() => {
		if (fittingDetail) {
			const detail = fittingDetail as ExtendedFittingDTO;
			if (detail.afterImageUrl || detail.fittingResultImageUrl) {
				return detail;
			}
		}

		if (fittingsList && fittingsList.length > 0) {
			const found = fittingsList.find(
				(item) => {
					const castedItem = item as unknown as { fittingId: number };
					return (item.fittingId || castedItem.fittingId) === fittingId;
				},
			);
			if (found) return found as ExtendedFittingDTO;
		}

		return (fittingDetail as ExtendedFittingDTO) || null;
	}, [fittingDetail, fittingsList, fittingId]);

	const resultImageUrl = useMemo(() => {
		if (!sourceData) return '';
    
		return (
			sourceData.afterImageUrl || 
      sourceData.fittingResultImageUrl || 
      sourceData.fittingResultImage || 
      sourceData.fitting_result_image || 
      sourceData.resultUrl || 
      sourceData.product?.productImage || 
      ''
		);
	}, [sourceData]);

	const productId = useMemo(() => sourceData?.product?.productId || 0, [sourceData]);
	const { data: reviewsData, isLoading: isReviewLoading } = useGetReview(productId, !!productId);
	const { data: aiReviewData, isLoading: isAiLoading } = useGetReviewAi(productId, !!productId);

	const normalizedProduct = useMemo<ListDTO | null>(() => {
		if (!sourceData || !products) return null;
		const pid = sourceData.product.productId;
		const productData = products.find((p) => Number(p.product_id) === Number(pid));
		const dtoProduct = sourceData.product;

		return {
			product_id: pid,
			product_name: productData?.product_name || dtoProduct.productName,
			shoppingmale_name: productData?.shoppingmale_name || dtoProduct.siteName || '브랜드',
			price: productData?.price || dtoProduct.price,
			product_img_url: productData?.product_img_url || dtoProduct.productImage || '',
			product_url: productData?.product_url || dtoProduct.purchaseUrl,
			star_point: productData?.star_point || dtoProduct.rating || 0,
			is_liked: productData?.is_liked || dtoProduct.isLiked,
		} as ListDTO;
	}, [sourceData, products]);

	return (
		<AiFittingLayout
			activeTab={activeTab}
			isFittingHistory={true}
			setActiveTab={setActiveTab}
			isIdle={false}
			product={normalizedProduct}
			profileImg=""
			fittingState={{ status: 'success', resultUrl: resultImageUrl }}
			showBefore={false}
			showRestartButton={false}
			canRetry={false} 
			reviewState={{
				status: isReviewLoading ? 'loading' : 'success',
				summary: {
					status: isAiLoading ? 'loading' : 'success',
					text: aiReviewData?.summary || sourceData?.reviewSummary || '요약 정보가 없습니다.',
				},
				keywords: (aiReviewData?.keywords || []).map((k: string, i: number) => ({
					id: i,
					label: k,
				})),
				reviews: (reviewsData?.result?.reviews || []).map((review: ReviewDTO) => {
					const castedReview = review as unknown as { id: number };
					return {
						...review,
						review_id: review.review_id || castedReview.id,
						images: (review.images || []).map((img: string | { imgUrl: string }) => 
							typeof img === 'string' ? img : img.imgUrl,
						),
					};
				}),
			} as ReviewState}
			toasts={toasts}
			deleteToast={deleteToast}
			isBuyModalOpen={modal.type === 'buy'}
			closeBuyModal={() => setModal({ type: 'none' })}
			onHeart={(status) => {
				if (normalizedProduct?.product_id) {
					mutateLike({ productId: Number(normalizedProduct.product_id), isLiked: status });
				}
			}}
			onGoToShop={() => setModal({ type: 'buy' })}
			onConfirmBuy={() => normalizedProduct?.product_url && window.open(normalizedProduct.product_url, '_blank')}
			onStartFitting={() => {}}
			onStartReview={() => createToast({ message: '최신 리뷰 데이터를 불러왔습니다.' })}
		/>
	);
};

export default FittingDetailPage;
