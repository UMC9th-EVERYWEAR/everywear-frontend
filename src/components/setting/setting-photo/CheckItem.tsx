import { Icons } from '@/src/assets/icons/components/Icons';

interface CheckItemProps {
  text: string;
  className?: string;
}

const CheckItem = ({ text, className }: CheckItemProps) => {
	return (
		<div className={`flex gap-1 ${className ?? ''}`}>
			<Icons.CheckIcon className='text-primary-300  w-4.5 h-4.5'/>
			<p>{text}</p>
		</div>
	);
};

export default CheckItem;
