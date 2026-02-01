import logo from '@/public/logo.svg'
import every from '@/public/svgs/LogoImages/every-logo.svg'
import wear from '@/public/svgs/LogoImages/wear-logo.svg'
import FooterNameSection from './FooterNameSection'
import Button from '../common/Button'
import { useNavigate } from 'react-router'
import { PATH } from '@/src/constants/path'




const LandingFooter = () => {
	const navigate = useNavigate();
	const goLogin = () => {
		navigate(PATH.LOGIN)
	}
	return(
		<div
			className='flex flex-col items-center gap-8 h-full pt-15 pb-20 bg-landing-footer-gradient w-full'
		>
			<div className='flex justify-center items-center w-full gap-6.5 '>
				<div className='flex gap-2.5 items-center mb-2'>
					<img 
						src={logo}
						alt="Everywear" 
						className="w-17.5 object-contain"
					/>
					<div className='flex flex-col gap-2.5'>
						<img
							src={every}
							alt='everywear'
						/>
						<img
							src={wear}
							alt='everywear'
						/>
					</div>
				</div>

				<FooterNameSection />
			</div>


			<div className='flex flex-col items-center gap-1'>
				<p className='text-primary-600 text-medium-12 text-center'>지금 바로 시작하세요!</p>
				<Button
					size='lg'
					onClick={goLogin}
				>무료로 시작하기</Button> {/* 버튼 컴포넌트에 bold가 없는 이슈 */}
			</div>
		</div>
	)
}
export default LandingFooter
