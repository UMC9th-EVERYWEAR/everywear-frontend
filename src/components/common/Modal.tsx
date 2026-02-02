interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;       
  text?: string;
  btn1Text: string;
  btn1Action: () => void;
  btn2Text?: string;
  btn2Action?: () => void;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	text,
	btn1Text,
	btn1Action,
	btn2Text,
	btn2Action,
}: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
			onClick={onClose}
		>
			<div
				className="flex w-[303px] p-[20px] flex-col items-center gap-[16px] rounded-[12px] bg-white shadow-12"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col items-center gap-[8px] text-center w-full">
					{/* title 조건부 렌더링 적용 */}
					{title && (
						<h3 className="text-regular-16 font-bold text-neutral-900">
							{title}
						</h3>
					)}

					{text && (
						<p className="text-regular-14 text-neutral-600 leading-tight">
							{text}
						</p>
					)}
				</div>

				<div className="flex gap-[10px] w-full">
					{btn2Text && btn2Action && (
						<button
							type="button"
							onClick={btn2Action}
							className="flex-1 h-[40px] bg-neutral-100 text-neutral-500 rounded-[8px] text-medium-14 cursor-pointer hover:bg-neutral-200 transition-colors active:scale-95"
						>
							{btn2Text}
						</button>
					)}

					<button
						type="button"
						onClick={btn1Action}
						className="flex-1 h-[40px] bg-primary-600 text-neutral-50 rounded-[8px] text-medium-14 cursor-pointer hover:bg-primary-700 transition-colors active:scale-95"
					>
						{btn1Text}
					</button>
				</div>
			</div>
		</div>
	);
};
