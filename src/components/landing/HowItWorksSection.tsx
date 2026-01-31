

import HowItWorksStep from './HowItWorksStep'
import SectionTitle from './SectionTitle'

const HowItWorksSection = () => {
	return(
		<div
			className='flex flex-col items-center w-full min-h-screen h-full py-10 gap-10 bg-landing-how-it-works'
		>
			<SectionTitle
				sectionTitle='이용 방법'
				sectionDescription='EVERY WEAR, 이렇게 사용하세요!'
			/>
			<HowItWorksStep step='STEP1'/>
			<HowItWorksStep step='STEP2'/>
			<HowItWorksStep step='STEP3'/>
			<HowItWorksStep step='STEP4'/>

		
		</div>
	)
}
export default HowItWorksSection
