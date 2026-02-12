import imageCompression from 'browser-image-compression';

interface ResizeImageOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  initialQuality?: number;
}

export const resizeImage = async (
	file: File,
	options?: ResizeImageOptions,
): Promise<File> => {
	const blob = await imageCompression(file, {
		maxSizeMB: options?.maxSizeMB ?? 0.8,
		maxWidthOrHeight: options?.maxWidthOrHeight ?? 1024,
		initialQuality: options?.initialQuality ?? 0.95,
		useWebWorker: true,
	});

	return new File([blob], file.name, { type: blob.type });
};
