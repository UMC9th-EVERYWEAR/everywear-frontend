import { cn } from '@/src/lib/utils';
interface TagProps {
	label?: string;
  isActive?: boolean;
	onClick: () => void;
}
const Tag = ( { label, isActive, onClick }: TagProps ) => {
	return (
		<button
			type='button'
			className={cn('px-2 py-1.5  rounded-full cursor-pointer',
				isActive ? 'bg-primary-600 text-white' : 'bg-white text-neutral-500 border border-neutral-1000 ',
			)}
			onClick={onClick}
		>
			{label}
		</button>
	);
};  
export default Tag;
