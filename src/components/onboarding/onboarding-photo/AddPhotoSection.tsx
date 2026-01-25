import { getWebcamStream } from '@/src/utils/getWebcam';
import { useRef, useState } from 'react';
import Button from '@/src/components/common/Button';
import PhotoBtn, { type PhotoBtnType } from './PhotoBtn';
import { cn } from '@/src/utils/cn';

interface AddPhotoSectionProps {
  setShowGuide: () => void;
}

// 헤더에 대한 고민 필요

const AddPhotoSection = ({ setShowGuide } : AddPhotoSectionProps) => {
	const [isCamera, setIsCamera] = useState(false)
	const [photo, setPhoto] = useState<string | null>(null);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	
	
	const handleClick = async (btnType: PhotoBtnType) => {
		if (btnType === 'CAMERA') {
			if (!videoRef.current) return;
			console.log('ㅎㅇ')
			const stream = await getWebcamStream();
			// camera 처리
			videoRef.current.srcObject = stream
			setIsCamera(true);
		}
	
		if (btnType === 'GALLERY') {
			// gallery 열기
		}
	};

	const drawToCanvas = () => {
		try {
			const ctx = canvasRef.current?.getContext('2d');
			if(!canvasRef.current) return;

			canvasRef.current.width = videoRef?.current.width
			canvasRef.current.height = 100
			if(ctx && ctx !== null) {
				if(videoRef.current){
					ctx.translate(canvasRef.current.width, 0);
					ctx.scale(-1, 1);
					ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
					ctx.setTransform(1,0,0,1,0,0);

				}
			}
		}
		 catch (err){
			console.log(err)
		}
	}
	
	  const handleCapture = () => {
		console.log('찍는다')
		if (!videoRef.current || !canvasRef.current) {
			return;
		}
		
		const $canvas = canvasRef.current;
		const $video = videoRef.current;
 
		const context = $canvas.getContext('2d');
		if (!context) {
			return;
		}
 
		$canvas.width = $video.videoWidth;
		$canvas.height = $video.videoHeight;
 
		context.drawImage($video, 0, 0, $canvas.width, $canvas.height);
		const imageToDataUrl = $canvas.toDataURL('image/png');
		setPhoto(imageToDataUrl);
	};
 

		
	const hasFile = false
	return(
		<>
			{
				!isCamera && 
				<div className="px-5 pt-4 flex justify-center flex-col items-center">
					<div className='flex flex-col gap-4'>
						<div className="border w-85 border-neutral-200  rounded-sm px-8 py-5 flex flex-col items-center mb-5.5">
							<p className='text-neutral-500 text-regular-12 text-end w-full mb-3'><button
								onClick={setShowGuide}
								className='hover:underline cursor-pointer'
							                                                                     >
								사진 등록 가이드
							</button>
							</p>
							<p className='text-neutral-900 mb-2.5'>한명만 나온 사진을 등록해주세요!</p>

							<div className="border-dashed border w-full border-neutral-500 rounded-lg h-84 bg-onboarding-photo flex justify-center items-center text-neutral-600">
								{/* 사진을 추가해주세요! 등 멘트 수정 필요해보임 */}
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
						</div>
						<Button disabled={!hasFile}>확인하기</Button>
						<button
							onClick={handleCapture}
							className='  bg-neutral-500 rounded-full w-6 h-6'
						></button>
	

					</div>
				</div>
			}


			<div
				className={cn('min-h-screen relative',
					isCamera ? '' : 'invisible',
				)}
			>
				{ }
				<video
					ref={videoRef}
					autoPlay
					playsInline
					  className=" w-screen min-h-screen border	border-primary-600 h-full object-cover"
					muted // ios
				/>
				<button
					onClick={handleCapture}
					className='absolute top-10 bg-neutral-500'
				>버튼입니당</button>
	
				      <canvas
					ref={canvasRef}
				      />

				   {photo && (
					<div>
						<h1>캡쳐된 이미지</h1>
						<img
							src={photo}
							alt='Captured'
						/>
					</div>
				)}
			</div>
		
		</>
	)
}
export default AddPhotoSection
