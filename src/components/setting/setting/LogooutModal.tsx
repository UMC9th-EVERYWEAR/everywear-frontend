import { Modal } from '@/src/components/common/Modal';
import { useLogout } from '@/src/hooks/service/auth/useLogout';


interface Props {
  open: boolean;
  onClose: () => void;
}

const LogoutModal = ({ open, onClose }: Props) => {
	const { logout, isLoading : logoutLoading } = useLogout();

	if (!open) return null;

	const handleLogout = () => {
		logout();
		onClose();
	};

	return (
		<Modal
			isOpen={open}
			title="로그아웃 하시겠습니까?"
			onClose={onClose}
			btn1Text={logoutLoading ? '로그아웃 중...' : '예'}
			btn1Action={handleLogout} 
			btn2Text="아니요"
			btn2Action={onClose}
		/>
	);
};

export default LogoutModal;
