import OnboardingSection from '@/src/components/onboarding/onboarding/OnboardingSection'
import { PATH } from '@/src/constants/path'
import { cn } from '@/src/utils/cn'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const OnBoardingPage = () => {
	const [isGuide, setIsGuide] = useState(false)
	const clickGuide = () => {
		setIsGuide((prev)=> !prev)
	}

	const navigate = useNavigate();
	const goPhoto = () => {
		navigate(PATH.ONBOARDING.PHOTO);
	};

	return <div
		className={cn('min-h-screen py-20 px-5 flex justify-center',
			isGuide ? 'bg-white' : 'bg-onboarding',
		)}
	       >
		{
			!isGuide && <OnboardingSection setIsGuide={clickGuide} />
		}
	</div>
}
export default OnBoardingPage
