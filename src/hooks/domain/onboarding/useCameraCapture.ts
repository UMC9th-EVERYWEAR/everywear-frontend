import { useRef, useState } from 'react';
import { getWebcamStream } from '@/src/utils/getWebcam';

export const useCameraCapture = () => {
	const [isCamera, setIsCamera] = useState(false);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const openCamera = async () => {
		if (!videoRef.current) return;

		const stream = await getWebcamStream();
		videoRef.current.srcObject = stream;
		setIsCamera(true);
	};

	const capturePhoto = (): string | null => {
		if (!videoRef.current || !canvasRef.current) return null;

		const canvas = canvasRef.current;
		const video = videoRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return null;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx.drawImage(video, 0, 0);

		setIsCamera(false);
		return canvas.toDataURL('image/png');
	};

	return {
		isCamera,
		videoRef,
		canvasRef,
		openCamera,
		capturePhoto,
	};
};
