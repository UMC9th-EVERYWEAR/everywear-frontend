import FooterNameSection from './FooterNameSection'
import Button from '../common/Button'
import { useNavigate } from 'react-router'
import { PATH } from '@/src/constants/path'
import AnimatedItem from './AnimatedItem'
import { useScrollAnimation } from '@/src/hooks/domain/onboarding/useScrollAnimation'
import { LOGO_IMAGES } from '@/src/constants/images'




const LandingFooter = () => {
	  const { ref, isInViewport } = useScrollAnimation();

	const navigate = useNavigate();
	const goLogin = () => {
		navigate(PATH.LOGIN.ROOT)
	}
	return(
		<div
			ref={ref}
			className='flex flex-col items-center gap-8 h-full pt-15 pb-20 bg-landing-footer-gradient w-full'
		>
			<div className='flex justify-center items-center w-full gap-6.5 '>


				{/* 왼쪽: 이미지 */}
				<AnimatedItem
					isActive={isInViewport}
					to="right"
					delay={1.5}
					distance={60}
					isShown
				>

					<div className='flex gap-2.5 items-center mb-2'>
						<img 
							src={LOGO_IMAGES.EVERYWEAR}
							alt="Everywear" 
							className="w-17.5 object-contain"
						/>
						<div className='flex flex-col gap-2.5'>
							<img
								src={LOGO_IMAGES.EVERY_LOGO}
								alt='everywear'
							/>
							<img
								src={LOGO_IMAGES.WEAR_LOGO}
								alt='everywear'
							/>
						</div>
					</div>
				</AnimatedItem>
				{/* 오른쪽: 이름 */}
				<AnimatedItem
					isActive={isInViewport}
					to="left"
					delay={1.5}
					distance={60}
				>
					<FooterNameSection />
				</AnimatedItem>
			</div>


			<AnimatedItem
				isActive={isInViewport}
				to="center"
				delay={1.5}
			>
				<div className='flex flex-col items-center gap-1'>
					<p className='text-primary-600 text-medium-12 text-center'>지금 바로 시작하세요!</p>
					<Button
						size='lg'
						onClick={goLogin}
					>무료로 시작하기</Button> {/* 버튼 컴포넌트에 bold가 없는 이슈 */}
				</div>
			</AnimatedItem>
		</div>


	)
}
export default LandingFooter
