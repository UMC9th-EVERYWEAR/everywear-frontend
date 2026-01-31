// import HeroSection from '@/src/components/landing/HeroSection'
import HeroSection from '@/src/components/landing/HeroSection'
import IntroAIFittingSection from '@/src/components/landing/IntroAIFittingSection'
import IntroAIReviewSection from '@/src/components/landing/IntroAIReviewSection'
import IntroConnectSection from '@/src/components/landing/IntroConnectSection'
// import IntroConnectSection from '@/src/components/landing/IntroConnectSection'

const LadingPage = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<HeroSection />
			<IntroConnectSection />
			<IntroAIFittingSection />
			<IntroAIReviewSection />

		</div>
	)
}
export default LadingPage
