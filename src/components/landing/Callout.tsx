import { cn } from '@/src/utils/cn';
import React from 'react';
interface CalloutProps {
  children: React.ReactNode; 
  height: number;
	isLine?: boolean;
	marginBottom?: number;
	marginLeft?: number;
}

const Callout = ({ children, height, isLine, marginBottom, marginLeft }: CalloutProps) => (
	<div
		className={cn(
			'flex items-center gap-5.5',
		)}
		style={{ height , marginBottom }}

	>
		<div
			className={cn('',
				isLine ? 'callout-bracket-only' : 'callout-bracket',
			)}
		/>
		<div
			className='text-regular-10 text-start'
			style={{ marginLeft }}
		>{children}</div> {/* TODO: medium으로 바꿔야됨 */}
	</div>
);
export default Callout
