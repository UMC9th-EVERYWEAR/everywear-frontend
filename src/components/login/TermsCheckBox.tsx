import { CheckIcon } from 'lucide-react';



export type TermType =
  | 'SERVICE'
  | 'PRIVACY'
  | 'PHOTO'
  | 'PRODUCT';


export type TermsCheckedState = Record<TermType, boolean>;

interface TermsCheckBoxProps {
  checked: boolean;
  label: string;
  required?: boolean;
  onClick: () => void;
	link?: string;
}
const TermsCheckBox = ({
	checked,
	label,
	required,
	onClick,
	link,
}: TermsCheckBoxProps) => {
	return (
		<div className="flex items-center gap-2.5 text-regular-14">
			<button
				onClick={onClick}
				className="cursor-pointer"
			>
				<CheckIcon
					width={18}
					height={18}
					className={checked ? 'bg-primary-300 text-white rounded-xs' : 'bg-neutral-200 text-white rounded-xs'}
				/>
			</button>

			{/* 약관 링크 */}
			{link ? (
				<button
					type="button"
					onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
					className="hover:underline hover:underline-offset-2 hover:decoration-neutral-700 transition cursor-pointer"
				>
					{label}
				</button>
			) : (
				<span>{label}</span>
			)}

			{required && <span className="text-terms-required">(필수)</span>}
		</div>
	);
};

export default TermsCheckBox;
