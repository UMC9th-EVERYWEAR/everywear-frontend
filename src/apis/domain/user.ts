import { apiClient } from '@/src/apis/common/apiClient';

export const getMyInfo = async () => {
	const { data } = await apiClient.getMyInfo();
	return data.result;
};

export const getProfileImages = async () => {
	const { data } = await apiClient.getProfileImages();
	return data;
};

export const selectRepresentativeImage = async (imageId: number) => {
	await apiClient.selectRepresentative(imageId);
};

export const deleteProfileImage = async (imageId: number) => {
	await apiClient.deleteProfileImage(imageId);
};

export const toggleAlarm = async () => {
	await apiClient.toggleAlarm();
};

export const toggleAgree = async () => {
	await apiClient.toggleAlarm();
};

