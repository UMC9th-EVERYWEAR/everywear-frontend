interface Props {
  onLogout: () => void;
  onWithdraw: () => void;
}

const FooterActions = ({ onLogout, onWithdraw }: Props) => {
	return (
		<div className="text-neutral-700 flex flex-col items-start text-regular-12">
			<button
				onClick={onLogout}
				className="cursor-pointer py-1"
			>
				로그아웃
			</button>
			<button
				onClick={onWithdraw}
				className="cursor-pointer py-1"
			>
				회원탈퇴
			</button>
		</div>
	);
};

export default FooterActions;
