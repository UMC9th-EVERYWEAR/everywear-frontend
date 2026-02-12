import { Icons } from '@/src/assets/icons/components/Icons';
import { ONBOARDING_GUIDE_IMAGES } from '@/src/constants/images';
import { cn } from '@/src/utils/cn';


export type PhotoGuideRule =
  | 'SINGLE_SUBJECT'
  | 'SIMPLE_POSE'
  | 'CLOTHES_VISIBLE'
  | 'NO_GROUP'
  | 'THUMBNAIL_1'
  | 'THUMBNAIL_2'
  | 'THUMBNAIL_3'
  | 'THUMBNAIL_4';

type GuideVariant = keyof typeof ONBOARDING_GUIDE_IMAGES;

interface GuidePhotoProps {
  rule?: PhotoGuideRule;
	index: number;
  variant?: GuideVariant;
	hasText?: boolean;
	message?: string;
	imageSrc?: string;
}

const GuidePhoto = ({
	index,
	message,
	variant = 'GOOD',
	hasText = false,
}: GuidePhotoProps) => {	
	const imageSrc = ONBOARDING_GUIDE_IMAGES[variant][index];
	if (!imageSrc) return null;

	return (
		<div
			className={cn('overflow-hidden rounded-md flex flex-col',
				hasText ? 'h-50' : 'h-20 w-17',
			)}
		>
			<div
				className={cn('h-40 relative',
					hasText ? 'h-40' : 'h-20',
				)
				}
			>
				<img
					src={imageSrc}
					alt='guide'
					className="w-full h-full object-cover"
				/>
				{variant === 'GOOD' ? 		<Icons.GoodBox
					className={cn('absolute right-2 bottom-2  rounded-xs',
						hasText ? 'w-6' : 'w-4.5')
					}
				                        /> : 		<Icons.XBox
					className={cn('absolute right-2 bottom-2',
						hasText ? 'w-6' : 'w-4.5')
					}
				                               />}
		
			</div>
			{
				hasText && message && 
				<div className="bg-primary-900 min-h-10 flex items-center justify-center flex-1">
					<span className="text-regular-10 text-white text-center">{message}</span>
				</div>
			}
		</div>
	)
}
export default GuidePhoto;
