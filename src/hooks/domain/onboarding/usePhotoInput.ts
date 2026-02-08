import { useCameraCapture } from './useCameraCapture';
import { useImageFileInput } from './useImageFileInput';

export const usePhotoInput = () => {
	const image = useImageFileInput();
	const camera = useCameraCapture();

	const setPhoto = (file: File | null, previewUrl?: string) => {
		image.setFile(file);
		image.setPreviewUrl(previewUrl ?? null);
	};


	const dataUrlToFile = (
		dataUrl: string,
		fileName = 'camera.jpg',
	): File => {
		const arr = dataUrl.split(',');
		const mime = arr[0].match(/:(.*?);/)?.[1] ?? 'image/jpeg';
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], fileName, { type: mime });
	};

	const captureFromCamera = () => {
		const dataUrl = camera.capturePhoto();
		if (!dataUrl) return;

		 const file = dataUrlToFile(
			dataUrl,
      `camera_${Date.now()}.jpg`,
		);

		setPhoto(file, dataUrl)
	};

	return {
		file: image.file,
		previewUrl: image.previewUrl,

		setPhoto,

		// file input
		fileInputRef: image.fileInputRef,
		openFilePicker: image.openFilePicker,
		handleChangeFile: image.handleChangeFile,
		reset: image.reset,

		// camera
		isCamera: camera.isCamera,
		videoRef: camera.videoRef,
		canvasRef: camera.canvasRef,
		openCamera: camera.openCamera,
		captureFromCamera,
	};
};
