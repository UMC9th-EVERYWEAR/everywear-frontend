import AddPhotoSection from '@/src/components/onboarding/onboarding-photo/AddPhotoSection'
import { useState } from 'react'

const OnboardingPhotoPage = () => {
	const [showGuide, setShowGuide] = useState(false);

	return(<>	
		{
			! showGuide && 	<AddPhotoSection setShowGuide={()=>setShowGuide(true)} />
		}
		{/* {
			showGuide &&  가이드섹션 추가
		} */}
	</>

	)
}
export default OnboardingPhotoPage
