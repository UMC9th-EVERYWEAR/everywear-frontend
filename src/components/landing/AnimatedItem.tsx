import React from 'react';
import { cn } from '@/src/utils/cn';

type Direction = 'left' | 'right' | 'center';

type AnimatedItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  isShown?: boolean;
  to?: Direction;      // 
  distance?: number;   // px
  delay?: number;      // s
};

const AnimatedItem = ({
	children,
	isActive,
	isShown,
	to = 'center',
	distance = 40,
	delay = 0,
}: AnimatedItemProps) => {
	const targetTransform =
    to === 'left'
    	? `translateX(-${distance}px)`
    	: to === 'right'
    		? `translateX(${distance}px)`
    		: 'translateX(0px)';

	return (
		<div
			style={{
				transform: isActive ? 'translateX(0px)' : targetTransform,
				transitionDelay: `${delay}s`,
			}}
			className={cn(
				'transition-all duration-700 ease-out',
				isShown ? 'opacity-100' : 'opacity-0',
				isActive && 'opacity-100',
			)}
		>
			{children}
		</div>
	);
};

export default AnimatedItem;
