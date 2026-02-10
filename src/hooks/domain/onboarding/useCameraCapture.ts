import { useEffect, useRef, useState } from 'react';
import 'webrtc-adapter';
import { getWebcamStream } from '@/src/utils/getWebcam';

export const useCameraCapture = () => {
	const [isCamera, setIsCamera] = useState(false);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	const stopCamera = () => {
		streamRef.current?.getTracks().forEach((t)=> t.stop())
		streamRef.current = null;

		if(videoRef.current) {
			videoRef.current.srcObject = null;
		}
	}

	const openCamera = async () => {
		if (!videoRef.current) return;
		try { 
			if(streamRef.current) return;

			const stream = await getWebcamStream();
			streamRef.current = stream;
			videoRef.current.srcObject = stream;
			setIsCamera(true);
		} catch (e){
			console.error('Camera access failed', e);
			stopCamera();
			setIsCamera(false);
		};
	}

	const closeCamera = () => {
		stopCamera();
		setIsCamera(false)
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

		// 카메라 종룐
		const dataUrl =canvas.toDataURL('image/jpeg');
		closeCamera();

		return dataUrl
	};

	useEffect(() => {
		return () => {
			stopCamera();
		};
	}, []);

	return {
		isCamera,
		videoRef,
		canvasRef,
		openCamera,
		capturePhoto,
	};
};

