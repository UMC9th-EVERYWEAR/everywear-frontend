import { apiClient } from '@/src/apis/common/apiClient';
import type { CrawlReviewDTO } from '../generated';

export const crawlReview = async (payload: CrawlReviewDTO) => {
	const { data } = await apiClient.crawlReview(payload);
	return data;
};

export const getReviews = async (productId: number) => {
	const { data } = await apiClient.getReviews(productId);
	return data;
};

export const getAiReview = async (productId: number) => {
	const { data } = await apiClient.getAiReview(productId);
	return data.result;
};

export const generateAiReview = async (productId: number) => {
	const { data } = await apiClient.generateAiReview(productId);
	return data.result ?? [];
};
