import { useRef, useState } from 'react';
import React from 'react';


export const useImageFileInput = () => {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));

		// 동일 파일 재선택 가능하게
		e.target.value = '';
	};

	const reset = () => {
		setFile(null);
		setPreviewUrl(null);
	};

	return {
		file,
		previewUrl,
		fileInputRef,
		openFilePicker,
		handleChangeFile,
		reset,
		setFile,
		setPreviewUrl,
	};
};
