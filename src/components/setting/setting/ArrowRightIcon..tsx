import { Icons } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn';

interface ArrowRightIconProps {
  className?: string
  rotated?: boolean
}

export const ArrowRightIcon = ({ className, rotated }: ArrowRightIconProps) => {
	return (
		<Icons.Arrow 
			size={25}
			className={cn(
				'cursor-pointer transition-transform duration-200 text-neutral-300',
				rotated ? 'rotate-90' : 'rotate-0',
				className,
			)}
		/>
	)
}
