import React from 'react';
import { useRef, useState  } from 'react';
import { getWebcamStream } from '@/src/utils/getWebcam';

export const usePhotoInput = () => {
	const [photo, setPhoto] = useState<string | null>(null);
	const [isCamera, setIsCamera] = useState(false);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	/* ---------- gallery ---------- */
	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const previewUrl = URL.createObjectURL(file);
		setPhoto(previewUrl);
		e.target.value = '';
	};

	/* ---------- camera ---------- */
	const openCamera = async () => {
		if (!videoRef.current) return;

		const stream = await getWebcamStream();
		videoRef.current.srcObject = stream;
		setIsCamera(true);
	};

	const capturePhoto = () => {
		if (!videoRef.current || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const video = videoRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx.drawImage(video, 0, 0);

		setPhoto(canvas.toDataURL('image/png'));
		setIsCamera(false);
	};

	return {
		photo,
		isCamera,
		videoRef,
		canvasRef,
		fileInputRef,
		openCamera,
		openFilePicker,
		handleChangeFile,
		capturePhoto,
	};
};
