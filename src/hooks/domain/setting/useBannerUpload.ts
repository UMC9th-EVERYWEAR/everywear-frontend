import React from 'react';
import { useRef } from 'react';
import { resizeImage } from '@/src/utils/resizeImage';
import type { PendingUpload } from '@/src/pages/setting/setting-photo-page';
import { useVerifyAndSaveProfileImage } from '@/src/hooks/service/user/useVerifyAndSaveProfileImage';

interface UseBannerUploadParams {
  setPendingUploads: React.Dispatch<React.SetStateAction<PendingUpload[]>>;
  handleUploadStartNotice: () => void;
  handleError: () => void;
}

export const useBannerUpload = ({
	setPendingUploads,
	handleUploadStartNotice,
	handleError,
}: UseBannerUploadParams) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const pendingIndexRef = useRef<number | null>(null);

	const { mutateAsync: uploadPhoto } = useVerifyAndSaveProfileImage();

	const openFilePicker = (index: number) => {
		pendingIndexRef.current = index;
		fileInputRef.current?.click();
	};

	const handleChangeFile = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		const index = pendingIndexRef.current;

		if (!file || index === null) return;

		handleUploadStartNotice();

		// 낙관적 UI
		const previewUrl = URL.createObjectURL(file);
		const tempId = -Date.now();

		setPendingUploads((prev) => [
			...prev,
			{ tempId, previewUrl },
		]);

		try {
			const resizedFile = await resizeImage(file);

			await uploadPhoto(resizedFile, {
				onError: handleError,
				onSettled: () => setPendingUploads([]),
			});
		} finally {
			// input 초기화
			e.target.value = '';
			pendingIndexRef.current = null;
		}
	};

	return {
		fileInputRef,
		openFilePicker,
		handleChangeFile,
	};
};
