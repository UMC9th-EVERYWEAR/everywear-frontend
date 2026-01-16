import { cn } from '@/src/lib/utils';
import type { ReactNode } from 'react';

interface InfoBoxProps {
  children: ReactNode;
  className?: string;
}

const InfoBox = ({ children, className }: InfoBoxProps) => {
	return (
		<div
			className={cn(
				'mx-4 flex flex-col gap-1 mb-8 bg-[#DBDFFE] rounded-lg px-4 py-2.5 text-regular-12',
				className,
			)}
		>
			{children}
		</div>
	);
};

export default InfoBox;
