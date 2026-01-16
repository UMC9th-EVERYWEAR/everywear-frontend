interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
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
				className="flex w-[220px] p-[20px] flex-col items-center gap-[16px] rounded-[12px] bg-white shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col items-center gap-[8px] text-center w-full">
					<h3 className="text-[16px] font-[700] text-neutral-900">
						{title}
					</h3>

					{text && (
						<p className="text-[13px] font-[400] text-neutral-600">
							{text}
						</p>
					)}
				</div>

				<div className="flex gap-[10px] w-full">
					{btn2Text && btn2Action && (
						<button
							onClick={btn2Action}
							className="flex-1 h-[40px] bg-neutral-100 text-neutral-500 rounded-[8px] text-[14px] font-bold cursor-pointer hover:bg-neutral-200 transition-colors"
						>
							{btn2Text}
						</button>
					)}

					<button
						onClick={btn1Action}
						className="flex-1 h-[40px] bg-[#3B4599] text-white rounded-[8px] text-[14px] font-bold cursor-pointer hover:bg-[#2C3374] transition-colors"
					>
						{btn1Text}
					</button>
				</div>
			</div>
		</div>
	);
};
