import { Icons } from '@/src/assets/icons/components/Icons';
import React from 'react';

export type PhotoBtnType =
  | 'CAMERA'
  | 'GALLERY';


const PHOTO_BTN_CONFIG: Record<
  PhotoBtnType,
{
  title: string,
Icon: React.FC<{ size?: number; className?: string }>,
}
> = {
	CAMERA: {
		title: '사진 촬영',
		Icon: Icons.Camera, 
	},
	GALLERY: {
		title: '갤러리에서 선택',
		Icon: Icons.Gallery,
	},
};

interface PhotoBtnProps {
  btnType: PhotoBtnType;
	handleClick: (type : PhotoBtnType ) => void
}


const PhotoBtn = ({ btnType, handleClick }: PhotoBtnProps) => {
	const { title, Icon } = PHOTO_BTN_CONFIG[btnType];

	return (
		<div className="max-w-42 w-full">
			<button
				onClick={() => handleClick(btnType)}
				className="w-full border border-primary-600 rounded-lg py-4 flex gap-2.5 justify-center items-center cursor-pointer hover:border-2 hover:-mb-1"
			> 
				<Icon
					size={20}
					className= {'text-primary-600'}
				/>                                                                   
				<span className='text-regular-16'>{title}</span>
			</button>
		</div>
	)
}
export default PhotoBtn
