
import Button from '@/src/components/common/Button';
import PhotoBtn, { type PhotoBtnType } from './PhotoBtn';
import { cn } from '@/src/utils/cn';
import { usePhotoInput } from '@/src/hooks/domain/onboarding/usePhotoInput';
import { useVerifyAndSaveProfileImage } from '@/src/hooks/service/user/useVerifyAndSaveProfileImage';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import VerifyingSection from './VerifyingSection';


interface AddPhotoSectionProps {
  setShowGuide: () => void;
}

// 헤더에 대한 고민 필요

const AddPhotoSection = ({ setShowGuide } : AddPhotoSectionProps) => {
	const {
		file,
		previewUrl,
		isCamera,
		videoRef,
		canvasRef,
		fileInputRef,
		openCamera,
		openFilePicker,
		handleChangeFile,
		capturePhoto,
	} = usePhotoInput();
	const [isVerify, setIsVerify] = useState(true)

	const handleClick = (type: PhotoBtnType) => {
		if (type === 'CAMERA') openCamera();
		if (type === 'GALLERY') openFilePicker();
	};

	const { mutate: verifyAndSave, isPending } =
  useVerifyAndSaveProfileImage();

	const handleConfirm = async () => {
		if (!file) return;
		setIsVerify(true);
		console.log('원본 파일 용량(MB):', (file.size / 1024 / 1024).toFixed(2));
		const resizingBlob = await imageCompression(file, { maxSizeMB: 0.5 });
		const resizingFile = new File([resizingBlob], file.name, { type: file.type });
		verifyAndSave(resizingFile);
		console.log(
			'리사이징 파일 용량(MB):',
			(resizingFile.size / 1024 / 1024).toFixed(2),
		);
	};


	return(
		<>
			{
				!isVerify &&
		(<>
					
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
							<p className='text-neutral-900 mb-2.5'>한명만 나온 사진을 등록해주세요!</p>

							<div className="border-dashed border w-full border-neutral-500 rounded-lg h-84 bg-onboarding-photo flex justify-center items-center text-neutral-600 overflow-hidden">
								{/* 사진을 추가해주세요! 등 멘트 수정 필요해보임 */}
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
							disabled={!previewUrl || isPending}
						>{isPending ? '로딩 중' : '확인하기'}</Button>
					</div>
				</div>
			}


			<div
				className={cn('relative',
					isCamera ? 'min-h-screen h-full' : 'invisible h-0',
				)}
			>
				{ }
				<video
					ref={videoRef}
					autoPlay
					playsInline
					className={cn('w-screen border border-primary-600 object-cover',
						isCamera ? 'min-h-screen h-full' : 'invisible h-0',

					)}
					muted
				/>
				{/*btn2 */}
				<button
					onClick={capturePhoto}
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
			{
				isVerify && <VerifyingSection previewUrl={previewUrl} />
			}
		</>
	)
}
export default AddPhotoSection
