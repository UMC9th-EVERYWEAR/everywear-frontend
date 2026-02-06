import Button from '@/src/components/common/Button'
import OnboardingNotice from '@/src/components/onboarding/onboarding/OnboardingNotice'
import OnboardingTip from '@/src/components/onboarding/onboarding/OnboardingTip'
import ScrollAnimationContainer from './ScrollAnimationContainer'
import { useState } from 'react'
import { ONBOARDING_IMAGES } from '@/src/constants/images'

interface OnboardingSectionProps {
  setIsGuide : () => void
}

const OnboardingSection = ({ setIsGuide } : OnboardingSectionProps) => {
	const [showButton, setShowButton] = useState(false);

	return(<>

		<div className='flex flex-col items-center max-w-109'>

			<img
				src={ONBOARDING_IMAGES.CAMERA_BLUE}
				alt='camera'
				width={55}
			/>

			<div className='mt-7 text-semibold-24 text-center'>
				<p className=''>가상 피팅을 위한</p>				
				<p className=''>사진을 등록해주세요</p>		
			</div>

			<div className='text-center mt-4'>
				{/*TODO: Anonymous Pro 폰트 수정*/}
				<p>업로드하신 사진은 AI 가상 피팅에 사용됩니다.</p>
				<p> 가이드를 참고하여 정확한 피팅 결과를 받아보세요!</p>										 											 
			</div>

			<ScrollAnimationContainer
				className='flex flex-col gap-6 mt-5 mb-9'
				stepDelay={0.3}

				onLastVisible={() => setShowButton(true)}
			>
				<OnboardingNotice feature='ACCURACY'/>
				<OnboardingNotice feature='SECURITY'/>
				<OnboardingNotice feature='SPEED'/>
				<OnboardingTip />
			</ScrollAnimationContainer>

			<div className='h-15 w-full'>
				{showButton && (
					<ScrollAnimationContainer
						baseDelay={0.1}
						className='w-full'
					>
						<Button onClick={setIsGuide}>가이드 보기</Button>
					</ScrollAnimationContainer>
				)}
			</div>
		
		

		</div>

	</>)
}
export default OnboardingSection
