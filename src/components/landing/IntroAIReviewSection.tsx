import intro3 from '@/public/svgs/landing/intro3.svg'
import SectionTitle from './SectionTitle'
import Callout from './Callout'

const IntroAIReviewSection = () => {
	return(
		<div
			className='flex flex-col items-center justify-center w-full min-h-screen pt-10 gap-10 bg-landing-back'
		>
			<SectionTitle
				sectionTitle='AI 리뷰 요약'
				sectionDescription='최신 리뷰의 핵심 정보를 빠르게 파악할 수 있어요!'
			/>

			<div className='relative flex w-93.75 h-80'> {/* 반응형할거면 바꿔야함*/}
				<div className="absolute top-0 left-1 flex items-center justify-center">

					{/* image */}
					<img
						src={intro3}
						alt="intro3"
						className="relative w-45 h-80 object-contain z-20"
					/>			
				</div>

				<div className='absolute top-13 right-3.5 flex flex-col'>
					<Callout
						height={41}
						marginBottom={4}
					>
						상품이 마음에 든다면 바로 구매하거나 <br />
						상품을 찜할 수 있어요!					 
					</Callout>
					<Callout
						height={43}
						marginBottom={10}
					>
						AI 리뷰 분석 및 요약을 확인할 수 있어요!				
					</Callout>
					<Callout
						height={15}
						marginBottom={5}
					>
						리뷰를 키워드로 확인할 수 있어요!
					</Callout>
					<Callout height={133}>
						AI 리뷰 요약을 기다리는 동안 <br />
						최신 리뷰를 미리 확인할 수 있어요!
					</Callout>
				</div>
			</div>

			
		</div>
	)
}
export default IntroAIReviewSection
