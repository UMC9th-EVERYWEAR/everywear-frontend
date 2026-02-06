import { useCameraCapture } from './useCameraCapture';
import { useImageFileInput } from './useImageFileInput';

export const usePhotoInput = () => {
	const image = useImageFileInput();
	const camera = useCameraCapture();

	const captureFromCamera = () => {
		const dataUrl = camera.capturePhoto();
		if (!dataUrl) return;

		image.setPreviewUrl(dataUrl);
		image.setFile(null); // 카메라는 File 없음
	};

	return {
		...image,
		...camera,
		captureFromCamera,
	};
};
