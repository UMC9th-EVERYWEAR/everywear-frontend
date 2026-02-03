import { apiClient } from '@/src/apis/common/apiClient';
import type { VerifyAndSavePayload } from '../generated';

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

export const verifyAndSaveProfileImage = async (file: File) => {
	const formData = new FormData();
	formData.append('image', file);

	const { data } = await apiClient.verifyAndSave(
    formData as unknown as VerifyAndSavePayload,
    {
    	timeout: 30000, // 요청 30초로 늘림
    },
	);
	return data.result;
};
