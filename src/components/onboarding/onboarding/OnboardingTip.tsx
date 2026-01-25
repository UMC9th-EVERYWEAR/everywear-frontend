import { cn } from '@/src/utils/cn';

const TIP_MESSAGE = {
	TITLE: 'Tip : 다음 화면에서 제공되는 사진 촬영 가이드를 꼭 확인해주세요!',
	DESCRIPTION: '더 정확한 피팅 결과를 받으실 수 있습니다.',
} 

const OnboardingTip = () => {
	return(
		<div className={cn('px-11 py-3.5 bg-white  text-text-neutral-700 text-center text-regular-14 max-w-109 rounded-xl mb-10 sm:px-8')}>
			<p className="px-7 sm:px-0">{TIP_MESSAGE.TITLE}</p>
			<p>{TIP_MESSAGE.DESCRIPTION}</p>
		</div>)
}
export default OnboardingTip;
