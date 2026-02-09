import { useQuery } from '@tanstack/react-query';
// 1. 정인님이 주신 함수들을 임포트합니다.
import { getMyFittings, getFittingDetail } from '@/src/apis/domain/fitting';

// 2. 기존의 const api = new Api(); 는 이제 필요 없으니 삭제하세요!

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
			/** * 💡 3. 수정 포인트: 
             * getMyFittings()는 이미 data.result ?? [] 를 반환합니다.
             * 따라서 response.data.result라고 쓸 필요가 없어요!
             */
			const data = await getMyFittings();
			return data as unknown as FittingDetailDTO[];
		},
	});
};

export const useFittingDetail = (id: number) => {
	return useQuery<FittingDetailDTO>({
		queryKey: ['fittingDetail', id],
		queryFn: async () => {
			/**
             * 💡 4. 상세 페이지 요청도 마찬가지로
             * 결과값(data.result)이 바로 넘어옵니다.
             */
			const data = await getFittingDetail(id);
			return data as unknown as FittingDetailDTO;
		},
		enabled: !!id,
	});
};
