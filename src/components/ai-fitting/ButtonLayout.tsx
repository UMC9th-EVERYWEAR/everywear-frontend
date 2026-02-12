import { cn } from '@/src/utils/cn';
import type React from 'react';

const VARIANTS = {
	primary: 'bg-primary-600 text-white hover:bg-primary-700 border-transparent',
    
	outline: 'bg-white text-primary-600 border-primary-600 hover:bg-primary-50',

	secondary: 'bg-neutral-400 text-white border-transparent cursor-not-allowed',
    
	'outline-secondary': 'bg-white text-neutral-400 border-neutral-400 cursor-not-allowed',
} as const;

type VariantType = keyof typeof VARIANTS;

interface ButtonLayoutProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    content: string;
    variant?: VariantType; 
}

const ButtonLayout = ({ 
	className, 
	content, 
	onClick, 
	variant = 'primary', 
	disabled = false,
	...props 
}: ButtonLayoutProps) => {
	return (
		<button
			onClick={disabled ? undefined : onClick} 
			disabled={disabled}
			className={cn(
				'w-full p-2.5 shrink-0 self-stretch flex justify-center items-center',
				'leading-[150%] tracking-[-0.48px] text-regular-16 border',
				'rounded-xl transition-colors duration-200 cursor-pointer',
        
				VARIANTS[variant],
        
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
