import GuideSection from '@/src/components/onboarding/onboarding/GuideSection'
import OnboardingSection from '@/src/components/onboarding/onboarding/OnboardingSection'
import { cn } from '@/src/utils/cn'
import { useState } from 'react'

const OnBoardingPage = () => {
	const [isGuide, setIsGuide] = useState(false)
	const clickGuide = () => {
		setIsGuide((prev)=> !prev)
	}


	return <div
		className={cn('min-h-screen px-5 flex justify-center',
			isGuide ? 'bg-white py-10' : 'bg-onboarding py-20',
		)}
	       >
		{
			!isGuide && <OnboardingSection setIsGuide={clickGuide} />
		}
		{
			isGuide && <GuideSection />
		}
	</div>
}
export default OnBoardingPage
