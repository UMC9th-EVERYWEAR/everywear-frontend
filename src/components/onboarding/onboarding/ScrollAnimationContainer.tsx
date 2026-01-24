import React from 'react';
import { useScrollAnimation } from '@/src/hooks/domain/onboarding/useScrollAnimation';
import { cn } from '@/src/utils/cn';

type PropsType = {
  children: React.ReactNode;
  className?: string;
  baseDelay?: number; // 시작 딜레이 (초)
  stepDelay?: number; // 아이템 간 간격 (초)
  lastDelay?: number; // 마지막 요소 전용 딜레이 (초)
  onLastVisible? : () => void;
};


const ScrollAnimationContainer = ({
	children,
	className,
	baseDelay = 0,
	stepDelay = 0.15,
	lastDelay,
	onLastVisible,
}: PropsType) => {	
	const { ref, isInViewport } = useScrollAnimation();
	const count = React.Children.count(children);

	return (
		<div
			className={className}
			ref={ref}
		>
			{React.Children.map(children, (child, index) => {
				const isLast = index === count - 1;
				const delay =
          isLast && lastDelay !== undefined
          	? baseDelay + (index - 1) * stepDelay + lastDelay
          	: baseDelay + index * stepDelay;

				return(
					<div
						style={{
							animationDelay: `${delay}s`,
						}}
						className={cn(
							'opacity-0',
							isInViewport && 'animate-frame-in',
						)}
						onAnimationEnd={() => {
							if (isLast) onLastVisible?.();
						}}
					>
						{child}
					</div>
				)})}
		</div>
	);

};

export default ScrollAnimationContainer;
