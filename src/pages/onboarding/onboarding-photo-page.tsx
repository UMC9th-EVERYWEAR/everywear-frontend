import AddPhotoSection from '@/src/components/onboarding/onboarding-photo/AddPhotoSection'
import { PATH } from '@/src/constants/path';
import { useNavigate } from 'react-router'

const OnboardingPhotoPage = () => {
	const navigate = useNavigate();

	return(
		<>	
			<AddPhotoSection setShowGuide={()=>navigate(PATH.ONBOARDING.ROOT)} />
		</>

	)
}
export default OnboardingPhotoPage
