
import GuideSection from '@/src/components/onboarding/onboarding/GuideSection'
import { cn } from '@/src/utils/cn'

const OnBoardingGuidePage = () => {

	return <div
		className={cn('min-h-screen px-5 flex justify-center bg-white py-10',
		)}
	       >

		<GuideSection />
		
	</div>
}
export default OnBoardingGuidePage
