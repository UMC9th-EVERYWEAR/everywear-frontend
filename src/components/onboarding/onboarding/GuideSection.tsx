import { PATH } from '@/src/constants/path';
import { useNavigate } from 'react-router';
import Button from '../../common/Button';
import GuidePhoto from './GuidePhoto';

import { cn } from '@/src/utils/cn';
import { ONBOARDING_GUIDE_IMAGES } from '@/src/constants/images';

const MAIN_GUIDES = [
	{
		variant: 'GOOD' as const,
		index: 0,
		message: '단독 사진, 전신 또는 반신 정면 사진',
	},
	{
		variant: 'BAD' as const,
		index: 0,
		message: '단체 사진 또는 복잡한 의상 금지',
	},
	{
		variant: 'GOOD' as const,
		index: 1,
		message: '단순한 포즈, 가려지지 않은 의상',
	},
	{
		variant: 'BAD' as const,
		index: 1,
		message: '가려진 의상이 있는 복잡한 포즈 금지',
	},
];
const THUMBNAIL_START_INDEX = 2;


const GuideSection = () => {

	const navigate = useNavigate();
	const goPhoto = () => {
		navigate(PATH.ONBOARDING.PHOTO);
	};

	return (
		<div
			className={cn(
				'transition-all duration-500 ease-out opacity-0 animate-guide-in',
			)}
		>
			<div className="border border-neutral-200 w-full rounded-sm px-2 py-5 flex flex-col items-center mb-5.5">

				<p className="text-medium-20 mb-1 text-black">인물 사진 업로드 가이드 라인</p>
				<p className="px-1 text-regular-14 text-center text-neutral-500 mb-3">최상의 결과를 얻으려면 당신의 인물 사진을 업로드할 때 아래 가이드라인을 따라주세요</p>
			
				<div className='grid grid-cols-2 grid-rows-2 gap-3'>
					{MAIN_GUIDES.map(({ variant, index, message }) => (
						<GuidePhoto
							key={`${variant}-${index}`}
							variant={variant}
							index={index}
							hasText
							message={message}
						/>
					))}
				</div>

				<div className='grid grid-cols-4 grid-rows-2 gap-3 mt-5'>
					{(['GOOD', 'BAD'] as const).map((variant) =>
						ONBOARDING_GUIDE_IMAGES[variant]
							.slice(THUMBNAIL_START_INDEX)
							.map((_, idx) => (
								<GuidePhoto
									key={`${variant}-thumb-${idx}`}
									variant={variant}
									index={idx + THUMBNAIL_START_INDEX}
								/>
							)),
					)}
				</div>
			</div>

			<Button onClick={goPhoto}>확인하기</Button>
		</div>
	)
}
export default GuideSection;
