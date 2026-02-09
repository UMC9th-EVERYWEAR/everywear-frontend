import { apiClient } from '@/src/apis/common/apiClient'
import type { ImportDTO, ListDTO } from '../generated';
import type { CategoryKey } from '@/src/types/products/product';

// products-page
export const getProducts = async () => {
	const { data } = await apiClient.getProducts();
	return data.result?.products ?? [];
};

export const getTopProducts = async () => {
	const { data } = await apiClient.getTopProducts();
	return data.result?.products ?? [];
};

export const getOuterProducts = async () => {
	const { data } = await apiClient.getOuterProducts();
	return data.result?.products ?? [];
};

export const getEtcProducts = async () => {
	const { data } = await apiClient.getEtcProducts();
	return data.result?.products ?? [];
};

export const getDressProducts = async () => {
	const { data } = await apiClient.getDressProducts();
	return data.result?.products ?? [];
};

export const getBottomProducts = async () => {
	const { data } = await apiClient.getBottomProducts();
	return data.result?.products ?? [];
};

export const importProduct = async (payload: ImportDTO) => {
	const { data } = await apiClient.importProduct(payload, { 
		timeout: 50000, //50초로 설정 진행

	});
	return data.result;
};

export const productFetchers: Partial<Record<CategoryKey, () => Promise<ListDTO[]>>> = {
	'상의': getTopProducts,
	'아우터': getOuterProducts,
	'기타': getEtcProducts,
	'원피스': getDressProducts,
	'하의': getBottomProducts,
};

export const getProductsByCategory = async (category: CategoryKey) => {
	const fetcher = productFetchers[category] ?? getProducts;
	return fetcher();
};

export const getProductDetail = async (productId : number) => {
	const { data } = await apiClient.getProductDetail(productId);
	return data.result?.product ?? [];
}

// home-page
export const getHomeProducts = async () => {
	const { data } = await apiClient.getHomeProducts();
	return data.result?.products ?? [];
};


// closet-page
export const getClosetProducts = async () => {
	const { data } = await apiClient.getClosetProducts();
	return data.result?.products ?? [];
};

export const getClosetTopProducts = async () => {
	const { data } = await apiClient.getClosetTopProducts();
	return data.result?.products ?? [];
};

export const getClosetOuterProducts = async () => {
	const { data } = await apiClient.getClosetOuterProducts();
	return data.result?.products ?? [];
};

export const getClosetEtcProducts = async () => {
	const { data } = await apiClient.getClosetEtcProducts();
	return data.result?.products ?? [];
};

export const getClosetDressProducts = async () => {
	const { data } = await apiClient.getClosetDressProducts();
	return data.result?.products ?? [];
};

export const getClosetBottomProducts = async () => {
	const { data } = await apiClient.getClosetBottomProducts();
	return data.result?.products ?? [];
};

export const closetFetchers: Partial<Record<CategoryKey, () => Promise<ListDTO[]>>> = {
	'상의': getClosetTopProducts,
	'아우터': getClosetOuterProducts,
	'기타': getClosetEtcProducts,
	'원피스': getClosetDressProducts,
	'하의': getClosetBottomProducts,
};

export const getClosetByCategory = async (category: CategoryKey) => {
	const fetcher = closetFetchers[category] ?? getClosetProducts;
	return fetcher();
};

// ai-fitting-page
export const toggleProductLike = async (productId: number) => {
	const { data } = await apiClient.toggleProductLike(productId);
	return data.result;
};
