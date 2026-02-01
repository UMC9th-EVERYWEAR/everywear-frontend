import kakaoIcon from '@/public/svgs/login/kakao-icon.svg'
import googleIcon from '@/public/svgs/login/google-icon.svg'
import { cn } from '@/src/utils/cn'

export type LoginType = 'KAKAO' | 'GOOGLE' // TODO: 나중에 설정페이지에서 재사용하도록 수정

const LOGIN_BTN: Record <
LoginType,
{
icon: string,
description: string
}> = {
	KAKAO :{
		icon: kakaoIcon,
		description: '카카오로 로그인',
	},
	GOOGLE :{
		icon: googleIcon,
		description: 'Google로 로그인',
	},
}

interface LoginBtnProps {
	type: LoginType;
	onClick: () => void;
}

const LoginBtn = ({ type, onClick }: LoginBtnProps) => {
	const { icon, description } = LOGIN_BTN[type]
	return(<button
		onClick={onClick}
		className={cn('w-65 rounded-lg flex gap-2 items-center justify-center py-3 cursor-pointer',
			type === 'KAKAO' ? 'bg-kakao' : 'bg-white border border-neutral-500',
		)}
	       >
		<img
			src={icon}
			alt=''
		/>
		<p>{description}</p>
	</button>)
}
export default LoginBtn
