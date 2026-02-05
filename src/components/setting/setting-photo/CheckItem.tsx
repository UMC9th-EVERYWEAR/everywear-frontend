import { SETTING_IMAGES } from '@/src/constants/images';

interface CheckItemProps {
  text: string;
  className?: string;
}

const CheckItem = ({ text, className }: CheckItemProps) => {
	return (
		<div className={`flex gap-0.5 ${className ?? ''}`}>
			<img
				src={SETTING_IMAGES.CHECK}
				alt="check icon"
				className="inline-block align-middle"
			/>
			<p>{text}</p>
		</div>
	);
};

export default CheckItem;
