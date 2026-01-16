import arrowRight from '@/public/svgs/arrow-right.svg'
import { cn } from '@/src/lib/utils'

interface ArrowRightIconProps {
  className?: string
  rotated?: boolean
}

export const ArrowRightIcon = ({ className, rotated }: ArrowRightIconProps) => {
	return (
		<img
			src={arrowRight}
			alt="arrow right"
			className={cn(
				'cursor-pointer transition-transform duration-200',
				rotated ? 'rotate-90' : 'rotate-0',
				className,
			)}
		/>
	)
}
