import React from 'react';

const renderFields = ({ label, children }: {label: string, children: React.ReactNode}) => {
	return (
		<div className='flex gap-2'>
			<div className='flex min-w-18.5 '>
				<span className='text-neutral-900'>{label}</span>
				<span className='text-[#FF7C7C]'>{label === '첨부파일'? '' : '*'}</span>
			</div>
			{children}
		</div>
	);
};

export default renderFields;
