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
			const stream = await getWebcamStream();
			// camera 처리
			videoRef.current.srcObject = stream
			setIsCamera(true);
		}
	
		if (btnType === 'GALLERY') {
			// gallery 열기
		}
	};

	// 화질 안좋음 이슈 함수
	// const drawToCanvas = () => {
	// 	try {
	// 		const ctx = canvasRef.current?.getContext('2d');
	// 		if(!canvasRef.current) return;

	// 		canvasRef.current.width = videoRef?.current.width
	// 		canvasRef.current.height = 100
	// 		if(ctx && ctx !== null) {
	// 			if(videoRef.current){
	// 				ctx.translate(canvasRef.current.width, 0);
	// 				ctx.scale(-1, 1);
	// 				ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
	// 				ctx.setTransform(1,0,0,1,0,0);

	// 			}
	// 		}
	// 	}
	// 	 catch (err){
	// 		console.log(err)
	// 	}
	// }
	
	  const handleCapture = () => {
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
		setIsCamera(false)
	};
 

		
	const hasFile = false
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
							<p className='text-neutral-900 mb-2.5'>한명만 나온 사진을 등록해주세요!</p>

							<div className="border-dashed border w-full border-neutral-500 rounded-lg h-84 bg-onboarding-photo flex justify-center items-center text-neutral-600 overflow-hidden">
								{/* 사진을 추가해주세요! 등 멘트 수정 필요해보임 */}
								{photo && 
								<img
									src={photo} 
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
						</div>
						<Button disabled={!photo}>확인하기</Button>

						{/*btn 디자인 후보들 */}

						{/*btn1 */}
						{/* <div className='absolute bottom-0 -mx-5 bg-white w-full h-30 flex justify-center items-center '>
							<button
								onClick={handleCapture}
								className='bg-primary-600 rounded-full w-15 h-15 flex justify-center items-center'
							>
								<div
									className='bg-primary-600 border-white border-[1.5px] rounded-full w-13 h-13'
								></div>
							</button>
						</div> */}
						{/*btn2 */}
						{/* <button
							onClick={handleCapture}
							className='absolute bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-full w-15 h-15 flex justify-center items-center'
						>
							<div
								className='bg-white border-primary-600 border-[1.5px] rounded-full w-13 h-13'
							></div>
						</button> */}

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
					muted // ios
				/>
				{/*btn2 */}
				<button
					onClick={handleCapture}
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
		
		</>
	)
}
export default AddPhotoSection
