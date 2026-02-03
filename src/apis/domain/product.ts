import { apiClient } from '@/src/apis/common/apiClient'
import type { ImportDTO } from '../generated';

export const getProducts = async () => {
	const { data } = await apiClient.getProducts();
	return data.result?.products ?? [];
};

export const getTopProducts = async () => {
	const { data } = await apiClient.getTopProducts();
	return data.result?.products ?? [];
};

export const importProduct = async (payload: ImportDTO) => {
    // 넉넉하게 30초(30000)를 줍니다.
    const { data } = await apiClient.importProduct(payload, { 
        timeout: 30000
    });
    console.log("서버 응답 데이터:", data); // 응답이 오는지 직접 확인용
    return data.result;
};

export const toggleProductLike = async (productId: number) => {
	const { data } = await apiClient.toggleProductLike(productId);
	return data.result;
};
