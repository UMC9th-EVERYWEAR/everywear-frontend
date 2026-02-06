import { apiClient } from '@/src/apis/common/apiClient';
import type { FittingRequest } from '../generated';

export const requestFitting = async (payload: FittingRequest) => {
	const { data } = await apiClient.requestFitting(payload);
	return data.result;
};

export const getMyFittings = async () => {
	const { data } = await apiClient.getMyFittings();
	return data.result ?? [];
};

export const getFittingDetail = async (fittingId: number) => {
	const { data } = await apiClient.getFittingDetail(fittingId);
	return data.result;
};

export const getHomeRecentFittings = async () => {
	const { data } = await apiClient.getRecentFittings();
	return data.result ?? [];
};


