import { PATH } from '@/src/constants/path';
import { useNavigate } from 'react-router';
import Button from '../../common/Button';
import GuidePhoto, { type PhotoGuideRule } from './GuidePhoto';
import singleGood from '@/public/svgs/onboarding/good-photo1.svg';
import singleBad from '@/public/svgs/onboarding/bad-photo1.svg';
import poseGood from '@/public/svgs/onboarding/good-photo2.svg';
import poseBad from '@/public/svgs/onboarding/bad-photo2.svg';
import good1 from  '@/public/svgs/onboarding/good-photo3.svg'
import good2 from  '@/public/svgs/onboarding/good-photo4.svg'
import good3 from  '@/public/svgs/onboarding/good-photo5.svg'
import good4 from  '@/public/svgs/onboarding/good-photo6.svg'

import bad1 from  '@/public/svgs/onboarding/bad-photo3.svg'
import bad2 from '@/public/svgs/onboarding/bad-photo4.svg'
import bad3 from '@/public/svgs/onboarding/bad-photo5.svg'
import bad4 from '@/public/svgs/onboarding/bad-photo6.svg'
import { cn } from '@/src/utils/cn';

const GUIDE_RULE_IMAGES: Record<
  PhotoGuideRule,
  Record<'GOOD' | 'BAD', string>
> = {
	SINGLE_SUBJECT: {
		GOOD: singleGood,
		BAD: singleBad,
	},
	SIMPLE_POSE: {
		GOOD: poseGood,
		BAD: poseBad,
	},
};

const GUIDE_EXAMPLE_IMAGES = {
	GOOD: [good1, good2, good3, good4],
	BAD: [bad1, bad2, bad3, bad4],
} as const;

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
					<GuidePhoto
						imageSrc={GUIDE_RULE_IMAGES.SINGLE_SUBJECT.GOOD}
						rule={'SINGLE_SUBJECT'}
						variant='GOOD'
						hasText={true}
					/>
					<GuidePhoto
						imageSrc={GUIDE_RULE_IMAGES.SINGLE_SUBJECT.BAD}
						rule={'SINGLE_SUBJECT'}
						variant='BAD'
						hasText={true}
					/>
					<GuidePhoto
						imageSrc={GUIDE_RULE_IMAGES.SIMPLE_POSE.GOOD}
						rule={'SIMPLE_POSE'}
						variant='GOOD'
						hasText={true}
					/>
					<GuidePhoto
						imageSrc={GUIDE_RULE_IMAGES.SIMPLE_POSE.GOOD}
						rule={'SIMPLE_POSE'}
						variant='BAD'
						hasText={true}
					/>
				</div>

				<div className='grid grid-cols-4 grid-rows-2 gap-3 mt-5'>
					  {GUIDE_EXAMPLE_IMAGES.GOOD.map((img, idx) => (
						<GuidePhoto
							key={`good-${idx}`}
							imageSrc={img}
							variant="GOOD"
						/>
					))}

					{GUIDE_EXAMPLE_IMAGES.BAD.map((img, idx) => (
						<GuidePhoto
							key={`bad-${idx}`}
							imageSrc={img}
							variant="BAD"
						/>
					))}
				</div>
			</div>

			<Button onClick={goPhoto}>확인하기</Button>
		</div>
	)
}
export default GuideSection;
