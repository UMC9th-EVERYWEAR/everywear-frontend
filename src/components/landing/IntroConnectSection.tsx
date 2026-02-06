import SectionTitle from './SectionTitle'
import Callout from './Callout'
import ScrollAnimationContainer from '../onboarding/onboarding/ScrollAnimationContainer'
import { LANDING_IMAGES } from '@/src/constants/images'

const IntroConnectSection = () => {
	return(
		<div
			className='flex flex-col items-center justify-center w-full gap-10'
		>
			<SectionTitle
				sectionTitle='스마트 쇼핑 연결'
				sectionDescription='원하는 상품을 쉽고 빠르고 확인해보세요!'
			/>

			<div className='relative flex w-93.75 h-100'> {/* 반응형할거면 바꿔야함*/}
				<div className="absolute top-0 left-11 flex items-center justify-center">

					{/* gradient */}
					<div className="absolute w-100 h-100 -left-25 bg-phone-gradient" />

					{/* image */}
					<img
						src={LANDING_IMAGES.INTRO_1}
						alt="intro1"
						className="relative w-45 h-80 object-contain z-20"
					/>			
				</div>

				<ScrollAnimationContainer
					className='absolute top-18 right-4 flex flex-col gap-2'
					baseDelay={0.3}
					stepDelay={0.6}
				>
	
					{/* <div className='absolute top-18 right-4 flex flex-col gap-2'> */}
					<Callout height={40}>
						원하는 쇼핑몰에 들어가서<br />
						상품의 링크를 복사해주세요!
					</Callout>
					<Callout height={38}>
						복사한 링크를 넣어주면 <br />
						상품을 추가할 수 있어요!					
					</Callout>
					{/* </div> */}
				</ScrollAnimationContainer>
			</div>

			
		</div>
	)
}
export default IntroConnectSection
