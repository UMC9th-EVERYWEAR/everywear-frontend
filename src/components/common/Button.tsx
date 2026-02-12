import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'hover';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
	children,
	variant = 'filled',
	size = 'xl',
	disabled = false,
	onClick,
}: ButtonProps) => {
	const baseStyle = `
    flex justify-center items-center gap-[10px] rounded-[10px]
    transition-all 
  `;

	const sizeStyles = {
		sm: 'w-[200px] p-[8px] text-[14px]',
		md: 'w-[300px] p-[10px] text-[16px]',
		lg: 'w-[340px] p-[12px] text-[18px]',
		xl: 'w-full p-[16px] text-[18px]', 
	};

	const variantStyles = {
		filled: 'bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] hover:bg-[var(--color-primary-700)] cursor-pointer transition-colors duration-200',
		outlined: 'bg-white text-[var(--color-primary-600)] border-[1.5px] border-[var(--color-primary-600)] hover:bg-[var(--color-primary-600)] hover:text-[var(--color-neutral-50)] cursor-pointer transition-colors duration-200',
		hover: 'bg-[var(--color-primary-700)] text-[var(--color-neutral-50)] cursor-pointer transition-colors duration-200',
	};

	// 비활성화 스타일
	const disabledStyle = 'bg-[var(--color-neutral-400)] text-white cursor-not-allowed';

	const fullClassName = `
    ${baseStyle}
    ${sizeStyles[size]}
    ${disabled ? disabledStyle : variantStyles[variant]}
  `;

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={fullClassName}
		>
			{children}
		</button>
	);
};

export default Button;
