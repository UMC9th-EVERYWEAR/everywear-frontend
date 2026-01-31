import HeroSection from '@/src/components/landing/HeroSection'
import HowItWorksSection from '@/src/components/landing/HowItWorksSection'
import IntroAIFittingSection from '@/src/components/landing/IntroAIFittingSection'
import IntroAIReviewSection from '@/src/components/landing/IntroAIReviewSection'
import IntroConnectSection from '@/src/components/landing/IntroConnectSection'
import LandingFooter from '@/src/components/landing/LandingFooter'

const LadingPage = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			{/* <HeroSection /> */}
			{/* intro */}
			{/* <IntroConnectSection />
			<IntroAIFittingSection />
			<IntroAIReviewSection /> */}
			{/* how work */}
			<HowItWorksSection />
			<LandingFooter />

		</div>
	)
}
export default LadingPage
