import { Modal } from '@/src/components/common/Modal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const LogoutModal = ({ open, onClose }: Props) => {
	if (!open) return null;

	return (
		<Modal
			isOpen={open}
			title="로그아웃 하시겠습니까?"
			onClose={onClose}
			btn1Text="예"
			btn1Action={onClose} // TODO: 로그아웃 처리
			btn2Text="아니요"
			btn2Action={onClose}
		/>
	);
};

export default LogoutModal;
