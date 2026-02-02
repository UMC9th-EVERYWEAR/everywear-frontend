// 로딩 시 보여줄거임
import logo from '@/public/svgs/LogoImages/Everywear.svg'

const LoadingPage = () => {
	return(
		<div 
			className="min-h-screen flex items-center justify-center"
		>
			<img
				src={logo}
				alt='logo'
				className='w-100'
			/>
		</div>
	)
}

export default LoadingPage
