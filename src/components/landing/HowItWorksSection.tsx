

import HowItWorksStep, { type STEPKEY } from './HowItWorksStep'
import SectionTitle from './SectionTitle'
import { forwardRef } from 'react';

import { cn } from '@/src/utils/cn';
// import { useScrollStickyAnimation } from '@/src/hooks/domain/onboarding/useStickyHeader';

interface StepSectionProps {
  step: STEPKEY;
}


const StepSection = forwardRef<HTMLDivElement, StepSectionProps>(
	({ step }, ref) => {
		return (
			<section
				ref={ref}
				className=" flex items-center justify-center"
			>
				<HowItWorksStep step={step} />
			</section>
		);
	},
);
StepSection.displayName = 'StepSection';


const HowItWorksSection = () => {



	return(
		<section 
			className="relative h-full bg-landing-how-it-works"
		>
			<div
				className={cn('flex items-center justify-center pt-10 -mb-20 sm:-mb-40',
					// isSticky && 'sticky top-10',
					// isInViewport && 'animate-header-out',		
				)}
			>

				{/* 모바일일땐 괜찮지만 데스크톱 높이도 고려해야함 1. 이용방법은 fixed로 고정 2. 없이 그냥 스크롤*/}
				<SectionTitle
					sectionTitle='이용 방법'
					sectionDescription='EVERY WEAR, 이렇게 사용하세요!'
				/>
			</div>
			<div className="relative z-0">
				<StepSection step="STEP1" />
				<StepSection step="STEP2" />
				<StepSection step="STEP3" />
				<StepSection
					step="STEP4"
				/>
			</div>

		</section>
	)
		
}
export default HowItWorksSection
