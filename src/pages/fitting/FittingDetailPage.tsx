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
import type { ListDTO } from '@/src/apis/generated';
import type { FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import { AiFittingLayout, type TabType } from '@/src/components/ai-fitting/AiFittingLayout';
import useToast from '@/src/hooks/domain/ai-fitting/useToast';

const FittingDetailPage = () => {
	const { id } = useParams();
	const fittingId = Number(id);

	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [modal, setModal] = useState<ModalState>({ type: 'none' });
	const { toasts, createToast, deleteToast } = useToast();

	const { data: fittingDetail } = useFittingDetail(fittingId);
	const { data: fittingsList } = useFittings();
	const { data: products } = useProducts();

	const targetFromList = useMemo<FittingDetailDTO | null>(() => {
		if (!fittingsList) return null;

		return (
			(fittingsList.find(
				(item) => (item.fittingId || (item as unknown as { id: number }).id) === fittingId,
			) as FittingDetailDTO) || null
		);
	}, [fittingsList, fittingId]);

	const sourceData = useMemo<FittingDetailDTO | null>(() => {

		if (fittingDetail?.afterImageUrl) {
			return fittingDetail;
		}
		return targetFromList || fittingDetail || null;
	}, [fittingDetail, targetFromList]);

	const normalizedProduct = useMemo<ListDTO | null>(() => {
		if (!sourceData || !products || !sourceData.product) return null;

		const productId = sourceData.product.productId;
		const productData = products.find(
			(p) => Number(p.product_id) === Number(productId),
		);
		const dtoProduct = sourceData.product;

		return {
      
			product_id: productId,
			product_name: productData?.product_name || dtoProduct.productName,
			shoppingmale_name: productData?.shoppingmale_name || dtoProduct.siteName || '브랜드',
			price: productData?.price || dtoProduct.price,
			product_img_url: productData?.product_img_url || (dtoProduct as unknown as { productImage: string }).productImage || '',
			product_url: productData?.product_url || dtoProduct.purchaseUrl,
			star_point: productData?.star_point || dtoProduct.rating || 0,
			is_liked: productData?.is_liked || dtoProduct.isLiked,
		} as ListDTO;
	}, [sourceData, products]);

	const currentFittingState = useMemo((): FittingState => {
		const url = sourceData?.afterImageUrl || '';

		return {
			status: 'success',
			resultUrl: url,
		};
	}, [sourceData]);

	const { mutate: mutateLike } = useLike({ createToast });

	const handleHeart = (status: boolean) => {
		if (normalizedProduct?.product_id) {
			mutateLike({ productId: Number(normalizedProduct.product_id), isLiked: status });
		}
	};

	const handleGoToShop = () => {
		const url = normalizedProduct?.product_url;
		if (url) window.open(url, '_blank', 'noopener,noreferrer');
		setModal({ type: 'none' });
	};

	return (
		<AiFittingLayout
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			isIdle={false}
			product={normalizedProduct}
			profileImg=""
			fittingState={currentFittingState}
			showRestartButton={false}
			showBefore={false}
			reviewState={{
				status: 'success',
				summary: {
					status: 'success',
					text: sourceData?.reviewSummary || '요약 정보가 없습니다.',
				},
				keywords: (sourceData?.product?.keywords || []).map((k, i) => ({
					id: i,
					label: k,
				})),
				reviews: (sourceData?.reviews || []).map((review) => ({
					...review,
					images: (review.images || []).map((img) => img.imgUrl),
				})),
			} as ReviewState}
			toasts={toasts}
			deleteToast={deleteToast}
			isBuyModalOpen={modal.type === 'buy'}
			closeBuyModal={() => setModal({ type: 'none' })}
			onHeart={handleHeart}
			onGoToShop={() => setModal({ type: 'buy' })}
			onConfirmBuy={handleGoToShop}
			onStartFitting={() => {}}
			onStartReview={() => {}}
		/>
	);
};

export default FittingDetailPage;
