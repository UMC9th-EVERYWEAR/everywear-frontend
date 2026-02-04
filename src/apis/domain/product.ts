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
    const { data } = await apiClient.importProduct(payload, { 
        timeout: 30000 //30초로 설정 진행

    });
    return data.result;
};

export const toggleProductLike = async (productId: number) => {
	const { data } = await apiClient.toggleProductLike(productId);
	return data.result;
};
