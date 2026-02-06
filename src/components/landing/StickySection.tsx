
import { cn } from '@/src/utils/cn';
import React from 'react';

interface StickySectionProps {
  children: React.ReactNode;
  /** 전체 스크롤 높이 */
  height?: string;
  /** sticky 영역 추가 클래스 */
  stickyClassName?: string;
  /** section wrapper 클래스 */
  className?: string;

  sectionRef?: React.RefObject<HTMLDivElement | null>;

}

const StickySection = ({
	children,
	height = '200vh',
	className,
	stickyClassName,
	sectionRef,
}: StickySectionProps) => {
	return (
		<section
			ref={sectionRef}
			className={cn('relative', className)}
			style={{ height }}
		>
			<div
				className={cn(
					'sticky top-0 h-screen flex items-center justify-center',
					stickyClassName,
				)}
			>
				{children}
			</div>
		</section>
	);
};

export default StickySection;
