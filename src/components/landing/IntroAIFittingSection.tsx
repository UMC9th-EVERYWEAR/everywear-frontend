import SectionTitle from './SectionTitle'
import Callout from './Callout'
import ScrollAnimationContainer from '../onboarding/onboarding/ScrollAnimationContainer'
import { LANDING_IMAGES } from '@/src/constants/images'

const IntroAIFittingSection = () => {
	return(
		<div
			className='flex flex-col items-center justify-center w-full gap-10'
		>
			<SectionTitle
				sectionTitle='AI 가상 피팅'
				sectionDescription='모델 핏 말고 내 핏, EVERY WEAR를 통해 확인하세요!'
			/>

			<div className='relative flex w-93.75 h-118'> {/* 반응형할거면 바꿔야함*/}
				<div className="absolute top-0 left-7 flex items-center justify-center">
					{/* image */}
					<img
						src={LANDING_IMAGES.INTRO_2}
						alt="intro2"
						className="w-35 relative object-cover z-20"
					/>			
				</div>

				<ScrollAnimationContainer
					className='absolute top-12 right-3.5 flex flex-col'
					baseDelay={0.3}
					stepDelay={0.6}
				>			
					<Callout
						height={33}
						marginBottom={5}
					>
						상품이 마음에 든다면 바로 구매하거나 <br />
						상품을 찜할 수 있어요!
					</Callout>
					<Callout
						height={153}
						marginBottom={7}
					>		
						피팅 전 사진				
					</Callout>
					<Callout
						height={155}
						marginBottom={20}
					>
						피팅 결과				
					</Callout>
					<Callout
						height={0}
						isLine
						marginBottom={21}
					>
						가상 피팅 이미지를 재생성할 수 있어요!
					</Callout>
					<Callout
						height={0}
						isLine
					>
						피팅 결과 이미지를 저장할 수 있어요!					
					</Callout>
				</ScrollAnimationContainer>
			</div>

			
		</div>
	)
}
export default IntroAIFittingSection
