import { useQuery } from '@tanstack/react-query';
import { getMyFittings, getFittingDetail } from '@/src/apis/domain/fitting';

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
    beforeImageUrl: string; 
    afterImageUrl: string;  
    createdAt: string;
    reviewSummary?: string;
    product: {
        productId: number;
        siteName: string;
        productName: string;
        price: string;
        rating: number;
        purchaseUrl: string;
        isLiked: boolean;
        keywords?: string[];
        productImage?: string; 
    };
    reviews?: ReviewItem[];
}

export const useFittings = () => {
	return useQuery<FittingDetailDTO[]>({
		queryKey: ['fittings'],
		queryFn: async () => {
			const data = await getMyFittings();
			return data as unknown as FittingDetailDTO[];
		},
	});
};

export const useFittingDetail = (id: number) => {
	return useQuery<FittingDetailDTO>({
		queryKey: ['fittingDetail', id],
		queryFn: async () => {
			const data = await getFittingDetail(id);
			return data as unknown as FittingDetailDTO;
		},
		enabled: !!id,
	});
};
