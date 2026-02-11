import AddPhotoSection from '@/src/components/onboarding/onboarding-photo/AddPhotoSection'
import MallGuide from '@/src/components/products/MallGuide';
import { useState } from 'react'

const OnboardingPhotoPage = () => {
	const [showGuide, setShowGuide] = useState(false);

	if(showGuide)
	{
		return(
			<MallGuide onClose={()=> setShowGuide(false)} />
		)
	}	
	
	return(
		<AddPhotoSection setShowGuide={()=>setShowGuide(true)} />	
	)
}
export default OnboardingPhotoPage
