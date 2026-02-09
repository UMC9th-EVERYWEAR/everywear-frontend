import { useQuery } from '@tanstack/react-query';
import { Api } from '@/src/apis/generated/Api';

const api = new Api();

// 💡 1. 재범님이 보여주신 ReviewItem 타입 정의 (any 대체용)
export interface ReviewItem {
    id: number;
    rating: number;
    date: string;
    productName: string;
    productSize: string;
    gender: '남성' | '여성';
    buyerHeight: number;
    buyerWeight: number;
    content: string;
    images: { id: number; imgUrl: string }[];
}

export interface FittingDetailDTO {
    fittingId: number;
    fittingResultImage: string;
    createdAt: string;
    reviewSummary?: string;
    product: {
        productId: number;
        productName: string;
        siteName: string;
        price: number;
        productImage: string;
        purchaseUrl: string;
        rating: number;
        isLiked: boolean;
        keywords?: string[];
    };

    reviews?: ReviewItem[];
}

export const useFittings = () => {
	return useQuery<FittingDetailDTO[]>({
		queryKey: ['fittings'],
		queryFn: async () => {
			const response = await api.getMyFittings();
			return (response.data.result as unknown as FittingDetailDTO[]) || []; 
		},
	});
};

export const useFittingDetail = (id: number) => {
	return useQuery<FittingDetailDTO>({
		queryKey: ['fittingDetail', id],
		queryFn: async () => {
			const response = await api.getFittingDetail(id);
			return response.data.result as unknown as FittingDetailDTO;
		},
		enabled: !!id,
	});
};
