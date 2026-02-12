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
		maxSizeMB: options?.maxSizeMB ?? 1.5,
		maxWidthOrHeight: options?.maxWidthOrHeight ?? 2048,
		initialQuality: options?.initialQuality ?? 0.95,
		alwaysKeepResolution: true,
		useWebWorker: true,
	});

	return new File([blob], file.name, { type: blob.type });
};
