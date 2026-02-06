import { LANDING_IMAGES, LOGO_IMAGES } from '@/src/constants/images'
import { cn } from '@/src/utils/cn'
import { useEffect, useState } from 'react'


interface HeroSectionProps {
  onNext?: () => void
}

const HeroSection = ({ onNext }: HeroSectionProps) => {
	const [showArrow, setShowArrow]= useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setShowArrow(true), 2000)
		return () => clearTimeout(timer)
	}, [])

	return(
		<button
			onClick={onNext}		
			className='bg-brand-gradient min-h-screen pt-10 flex flex-col items-center  justify-center w-full'
		>

			<div className='flex gap-2.5 items-center mb-2'>
				<img 
					src={LOGO_IMAGES.HANEGER_LOGO}
					alt="Everywear" 
					className="w-17.5 object-contain"
				/>
				<img
					src={LOGO_IMAGES.EVERYWEAR}
					alt='everywear'
					className='w-48.5 h-8.5'
				/>
			</div>

			<p className='text-semibold-16 text-primary-600'>AI로 입어보고 AI로 분석하는 스마트 피팅 앱</p>

			<img 
				src={LANDING_IMAGES.IPHONE}
				alt='iphone' 
			/>

			<div
				className={cn('animate-infinite-fade text-semibold-20  text-primary-600',
					!showArrow && 'animation-paused',
				)}
			>
				화면을 클릭하세요!
			</div>

		</button>
	)
}
export default HeroSection
