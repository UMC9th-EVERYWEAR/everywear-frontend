import { LOGIN_IMAGES, ONBOARDING_IMAGES } from '@/src/constants/images';
import { cn } from '@/src/utils/cn';


export type PhotoGuideRule =
  | 'SINGLE_SUBJECT'
  | 'SIMPLE_POSE';

type GuideVariant = 'GOOD' | 'BAD';

const GUIDE_MESSAGES: Record<
  PhotoGuideRule,
  Record<GuideVariant, string>

> = {
	SINGLE_SUBJECT: {
		GOOD: '단독 사진, 전신 또는 반신 정면 사진',
		BAD: '단체 사진 또는 복잡한 의상 금지',
	},
	SIMPLE_POSE: {
		GOOD: '단순한 포즈, 가려지지 않은 의상',
		BAD: '가려진 의상이 있는 복잡한 포즈 금지',
	},
};

interface GuidePhotoProps {
  rule?: PhotoGuideRule;
  variant?: GuideVariant;
	hasText?: boolean;
	imageSrc?: string;
}

const GuidePhoto = ({
	rule,
	variant = 'GOOD',
	hasText = false,
}: GuidePhotoProps) => {	
	const message = GUIDE_MESSAGES[rule ?? 'SIMPLE_POSE'][variant];
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
					src={LOGIN_IMAGES.CHECK_BOX}
					alt='guide'
					className="w-full h-full object-cover"
				/>
				<img	
					src={variant === 'GOOD' ? ONBOARDING_IMAGES.CHECKBOX_MARKED : ONBOARDING_IMAGES.CHECKBOX_MARKED_CLOSE}
					alt='check'
					className={cn('absolute right-2 bottom-2',
						hasText ? 'w-6' : 'w-4.5')
					}
				/>
			</div>
			{
				hasText && 
				<div className="bg-primary-900 min-h-10 flex items-center justify-center flex-1">
					<span className="text-regular-10 text-white text-center">{message}</span>
				</div>
			}
		</div>
	)
}
export default GuidePhoto;
