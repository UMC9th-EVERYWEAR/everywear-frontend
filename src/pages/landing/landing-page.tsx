import HeroSection from '@/src/components/landing/HeroSection'
import HowItWorksSection from '@/src/components/landing/HowItWorksSection'
import IntroAIFittingSection from '@/src/components/landing/IntroAIFittingSection'
import IntroAIReviewSection from '@/src/components/landing/IntroAIReviewSection'
import IntroConnectSection from '@/src/components/landing/IntroConnectSection'
import LandingFooter from '@/src/components/landing/LandingFooter'
import { PATH } from '@/src/constants/path'
import { useMe } from '@/src/hooks/service/auth/useMe'
import { cn } from '@/src/utils/cn'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const LadingPage = () => {
	const navigate = useNavigate();
	const { data: me } = useMe();

	useEffect(() => {
		if (me) {
			navigate(PATH.HOME);
		}
	}, [me, navigate]);


	return (
		<div
			className={cn('w-full')}
		>
			{/* Hero  */}
			<section
				className="h-screen"
			>
				<HeroSection />
			</section>

			{/* intro */}
			<section
				className="relative h-[200vh]"
			>				
				<div className="sticky top-0 h-screen flex items-center justify-center">
					<IntroConnectSection />
				</div>
			</section>

			<section
				className="relative h-[300vh] bg-phone-two-gradient"
			>				
				<div className="sticky top-0 h-screen flex items-center justify-center">
					<IntroAIFittingSection />
				</div>
			</section>		
			<section
				className="relative h-[200vh] bg-landing-back"
			>
				<div className="sticky top-0 h-screen flex items-center justify-center">
					<IntroAIReviewSection />
				</div>
			</section>

			{/* howWork */}
			<HowItWorksSection />

			{/* footer */}
			<LandingFooter />

		</div>
	)
}
export default LadingPage
