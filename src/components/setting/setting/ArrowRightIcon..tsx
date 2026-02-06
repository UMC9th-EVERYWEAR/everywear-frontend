import { SETTING_IMAGES } from '@/src/constants/images';
import { cn } from '@/src/utils/cn';

interface ArrowRightIconProps {
  className?: string
  rotated?: boolean
}

export const ArrowRightIcon = ({ className, rotated }: ArrowRightIconProps) => {
	return (
		<img
			src={SETTING_IMAGES.ARROW_RIGHT}
			alt="arrow right"
			className={cn(
				'cursor-pointer transition-transform duration-200',
				rotated ? 'rotate-90' : 'rotate-0',
				className,
			)}
		/>
	)
}
