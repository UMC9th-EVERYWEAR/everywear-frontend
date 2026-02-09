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

export const getRepresentativeImage = async () => {
	const { data } = await apiClient.getRepresentativeImage();
	return data;
}

export const selectRepresentativeImage = async (imageId: number) => {
	await apiClient.selectRepresentative(imageId);	
};

export const deleteProfileImage = async (imageId: number) => {
	await apiClient.deleteProfileImage(imageId);
};

export const verifyAndSaveProfileImage = async (file: File) => {
	const formData = new FormData();
	formData.append('image', file);
	try{
		const { data } = await apiClient.verifyAndSave(
    formData as unknown as VerifyAndSavePayload,
    {
    	timeout: 50000, // 요청 1분으로 늘림
    },
		);
		return data;
	}
	catch (error) {
		console.error('🔥 ', error);
		throw error; 
	}
};
export const toggleAlarm = async () => {
	await apiClient.toggleAlarm();
};

export const toggleAgree = async () => {
	await apiClient.toggleAgree();
};
