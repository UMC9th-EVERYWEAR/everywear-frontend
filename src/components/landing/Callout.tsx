import { cn } from '@/src/utils/cn';
import React from 'react';
interface CalloutProps {
  children: React.ReactNode;
  height: number;
}

const Callout = ({ children, height }: CalloutProps) => (
	<div
		className={cn('flex items-center gap-6')
		}
		style={{ height }}

	>
		<div
			className={cn('callout-bracket',
				height && `h-[${height}px]` )
			}
		/>
		<div className='text-regular-10 '>{children}</div> {/* TODO: medium으로 바꿔야됨 */}
	</div>
);
export default Callout
