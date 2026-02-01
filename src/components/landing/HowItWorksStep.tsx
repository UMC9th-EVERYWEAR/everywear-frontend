
import phoneMockup1 from '@/public/svgs/landing/how-work1.svg'
import phoneDetailHighlight1 from '@/public/svgs/landing/how-work1-1.svg'

import phoneMockup2 from '@/public/svgs/landing/intro1.svg'
import phoneDetailHighlight2 from '@/public/svgs/landing/how-work2-1.svg'

import phoneMockup3 from '@/public/svgs/landing/how-work3.svg'
import phoneDetailHighlight3 from '@/public/svgs/landing/how-work3-1.svg'

import phoneMockup4 from '@/public/svgs/landing/intro2.svg'
import phoneDetailHighlight4 from '@/public/svgs/landing/how-work4-1.svg'
import ScrollAnimationContainer from '../onboarding/onboarding/ScrollAnimationContainer'

export type STEPKEY = 'STEP1' | 'STEP2' | 'STEP3' | 'STEP4';


interface  HowItWorksStepProps  { 
	step: STEPKEY
}

const STEP_CONFIG: Record<
  STEPKEY,
  {
    title: number;
    description: string;
		description2?: string; 
    phoneMockup: string;
		phoneDetailHighlight: string;
		positionTop: number;
		positionLeft?: number;
		detailWidth?: number;
  }
> = {
	STEP1: {
		title: 1,
		description: '유명 쇼핑몰로 이동하여',
		description2: '원하는 상품을 찾습니다.',
		phoneMockup: phoneMockup1,
		phoneDetailHighlight: phoneDetailHighlight1,
		positionTop: 4,
		positionLeft: 0.5,
		detailWidth: 1.3,
	},
	STEP2: {
		title: 2,
		description: '쇼핑몰에서 복사한',
		description2: '링크를 붙여넣습니다.',
		phoneMockup: phoneMockup2,
		phoneDetailHighlight: phoneDetailHighlight2,
		positionTop: 7.8,
		positionLeft: 0.55,
		detailWidth: 1.35,
	},
	STEP3: {
		title: 3,
		description: '원하는 상품을 클릭해',
		description2: 'AI 분석을 요청합니다.',
		phoneMockup: phoneMockup3,
		phoneDetailHighlight: phoneDetailHighlight3,
		positionTop: 6.3,
		positionLeft: 0.2,
		detailWidth: 1.4,

	},
	STEP4 : {
		title: 4,
		description: 'AI분석 결과를 확인합니다.',
		phoneMockup: phoneMockup4,
		phoneDetailHighlight: phoneDetailHighlight4,
		positionTop: 18.6,
		positionLeft: 0.65,
		detailWidth: 1.35,
	},
};



const HowItWorksStep = ({ step }: HowItWorksStepProps) => {
	const { title, description, description2, phoneMockup, phoneDetailHighlight, positionTop, detailWidth, positionLeft } = STEP_CONFIG[step];

	return(

		<div className='flex w-77 items-center justify-center h-full gap-5.5 mb-10'> {/* 반응형할거면 바꿔야함*/}
				
			<div className="relative">
				{/* image */}
				<img
					src={phoneMockup}
					alt="phoneMockup1"
					className="w-45 object-fill z-20"
				/>			
				<img
					src={phoneDetailHighlight}
					alt="phoneDetailHighlight1"
					className="absolute object-fill z-20"
					style={{ top: `${positionTop}rem`, scale: `${detailWidth}`, left:`${positionLeft}rem`  }}
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
