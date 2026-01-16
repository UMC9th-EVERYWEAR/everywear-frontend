import { cn } from '@/src/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  disabled?: boolean;
  srLabel?: string; // 접근성 label (screen reader)
}

const ToggleBtn = ({
	checked,
	onChange,
	className,
	disabled = false,
	srLabel = 'toggle',
}: ToggleProps) => {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={srLabel}
			disabled={disabled}
			onClick={onChange}
			className={cn(
				'w-10 h-5 rounded-full relative transition-colors',
				checked ? 'bg-primary-600' : 'bg-[#D9D9D9]',
				disabled && 'opacity-50 cursor-not-allowed',
				!disabled && 'cursor-pointer',
				className,
			)}
		>
			<div
				className={cn(
					'bg-white w-4 h-4 rounded-full absolute top-0.5 left-[1.77px]',
					'transition-transform ease-in-out duration-200',
					checked ? 'translate-x-5' : 'translate-x-0',
				)}
			/>
		</button>
	);
};

export default ToggleBtn;
