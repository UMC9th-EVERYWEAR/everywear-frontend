import { cn } from '@/src/utils/cn';

interface ButtonLayoutProps {
    className: string;
    content: string;
    onClick?: () => void; // onClick 함수 구현되면 적용
}

const ButtonLayout = ({ className, content, onClick } : ButtonLayoutProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'w-full p-2.5 shrink-0 self-stretch flex justify-center items-center',
				'leading-[150%] tracking-[-0.48px] border font-anonymous cursor-pointer',
				'rounded-xl text-medium-16',
				className,
			)}
		>
			{content}
		</button>
	)
}

export default ButtonLayout
