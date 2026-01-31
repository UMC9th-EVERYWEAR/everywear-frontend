import logo from '@/public/logo.svg'
import everywear from '@/public/svgs/LogoImages/Everywear.svg'
import iphone from '@/public/svgs/landing/iPhone.svg'
const HeroSection = () => {
	return(
		<div className='flex flex-col items-center w-full'>

			<div className='flex gap-2.5 items-center mb-2'>
				<img 
					src={logo}
					alt="Everywear" 
					className="w-17.5 object-contain"
				/>
				<img
					src={everywear}
					alt='everywear'
					className='w-48.5 h-8.5'
				/>
			</div>

			<p className='text-semibold-16 text-primary-600'>AI로 입어보고 AI로 분석하는 스마트 피팅 앱</p>

			<img 
				src={iphone}
				alt='iphone' 
			/>

		</div>
	)
}
export default HeroSection
