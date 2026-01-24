import ToggleBtn from './ToggleBtn';

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

const NotificationSection = ({ enabled, onToggle }: Props) => {
	return (
		<div className="mb-7">
			<div className="border-b py-1 border-neutral-900 text-medium-16">
				알림
			</div>
			<div className="py-2 flex justify-between border-b-[0.5px] border-neutral-300">
				<span className="text-regular-14 flex items-center">알림 설정</span>
				<ToggleBtn
					checked={enabled}
					onChange={onToggle}
				/>
			</div>
		</div>
	);
};

export default NotificationSection;
