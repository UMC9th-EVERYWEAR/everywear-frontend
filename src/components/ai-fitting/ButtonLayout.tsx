import { cn } from '@/src/utils/cn';
import type React from 'react';

// 버튼 스타일 정의
const VARIANTS = {
	// 1. 메인 버튼 (파란색 배경) - AI 피팅하기, 다운로드(성공 시)
	primary: 'bg-primary-600 text-white hover:bg-primary-700 border-transparent',
    
	// 2. 테두리 버튼 (파란색 테두리) - 재생성하기(성공 시)
	outline: 'bg-white text-primary-600 border-primary-600 hover:bg-primary-50',
    
	// 3. 비활성화된 느낌의 채워진 버튼 (회색 배경) - 다운로드(로딩/실패 시)
	secondary: 'bg-neutral-400 text-white border-transparent cursor-not-allowed',
    
	// 4. 비활성화된 느낌의 테두리 버튼 (회색 테두리) - 재생성하기(로딩/실패 시)
	'outline-secondary': 'bg-white text-neutral-400 border-neutral-400 cursor-not-allowed',
} as const;

type VariantType = keyof typeof VARIANTS;

interface ButtonLayoutProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    content: string;
    variant?: VariantType; // variant prop 추가
}

const ButtonLayout = ({ 
	className, 
	content, 
	onClick, 
	variant = 'primary', // 기본값 primary
	disabled = false,
	...props 
}: ButtonLayoutProps) => {
	return (
		<button
			onClick={disabled ? undefined : onClick} // disabled일 때 클릭 방지
			disabled={disabled}
			className={cn(
				// [공통 레이아웃]
				'w-full p-2.5 shrink-0 self-stretch flex justify-center items-center',
				'leading-[150%] tracking-[-0.48px] text-regular-16 border',
				'rounded-xl transition-colors duration-200 cursor-pointer',
                
				// [Variant 스타일 적용]
				VARIANTS[variant],
                
				// [Disabled 덮어쓰기] - 실제 HTML disabled 속성이 true일 때 스타일
				disabled && 'opacity-70 cursor-not-allowed',

				className,
			)}
			{...props}
		>
			{content}
		</button>
	)
}

export default ButtonLayout;
