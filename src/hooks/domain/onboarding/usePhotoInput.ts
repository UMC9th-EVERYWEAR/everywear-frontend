import React from 'react';
import { useRef, useState  } from 'react';
import { getWebcamStream } from '@/src/utils/getWebcam';

export const usePhotoInput = () => {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
		
		setFile(file);

		const previewUrl = URL.createObjectURL(file);
		setPreviewUrl(previewUrl);
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

		setPreviewUrl(canvas.toDataURL('image/png'));
		setIsCamera(false);
	};

	return {
		file,
		previewUrl,
		isCamera,
		videoRef,
		canvasRef,
		fileInputRef,
		setFile,
		openCamera,
		openFilePicker,
		handleChangeFile,
		capturePhoto,
	};
};
