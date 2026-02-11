import AddPhotoSection from '@/src/components/onboarding/onboarding-photo/AddPhotoSection'
import MallGuide from '@/src/components/products/MallGuide';
import { useState } from 'react'

const OnboardingPhotoPage = () => {
	const [showGuide, setShowGuide] = useState(false);

	
	return(
		<>
			<AddPhotoSection setShowGuide={()=>setShowGuide(true)} />	
			{showGuide && (
				<MallGuide onClose={() => setShowGuide(false)} />
			)}

		</>
	)
}
export default OnboardingPhotoPage
