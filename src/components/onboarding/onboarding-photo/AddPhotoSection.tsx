
import Button from '@/src/components/common/Button';
import PhotoBtn, { type PhotoBtnType } from './PhotoBtn';
import { cn } from '@/src/utils/cn';
import { usePhotoInput } from '@/src/hooks/domain/onboarding/usePhotoInput';
import { useState } from 'react';
import VerifyingSection from './VerifyingSection';
import { resizeImage } from '@/src/utils/resizeImage';
import usePreventRefresh from '@/src/hooks/domain/products/usePreventRefresh';
import { ENV_CONFIG } from '@/src/constants/config';


interface AddPhotoSectionProps {
  setShowGuide: () => void;
}

const AddPhotoSection = ({ setShowGuide } : AddPhotoSectionProps) => {
	const {
		file,
		previewUrl,
		isCamera,
		videoRef,
		canvasRef,
		fileInputRef,
		setPhoto,
		openCamera,
		openFilePicker,
		handleChangeFile,
		captureFromCamera,
	} = usePhotoInput();
	const [isVerify, setIsVerify] = useState(false)
	

	usePreventRefresh(isVerify);

	const handleClick = (type: PhotoBtnType) => {
		if (type === 'CAMERA') openCamera();
		if (type === 'GALLERY') openFilePicker();
	};

	
	const [resizedFile, setResizedFile] = useState<File | null>(null);

	const handleConfirm = async () => {
		if (!file) return;
		const resizedFile = await resizeImage(file);
		setResizedFile(resizedFile);
		setPhoto(resizedFile, previewUrl ?? '');
		setIsVerify(true);
		if(ENV_CONFIG.isDev){
			console.log('원본 파일 용량(MB):', (file.size / 1024 / 1024).toFixed(2));
			console.log(
				'리사이징 파일 용량(MB):',
				(resizedFile.size / 1024 / 1024).toFixed(2),
			);
		}
	};


	if(isVerify && resizedFile) 
		return(
			 <VerifyingSection
				previewUrl={previewUrl ?? ''}
				resizingPhoto={resizedFile} 
				setIsVerify={setIsVerify}
			 />
		)

	return(
		<>		
			{
				!isCamera && 
				<div className="px-5 p-4 flex justify-center flex-col items-center">
					<div className='flex flex-col gap-4'>
						<div className="border w-85 border-neutral-200  rounded-sm px-8 py-5 flex flex-col items-center">
							<p className='text-neutral-500 text-regular-12 text-end w-full'><button
								onClick={setShowGuide}
								className='hover:underline cursor-pointer'
							                                                                >
								사진 등록 가이드
							</button>
							</p>
							<p className='text-neutral-900 mb-2.5'>한 명만 나온 사진을 등록해 주세요!</p>

							<div className="border-dashed border w-full border-neutral-500 rounded-lg h-84 bg-onboarding-photo flex justify-center items-center text-neutral-600 overflow-hidden">
								{previewUrl && 
								<img
									src={previewUrl} 
									alt='fitting-photo'
									className='w-full h-full border object-cover'
								/>
								}
							</div>
						</div>

						<div className='flex w-full gap-2 justify-center'>
							<PhotoBtn
								btnType='CAMERA'
								handleClick={handleClick}
							/>
							<PhotoBtn
								btnType='GALLERY' 
								handleClick={handleClick}
							/>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								hidden
								onChange={handleChangeFile}
							/>
						</div>
						<Button
							onClick={handleConfirm}
							disabled={!previewUrl}
						>{'확인하기'}</Button>
					</div>
				</div>
			}


			<div
				className={cn('relative',
					isCamera ? 'min-h-screen h-full' : 'invisible h-0',
				)}
			>
				<video
					ref={videoRef}
					autoPlay
					playsInline
					className={cn('w-screen border border-primary-600 object-cover',
						isCamera ? 'min-h-screen h-full' : 'invisible h-0',

					)}
					muted
				/>
				<button
					onClick={captureFromCamera}
					className='absolute bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-full w-15 h-15 flex justify-center items-center cursor-pointer'
				>
					<div
						className='bg-white border-primary-600 border-[1.5px] rounded-full w-13 h-13'
					></div>
				</button>
				<canvas
					ref={canvasRef}
					className="hidden"
				/>
			</div>
		</> ) 
}
export default AddPhotoSection
