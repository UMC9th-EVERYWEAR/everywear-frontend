import LoginBtn from '@/src/components/login/LoginBtn'
import { ENV_CONFIG } from '@/src/constants/config';
import { LOGO_IMAGES } from '@/src/constants/images';
export type LoginType = keyof typeof OAUTH_AUTHORIZATION_PATH;

const OAUTH_AUTHORIZATION_PATH = {
	KAKAO: '/oauth2/authorization/kakao',
	GOOGLE: '/oauth2/authorization/google',
} as const;


const LoginPage = () => {

	const handleLogin = (type:LoginType ) => {
		const path = OAUTH_AUTHORIZATION_PATH[type];
		const redirectUri = encodeURIComponent(
  `${window.location.origin}/login/callback`,
		);
		window.location.href = `${ENV_CONFIG.SERVER.BASE_URL}${path}?redirect_uri=${redirectUri}`;
	}
	return(
		<div className="bg-primary-600 min-h-screen px-8 flex justify-center items-center">
			<div className="bg-white rounded-lg w-82 max-w-82 pt-26 pb-26 flex items-center flex-col gap-16">


				<div className='flex flex-col gap-7 px-3'>
					<img
						src={LOGO_IMAGES.EVERYWEAR}
						alt='logo'
						className='px-11 sm:w-400'
					/>
					<div className='text-center text-neutral-700 text-regular-16'> {/* breakpoin에는 커스텀 클래스 적용 안되는 문제 해결 필요 */}
						 {/* TODO: 추후 폰트 수정 */}
						<p className=''>Every Wear에 오신걸 환영합니다</p> 
						<p> 간편하게 로그인하고 스마트 쇼핑을 시작하세요</p>
					</div>
				</div>

				<div className='w-full flex flex-col gap-2.5 px-8 py-3 items-center'>
					<LoginBtn
						type='KAKAO'
						onClick={()=>handleLogin('KAKAO')}
					/>
					<LoginBtn
						type='GOOGLE'
						onClick={()=>handleLogin('GOOGLE')}
					/>
				</div>
			</div>
		</div>
	)
}
export default LoginPage
