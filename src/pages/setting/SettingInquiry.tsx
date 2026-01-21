import Tag from '@/src/components/setting/setting-inquiry/Tag';
import React from 'react';
import { useState } from 'react';

type TagCategory = '앱 오류신고' | '앱 개선제안' | '앱 이용문의';

const SettingInquiry = () => {
	const [tagCategory, setTagCategory] = useState<TagCategory | null>('앱 오류신고');

	const renderFields = ({ label, children }: {label: string, children: React.ReactNode}) => {
		return (
			<div className='flex gap-2'>
				<div className='flex min-w-18.5 '>
					<span className='text-neutral-900'>{label}</span>
					<span className='text-[#FF7C7C]'>*</span>
				</div>
				{children}
			</div>
		);
	};
	return (
		<div className='pt-6 px-4 text-medium-14'>
			<div className='flex flex-col gap-7'>
				{/* Tags */}
				<div className='flex gap-2.5'>
					<Tag
						label="앱 오류신고"
						isActive={tagCategory === '앱 오류신고'}
						onClick={() => setTagCategory('앱 오류신고')}
					/>
					<Tag
						label="앱 이용문의"
						isActive={tagCategory === '앱 이용문의'}
						onClick={() => setTagCategory('앱 이용문의')}
					/>
					<Tag
						label="앱 개선제안"
						isActive={tagCategory === '앱 개선제안'}
						onClick={() => setTagCategory('앱 개선제안')}
					/>
				</div>

				{/* Content */}
				<div className='flex gap-5 flex-col'>
					{
						renderFields({
							label: '제목',
							children: (
								<input
									className='w-full h-9.2 px-2.5 py-2  border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300'
									placeholder='문의 내용을 작성해주세요.'
								/>
							),
						})	
					}
					{
						renderFields({
							label: '이메일',
							children: (
								<input
									className='w-full px-2.5 py-2 border border-neutral-400 rounded-md  focus:outline-none focus:ring-1 focus:ring-primary-300'
									placeholder='문의 내용을 작성해주세요.'
								/>
							),
						})	
					}
					{
						renderFields({
							label: '문의내용',
							children: (
								<textarea
									className='w-full min-h-64 px-2.5 py-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300'
									placeholder='문의 내용을 작성해주세요.'
								/>
							),
						})	
					}
				</div>


			</div>
		</div>
	);
};

export default SettingInquiry;
