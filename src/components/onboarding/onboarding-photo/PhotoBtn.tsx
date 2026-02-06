import  { ONBOARDING_IMAGES } from '@/src/constants/images';


export type PhotoBtnType =
  | 'CAMERA'
  | 'GALLERY';


const PHOTO_BTN_CONFIG: Record<
  PhotoBtnType,
{
  title: string,
  icon: string
}
> = {
	CAMERA: {
		title: '사진 촬영',
		icon: ONBOARDING_IMAGES.CAMERA_BLUE, 
	},
	GALLERY: {
		title: '갤러리에서 선택',
		icon: ONBOARDING_IMAGES.GALLERY,
	},
};

interface PhotoBtnProps {
  btnType: PhotoBtnType;
	handleClick: (type : PhotoBtnType ) => void
}


const PhotoBtn = ({ btnType, handleClick }: PhotoBtnProps) => {
	const { title, icon } = PHOTO_BTN_CONFIG[btnType];

	return (
		<div className="max-w-42 w-full">
			<button
				onClick={() => handleClick(btnType)}
				className="w-full border border-primary-600 rounded-lg py-4 flex gap-2.5 justify-center cursor-pointer hover:border-2 hover:-mb-1"
			> 
				{ }
				{/* <video
					ref={videoRef}
					autoPlay
					playsInline
					className="w-full"
				/> */}

				<img
					src={icon}
					alt='btn-img'
					className='w-5'
				/>                                                                       
				<span className='text-regular-16'>{title}</span>
			</button>
		</div>
	)
}
export default PhotoBtn
