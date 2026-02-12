import Tag from '@/src/components/setting/setting-inquiry/Tag';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { uploadImageToImgBB } from '@/src/utils/imgbb';
import AttachmentPicker from '@/src/components/setting/setting-inquiry/AttachmentPicker';
import { Modal } from '@/src/components/common/Modal';
import type { TagCategory, InquiryDraft } from '@/src/types/setting/setting-inquiry';
import { ENV_CONFIG } from '@/src/constants/config';
import renderFields from '@/src/components/setting/setting-inquiry/renderFields';
import { useForm } from 'react-hook-form';
import useToast from '@/src/hooks/domain/ai-fitting/useToast';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';



type InquiryFormState = {
	tagCategory: TagCategory;
	title: string;
	email: string;
	message: string;
}

const INQUIRY_DRAFT_KEY = 'everywear:setting-inquiry:draft';



const SettingInquiry = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<InquiryFormState>({
		defaultValues: {
			tagCategory: '앱 오류신고',
			title: '',
			email: '',
			message: '',
		},
	});
	const [files, setFiles] = useState<File[]>([]);


	const [completed, setCompleted] = useState(false);
	const tagCategory = watch('tagCategory');
	const shownEmailErrorRef = useRef<string | null>(null);

	const { createToast , deleteToast, toasts } = useToast();

	useEffect(() => {
		const message = errors.email?.message;
		if (!message) {
			shownEmailErrorRef.current = null
			return;
		}
		  if (shownEmailErrorRef.current === message) return;
		shownEmailErrorRef.current = message;

		createToast({
			message,
		});
	}, [errors.email?.message, createToast]);


	useEffect(() => {
		try {
			const raw = localStorage.getItem(INQUIRY_DRAFT_KEY);
			if (!raw) return;

			const parsed: InquiryDraft = JSON.parse(raw);
			reset(parsed);
		} catch (e) {
			console.error(e);
		}
	}, [reset]);
	
	useEffect(() => {
		const subscription = watch((value) => {
			localStorage.setItem(INQUIRY_DRAFT_KEY, JSON.stringify(value));
		});

		return () => subscription.unsubscribe();
	}, [watch]);


	const onSubmit = async (data: InquiryFormState) => {
		try {
			const uploadResult = await Promise.all(files.map(uploadImageToImgBB));
			const imageUrls = uploadResult.map((r) => r.url);
			const imageHtml =
				imageUrls.length === 0
					? '<p style="color:#999">첨부된 이미지가 없습니다.</p>'
					: imageUrls
						.map(
							(url) => `
									<div style="margin: 8px 0;">
										<a href="${url}" target="_blank" rel="noreferrer">${url}</a><br/>
										<img 
											src="${url}" 
											style="max-width:320px;border-radius:12px;border:1px solid #eee;margin-top:6px;" 
										/>
									</div>
								`,
						)
  		.join('');
			await emailjs.send(
				ENV_CONFIG.EMAILJS.SERVICE_ID,
				ENV_CONFIG.EMAILJS.TEMPLATE_ID,
				{
					title: data.title,
					email: data.email,
					category: data.tagCategory,
					message: `[${data.tagCategory}]\n\n${data.message}`,
					image_urls: imageUrls.join('\n'),
					image_html: imageHtml,

				},
				{ publicKey: ENV_CONFIG.EMAILJS.PUBLIC_KEY },
			);

			localStorage.removeItem(INQUIRY_DRAFT_KEY);
			reset();
			setFiles([]);
			setCompleted(true);
		} catch {
			alert('메일 전송 실패');
		}
	};


	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="pt-6 px-4 text-medium-14 flex flex-col items-center"
		>			
			<ToastContainer>
				{toasts.map((t) => (
					<Toast
						key={t.id}
						id={t.id}
						message={t.message}
						deleteToast={deleteToast}
					/>
				))}
			</ToastContainer>

			<div className='flex flex-col gap-7 w-full mb-9'>
				<div className='flex w-full gap-2.5'>
					<Tag
						label="앱 오류신고"
						isActive={tagCategory === '앱 오류신고'}
						onClick={() => setValue('tagCategory', '앱 오류신고')}
					/>
					<Tag
						label="앱 이용문의"
						isActive={tagCategory === '앱 이용문의'}
						onClick={() => setValue('tagCategory', '앱 이용문의')}
					/>
					<Tag
						label="앱 개선제안"
						isActive={tagCategory === '앱 개선제안'}
						onClick={() => setValue('tagCategory', '앱 개선제안')}
					/>
				</div>

				{/* Content */}
				<div className='flex gap-5 flex-col w-full'>
					{
						renderFields({
							label: '제목',
							children: (
								<input
									{...register('title', { required: true })}
									className='w-full h-9.2 px-2.5 py-2  border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300'
									placeholder="작성해주세요."
								/>

							),
						})	
					}
					{
						renderFields({
							label: '이메일',
							children: (
								<input
									{...register('email', { required: true ,
										  pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: '이메일 형식이 올바르지 않습니다.',
										},
									})}
									className='w-full px-2.5 py-2 border border-neutral-400 rounded-md  focus:outline-none focus:ring-1 focus:ring-primary-300'
									placeholder="작성해주세요."
									
								/>

							),
						})	
					}
					{
						renderFields({
							label: '문의내용',
							children: (
								<div className='flex flex-col w-full gap-1'>		
									<textarea
										{...register('message')}
										maxLength={2000}
										className='w-full min-h-64 px-2.5 py-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300'
										placeholder='문의 내용을 작성해주세요.'
									/>
									<p className='text-regular-12 text-neutral-400 w-full text-end'>
										{watch('message')?.length ?? 0} / 2000byte
									</p>
								</div>

							),
						})	
					}

		
					{/*  사진 첨부 */}
					{renderFields({
						label: '첨부파일',
						children: (
							<div className="w-full">
								<AttachmentPicker
									files={files}
									onChangeFiles={setFiles}
									max={5}
								/>
							</div>
						),
					})}
				</div>
				<p className='w-full text-end text-neutral-400 text-regular-10'>
					* 운영 시간 : 오전 9시 ~ 오후 6시(평일)
				</p>
			</div>

			{/* submit */}
			<button
				type="submit"             
				disabled={isSubmitting}
				className="w-85 h-11 rounded-lg bg-primary-600 text-white text-medium-16 disabled:opacity-50 cursor-pointer"
			>
				{isSubmitting ? '전송 중...' : '접수하기'}
			</button>

			{
				completed && (
					<Modal
						isOpen={completed}
						title='접수가 완료되었습니다'
						btn1Action={()=>setCompleted(false)}
						btn1Text='확인'
						onClose={()=>setCompleted(false)}
					/>
				)
			}
		</form>
	);
};

export default SettingInquiry;
