
import ScrollAnimationContainer from '../onboarding/onboarding/ScrollAnimationContainer'
import  { LANDING_IMAGES } from '@/src/constants/images'
import React from 'react';

export type STEPKEY = 'STEP1' | 'STEP2' | 'STEP3' | 'STEP4';


interface  HowItWorksStepProps  { 
	step: STEPKEY
	  style?: React.CSSProperties;

}

const STEP_CONFIG: Record<
  STEPKEY,
  {
    title: number;
    description: string;
		description2?: string; 
    phoneMockup: string;
		phoneDetailHighlight: string;

  }
> = {
	STEP1: {
		title: 1,
		description: '유명 쇼핑몰로 이동하여',
		description2: '원하는 상품을 찾습니다.',
		phoneMockup: LANDING_IMAGES.HOW_WORK_1,
		phoneDetailHighlight: LANDING_IMAGES.HOW_WORK_1_1,

	},
	STEP2: {
		title: 2,
		description: '쇼핑몰에서 복사한',
		description2: '링크를 붙여넣습니다.',
		phoneMockup: LANDING_IMAGES.INTRO_1,
		phoneDetailHighlight: LANDING_IMAGES.HOW_WORK_2_1,

	},
	STEP3: {
		title: 3,
		description: '원하는 상품을 클릭해',
		description2: 'AI 분석을 요청합니다.',
		phoneMockup: LANDING_IMAGES.HOW_WORK_3,
		phoneDetailHighlight: LANDING_IMAGES.HOW_WORK_3_1,


	},
	STEP4 : {
		title: 4,
		description: 'AI분석 결과를 확인합니다.',
		phoneMockup: LANDING_IMAGES.INTRO_2,
		phoneDetailHighlight: LANDING_IMAGES.HOW_WORK_4_1,
	},
};



const HowItWorksStep = ({ step , style }: HowItWorksStepProps) => {
	const { title, description, description2, phoneMockup } = STEP_CONFIG[step];

	return(

		<div
			className='flex w-77 items-center justify-center h-screen gap-5.5 mb-10 animate-view-in'
			style={style}
		> 
				
			<div className="relative">
				<img
					src={phoneMockup}
					alt="phoneMockup1"
					className="w-45 object-fill z-20"
				/>			
			</div>


			<ScrollAnimationContainer
				isFadeInRight
				baseDelay={0}
				stepDelay={1}
			>
				<div className='flex flex-col gap-1.5 w-31'>
					<p className='underline underline-offset-4  decoration-[1.5px] text-medium-12 text-landing-how-it-works-step'> 
						STEP<span className='text-medium-14'>{title}</span>
					</p>

					<p className='text-medium-12 text-nowrap'> {/* TODO: medium-10으로 수정 */}
						{description} <br />
						{description2 && description2}				
					</p>
				</div>
			</ScrollAnimationContainer>


		</div>			
	)
}
export default HowItWorksStep
