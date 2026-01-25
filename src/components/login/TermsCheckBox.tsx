import checkBox from '@/public/svgs/login/check-box.svg'
import nonCheckBox from '@/public/svgs/login/no-check-box.svg'


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
				<img
					src={checked ? checkBox : nonCheckBox}
					alt="check"
				/>
			</button>

			{/* 약관 링크 */}
			{link ? (
				<button
					type="button"
					onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
					className="hover:underline hover:underline-offset-2 hover:decoration-neutral-700 transition"
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
