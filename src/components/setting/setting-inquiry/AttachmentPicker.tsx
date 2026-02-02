import { cn } from '@/src/utils/cn';
import React, { useEffect, useMemo } from 'react';
import cameraIcon from '@/public/svgs/setting/camera-icon.svg';
import closeIcon from '@/public/svgs/setting/blue-close-icon.svg';


type AttachmentPickerProps = {
  max?: number;
  files: File[];
  onChangeFiles: (next: File[]) => void;
};

const AttachmentPicker = ({ max = 5, files, onChangeFiles }: AttachmentPickerProps) => {
	  const inputId = 'attachment-picker-input';

	const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const picked = Array.from(e.target.files ?? []);
		if (!picked.length) return;

		const remain = max - files.length;
		const next = [...files, ...picked.slice(0, remain)];

		onChangeFiles(next);
		e.target.value = ''; // 같은 파일 재선택 가능하도록
	};

	const removeFile = (index: number) => {
		onChangeFiles(files.filter((_, i) => i !== index));
	};


	//  미리보기 URL 생성
	const previewUrls = useMemo(() => {
		return files.map((file) => ({
			file,
			url: URL.createObjectURL(file),
		}));
	}, [files]);

	//  메모리 누수 방지
	useEffect(() => {
		return () => {
			previewUrls.forEach(({ url }) => URL.revokeObjectURL(url));
		};
	}, [previewUrls]);
	const isDisabled = files.length >= max;

	
	return (
		<div className="flex flex-col gap-2">
			<input
				id={inputId}
				type="file"
				accept="image/*"
				multiple
				onChange={handlePick}
				disabled={isDisabled}
				className="hidden"
			/>

			{/* 
			<p className="text-regular-12 text-neutral-500">
				{files.length}/{max} 첨부됨
			</p> */}

			<div className="flex gap-2 flex-wrap">
			
				{/* 미리보기들 */}
				{previewUrls.map(({ file, url }, idx) => (
					<div
						key={`${file.name}-${idx}`}
						className="relative w-18.5 h-20rounded-2xl border border-neutral-400 rounded-lg"
					>
						<img
							src={url}
							alt="preview"
							className="w-full h-full object-cover rounded-lg"
						/>

						<button
							type="button"
							onClick={() => removeFile(idx)}
							className={cn(
								'absolute -top-2 w-3.5 h-3.5 -right-1 rounded-full shadow-16' ,
								'bg-white border border-primary-600',
								'flex items-center justify-center',
							)}
						>
							<img
								src={closeIcon}
								alt="close"
								className="h-1.5"
							/>
						</button>
					</div>
				))}
				{/* 사진 첨부 버튼 */}
				<label
					htmlFor={inputId}
					className={cn(
						'w-18.5 h-20 rounded-lg border border-neutral-400',
						'flex items-center justify-center cursor-pointer',
						isDisabled && 'opacity-40 cursor-not-allowed',
					)}
				>

					<img
						src={cameraIcon}
						alt="camera"
						className="w-6.5 h-6"
					/>
				</label>
			</div>
		</div>
	);
};

export default AttachmentPicker;
