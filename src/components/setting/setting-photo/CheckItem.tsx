import checkIcon from '@/public/svgs/check-icon.svg';

interface CheckItemProps {
  text: string;
  className?: string;
}

const CheckItem = ({ text, className }: CheckItemProps) => {
	return (
		<div className={`flex gap-0.5 ${className ?? ''}`}>
			<img
				src={checkIcon}
				alt="check icon"
				className="inline-block align-middle"
			/>
			<p>{text}</p>
		</div>
	);
};

export default CheckItem;
