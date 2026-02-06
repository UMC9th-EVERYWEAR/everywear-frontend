import { apiClient } from '@/src/apis/common/apiClient'
import type { ImportDTO } from '../generated';

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

// ai-fitting-page
export const toggleProductLike = async (productId: number) => {
	const { data } = await apiClient.toggleProductLike(productId);
	return data.result;
};
