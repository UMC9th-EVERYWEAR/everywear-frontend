import { apiClient } from '@/src/apis/common/apiClient';
import type { FittingRequest } from '../generated';
import { fittingTimeSet } from '@/src/constants/timeSet';

export const requestFitting = async (payload: FittingRequest) => {
	// 타임아웃 방지용으로 시간 5분으로 설정
	const { data } = await apiClient.requestFitting(payload, { timeout: fittingTimeSet });
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


