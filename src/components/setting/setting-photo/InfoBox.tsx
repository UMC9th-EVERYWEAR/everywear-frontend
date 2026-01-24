import { cn } from '@/src/utils/cn';
import type { ReactNode } from 'react';

interface InfoBoxProps {
  children: ReactNode;
  className?: string;
}

const InfoBox = ({ children, className }: InfoBoxProps) => {
	return (
		<div
			className={cn(
				'mx-4 flex w-85.75 flex-col gap-1 mb-8 bg-[#DBDFFE] rounded-lg px-4 py-2.5 text-regular-12',
				className,
			)}
		>
			{children}
		</div>
	);
};

export default InfoBox;
