import { Icons } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn'
import React from 'react';

export type LoginType = 'KAKAO' | 'GOOGLE' // TODO: 나중에 설정페이지에서 재사용하도록 수정

const LOGIN_BTN: Record <
LoginType,
{
Icon: React.FC<{ size?: number; className?: string }>,
description: string
}> = {
	KAKAO :{
		Icon: Icons.Kakao,
		description: '카카오로 로그인',
	},
	GOOGLE :{
		Icon: Icons.Google,
		description: 'Google로 로그인',
	},
}

interface LoginBtnProps {
	type: LoginType;
	onClick: () => void;
}

const LoginBtn = ({ type, onClick }: LoginBtnProps) => {
	const { Icon, description } = LOGIN_BTN[type]
	return(<button
		onClick={onClick}
		className={cn('w-65 rounded-lg flex gap-2 items-center justify-center py-3 cursor-pointer',
			type === 'KAKAO' ? 'bg-kakao' : 'bg-white border border-neutral-500',
		)}
	       >
		<Icon
			size={30}
			className={type === 'KAKAO' ? 'text-black' : 'text-primary-600'}
		/>
		<p>{description}</p>
	</button>)
}
export default LoginBtn
