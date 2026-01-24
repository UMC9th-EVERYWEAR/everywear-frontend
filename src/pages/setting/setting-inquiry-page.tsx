import Tag from '@/src/components/setting/setting-inquiry/Tag';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { uploadImageToImgBB } from '@/src/utils/imgbb';
import AttachmentPicker from '@/src/components/setting/setting-inquiry/AttachmentPicker';
import { Modal } from '@/src/components/common/Modal';
import type { TagCategory, InquiryDraft } from '@/src/types/schemas/setting/setting-inquiry';




const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const INQUIRY_DRAFT_KEY = 'everywear:setting-inquiry:draft';



const SettingInquiry = () => {
	  const formRef = useRef<HTMLFormElement>(null);

	const [tagCategory, setTagCategory] = useState<TagCategory | null>('앱 오류신고');

	const [title, setTitle] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');  

	const [files, setFiles] = useState<File[]>([]);
	const [isSending, setIsSending] = useState(false);

	const [completed, setCompleted] = useState(false);
	const [draftLoaded, setDraftLoaded] = useState(false);


	// 복원 useEffect ( 추후에 창 나가기 시에 초기화하는 것으로 수정)
	useEffect(() => {
		try {
			const raw = localStorage.getItem(INQUIRY_DRAFT_KEY);
			if (!raw) return;

			const parsed: InquiryDraft = JSON.parse(raw);

			setTagCategory(parsed.tagCategory ?? '앱 오류신고');
			setTitle(parsed.title ?? '');
			setEmail(parsed.email ?? '');
			setMessage(parsed.message ?? '');
		} catch (e) {
			console.error('draft restore failed', e);
		}finally {
			setDraftLoaded(true); // 복원 완료
		}
	}, []);


	useEffect(() => {
		  if (!draftLoaded) return; //  복원 끝나기 전이면 저장 X

		const draft: InquiryDraft = {
			tagCategory,
			title,
			email,
			message,
		};

		try {
			localStorage.setItem(INQUIRY_DRAFT_KEY, JSON.stringify(draft));
		} catch (e) {
			console.error('draft save failed', e);
		}
	}, [tagCategory, title, email, message]);


	
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

	  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() || !email.trim() || !message.trim()) {
			alert('필수 항목을 모두 입력해주세요.');
			return;
		}
		if (!formRef.current) return;

		setIsSending(true);
		try {
			// 1) 이미지 업로드
			// (여기서 사진 업로드 성공 시 URL 리스트를 얻는다)
			const uploadResults = await Promise.all(files.map((f) => uploadImageToImgBB(f)));

			// ImgBB URL들
			const imageUrls = uploadResults.map((r) => r.url);
			const deleteUrls = uploadResults.map((r) => r.deleteUrl);

			// 2) EmailJS 템플릿 변수 구성
			// 템플릿에서 image_urls, image_html 변수를 활용할 수 있게 전달
			const imageHtml = imageUrls
				.map(
					(url) => `
          <div style="margin: 8px 0;">
            <a href="${url}" target="_blank" rel="noreferrer">${url}</a><br/>
            <img src="${url}" style="max-width:320px;border-radius:12px;border:1px solid #eee;margin-top:6px;" />
          </div>
        `,
				)
				.join('');

			await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				{
					title,
					email,
					name: 'EVERYWEAR USER',
					category: tagCategory,
					message: `[${tagCategory}]\n\n${message}`,

					// 템플릿에서 쓸 변수들
					image_urls: imageUrls.join('\n'),
					image_html: imageHtml,

					// 추후 삭제용 링크
					delete_urls: deleteUrls.join('\n'),
				},
				{ publicKey: PUBLIC_KEY },
			);
			localStorage.removeItem(INQUIRY_DRAFT_KEY);

			setCompleted(true);
			// reset
			setTitle('');
			setEmail('');
			setMessage('');
			setTagCategory('앱 오류신고');
			setFiles([]);
		} catch (err) {
			console.error(err);
			alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
		} finally {
			setIsSending(false);
		}
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className="pt-6 px-4 text-medium-14 flex flex-col items-center"
		>			
			<div className='flex flex-col gap-7 w-full mb-9'>
				<div className='flex w-full gap-2.5'>
					{/*  hidden input으로 category, name 같이 보내기 */}
					<input
						type="hidden"
						name="category"
						value={tagCategory ? tagCategory : '앱 오류신고'}
					/>
					<input
						type='hidden'
						name='name'
						value='EVERYWEAR USER'
					/>
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
				<div className='flex gap-5 flex-col w-full'>
					{
						renderFields({
							label: '제목',
							children: (
								<input
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className='w-full h-9.2 px-2.5 py-2  border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300'
									placeholder='작성해주세요.'
								/>
							),
						})	
					}
					{
						renderFields({
							label: '이메일',
							children: (
								<input
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full px-2.5 py-2 border border-neutral-400 rounded-md  focus:outline-none focus:ring-1 focus:ring-primary-300'
									placeholder='작성해주세요.'
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
										name="message"
										value={message}
										maxLength={2000}
										onChange={(e) => setMessage(e.target.value)}
										className='w-full min-h-64 px-2.5 py-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300'
										placeholder='문의 내용을 작성해주세요.'
									/>
									<p className='text-regular-12 text-neutral-400 w-full text-end'>{message.length} / 2000byte</p>
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
				disabled={isSending}
				className="w-85 h-11 rounded-lg bg-primary-600 text-white text-medium-16 disabled:opacity-50 cursor-pointer"
			>
				{isSending ? '전송 중...' : '접수하기'}
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
