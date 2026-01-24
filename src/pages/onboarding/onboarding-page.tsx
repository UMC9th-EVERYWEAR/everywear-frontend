import camera from '@/public/svgs/onboarding/camera-blue.svg'
import OnboardingNotice from '@/src/components/onboarding/OnboardingNotice'
import OnboardingTip from '@/src/components/onboarding/OnboardingTip'
const OnBoardingPage = () => {
	return <div className='bg-onboarding min-h-screen pt-20 px-5'>
		
		<div className='flex flex-col items-center '>

			<img
				src={camera}
				alt='camera'
				width={55}
			/>

			<div className='mt-7 text-semibold-24 text-center'>
				<p className=''>가상 피팅을 위한</p>				
				<p className=''>사진을 등록해주세요</p>		
			</div>

			<div className='text-center mt-4'>
				{/*TODO: Anonymous Pro 폰트 수정*/}
				<p>업로드하신 사진은 AI 가상 피팅에 사용됩니다.</p>
				<p> 가이드를 참고하여 정확한 피팅 결과를 받아보세요!</p>										 											 
			</div>

			<div className='flex flex-col gap-6 mt-5 mb-9'>
				<OnboardingNotice feature='ACCURACY'/>
				<OnboardingNotice feature='SECURITY'/>
				<OnboardingNotice feature='SPEED'/>
			</div>

			<OnboardingTip />
			<div>
			</div>
		</div>
	</div>
}
export default OnBoardingPage
