import React from "react";

type ButtonVariant = "primary" | "outline" | "gray" | "dark";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", children, className, ...props }: ButtonProps) => {
  const baseStyle = "flex w-[300px] p-[10px] justify-center items-center gap-[10px] rounded-[10px] text-regular-16 text-neutral-50 transition-all active:scale-[0.98] cursor-pointer";

  const variants = {
    primary: "bg-primary-600",
    outline: "bg-white border-[1.5px] border-primary-600 !text-primary-600",
    gray: "bg-neutral-500",
    dark: "bg-[#2C3374]",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;