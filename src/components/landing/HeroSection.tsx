import { LANDING_IMAGES, LOGO_IMAGES } from '@/src/constants/images'




const HeroSection = () => {



	return(
		<button
			className='bg-brand-gradient min-h-screen flex flex-col py-5 items-center justify-center w-full'
		>

			<div className='flex gap-2.5 items-center mb-2'>
				<img 
					src={LOGO_IMAGES.HANEGER_LOGO}
					alt="Everywear" 
					className="w-20 h-20  object-contain"
				/>
				<img
					src={LOGO_IMAGES.EVERYWEAR}
					alt='everywear'
					className='w-65.5 h-10.5'
				/>
			</div>

			<p className='text-semibold-20 text-primary-600 ml-2'>AI로 입어보고 AI로 분석하는 스마트 피팅 앱</p>

			<img 
				src={LANDING_IMAGES.IPHONE}
				alt='iphone' 
				className='w-200 animate-guide-down transition-opacity duration-300'
			/>

		</button>
	)
}
export default HeroSection
