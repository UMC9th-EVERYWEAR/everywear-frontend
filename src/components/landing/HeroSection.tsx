import logo from '@/public/logo.svg'
import everywear from '@/public/svgs/LogoImages/Everywear.svg'
import iphone from '@/public/svgs/landing/iPhone.svg'


interface HeroSectionProps {
  onNext: () => void
}

const HeroSection = ({ onNext }: HeroSectionProps) => {
	return(
		<button
			onClick={onNext}		
			className='bg-brand-gradient min-h-screen pt-10 flex flex-col items-center  justify-center w-full'
		>

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

		</button>
	)
}
export default HeroSection
