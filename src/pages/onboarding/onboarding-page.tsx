import OnboardingSection from '@/src/components/onboarding/onboarding/OnboardingSection'
import { PATH } from '@/src/constants/path'
import { cn } from '@/src/utils/cn'
import { useNavigate } from 'react-router'

const OnBoardingPage = () => {
	const navigate = useNavigate()
	return <div
		className={cn('min-h-screen px-5 flex justify-center bg-onboarding py-20',
		)}
	       >
		<OnboardingSection setIsGuide={()=> navigate(PATH.ONBOARDING.GUIDE)} />
	
	</div>
}
export default OnBoardingPage
