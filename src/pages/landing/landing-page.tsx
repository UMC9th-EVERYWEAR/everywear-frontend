import HeroSection from '@/src/components/landing/HeroSection'
import HowItWorksSection from '@/src/components/landing/HowItWorksSection'
import IntroAIFittingSection from '@/src/components/landing/IntroAIFittingSection'
import IntroAIReviewSection from '@/src/components/landing/IntroAIReviewSection'
import IntroConnectSection from '@/src/components/landing/IntroConnectSection'
import LandingFooter from '@/src/components/landing/LandingFooter'
import { PATH } from '@/src/constants/path'
import { useMe } from '@/src/hooks/service/auth/useMe'
import { cn } from '@/src/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

const LadingPage = () => {
	const introRef = useRef<HTMLDivElement>(null)
	const howRef = useRef<HTMLDivElement>(null)
	const [scrollEnabled, setScrollEnabled] = useState(false)
	const navigate = useNavigate();
	const { data: me } = useMe();

	useEffect(() => {
		if (me) {
			navigate(PATH.HOME); // 또는 onboarding
		}
	}, [me, navigate]);



	const scrollToIntro = () => {
		setScrollEnabled(true)
		requestAnimationFrame(() => {
			introRef.current?.scrollIntoView({ behavior: 'smooth' })
		})	}

	const scrollToHow = () => {
		// howRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div
			className={cn('w-full h-screen snap-y snap-mandatory scrollbar-hide',
				scrollEnabled ? 'overflow-y-scroll' : 'overflow-hidden',
			)}
		>
			{/* Hero  */}
			<section
				// ref={heroRef}
				className="h-screen snap-start overflow-y-hidden"
			>
				<HeroSection onNext={scrollToIntro} />
			</section>

			<section
				ref={introRef}
				className="min-h-screen snap-start "
			>				
				{/* intro */}
				<IntroConnectSection />
				<IntroAIFittingSection />
				<IntroAIReviewSection onNext={scrollToHow} />
			</section>

			{/* how work */}
			  <section
				ref={howRef}
				className="min-h-screen snap-start overflow-y-auto"
			  >
				<HowItWorksSection />

				{/* <ScrollAnimationContainer> */}
				<LandingFooter />
				{/* </ScrollAnimationContainer> */}
			</section>

		</div>
	)
}
export default LadingPage
