import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'hover';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = 'filled',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) => {
  const baseStyle = `
    flex justify-center items-center gap-[10px] rounded-[10px]
    transition-all font-['Pretendard']
  `;

  const sizeStyles = {
    sm: 'w-[200px] p-[8px] text-[14px]',
    md: 'w-[300px] p-[10px] text-[16px]',
    lg: 'w-[340px] p-[12px] text-[18px]',
  };

  const variantStyles = {
    filled: 'bg-[#3B4599] text-[#F0F2F7] hover:bg-[#2C3374] cursor-pointer',
    outlined: 'bg-white text-[#3B4599] border-[1.5px] border-[#3B4599] hover:bg-[#F5F6FA] cursor-pointer',
    hover: 'bg-[#2C3374] text-[#F0F2F7] cursor-pointer',
  };

  const disabledStyle = 'bg-[#A0A7B2] text-white cursor-not-allowed';

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