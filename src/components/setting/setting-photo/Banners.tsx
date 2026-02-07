import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { cn } from '@/src/utils/cn';
import {  useEffect, useRef } from 'react';
import { SETTING_IMAGES } from '@/src/constants/images';
import type { Swiper as SwiperClass } from 'swiper/types';
import type { UserImgQuery } from '@/src/apis/generated';
import type { PendingUpload } from '@/src/pages/setting/setting-photo-page';
import { resizeImage } from '@/src/utils/resizeImage';
import { useVerifyAndSaveProfileImage } from '@/src/hooks/service/user/useVerifyAndSaveProfileImage';

interface BannerProps {
	photoItems?: UserImgQuery[];
	activeRealIndex: number;
	setActiveRealIndex: (index: number) => void;
	setIsAddCardActive?: (isActive: boolean) => void;
	setPendingUploads: React.Dispatch<React.SetStateAction<PendingUpload[]>>;
	
}
const Banner = ({ activeRealIndex, photoItems, setActiveRealIndex, setIsAddCardActive, setPendingUploads }: BannerProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const pendingIndexRef = useRef<number | null>(null);
	const { mutateAsync: uploadPhoto } = useVerifyAndSaveProfileImage();


	// hasImage: null/undefined/공백 처리까지 고려한 이미지 존재 여부 확인 함수 
	const hasImage = (url?: string | null) => Boolean(url?.trim());

	const activeItem = photoItems?.[activeRealIndex];
	
	/// isAddCardActive 상태 업데이트
	useEffect(() => {
		if (setIsAddCardActive) {
			setIsAddCardActive(!hasImage(activeItem?.imageUrl));
		}
	}, [activeRealIndex, activeItem, setIsAddCardActive]);

	const openFilePicker = (index: number) => {
		pendingIndexRef.current = index;
		fileInputRef.current?.click();
	};

	  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		    const index = pendingIndexRef.current;

		if (!file || index === null || !photoItems || !setPendingUploads) return;

		//  미리보기(낙관적 UI)
		const previewUrl = URL.createObjectURL(file);
		const tempId = -(Date.now());

		setPendingUploads((prev) => [
			...prev,
			{
				tempId,
				previewUrl,
			},
		]);
		const resizedFile = await resizeImage(file);
		uploadPhoto(resizedFile)
		
		// 같은 파일 다시 선택 가능하도록 초기화
		e.target.value = '';
		    pendingIndexRef.current = null;

	};


	// slide 안에 들어갈 컨텐츠 결정 함수 (추천 네이밍)
	const renderPhotoSlideContent = (item: UserImgQuery, idx: number) => {
		// 이미지 없으면 => 추가 카드
		if (!item.imageUrl) {
			return (
				<>
					<button
						type="button"
						onClick={() => openFilePicker(idx)}
						className="w-full h-full aspect-square rounded-lg bg-neutral-50 flex items-center justify-center cursor-pointer hover:opacity-75"
					>
						<img
							src={SETTING_IMAGES.PLUS}
							alt="add"
							className='rounded'
						/>
					</button>
				</>
			);
		}

		// 이미지 있으면 => 이미지 카드
		return (
			<div className="relative w-full h-full aspect-square rounded-lg overflow-hidden">
				<img
					src={item.imageUrl}
					alt="card"
					className={cn('w-full h-full object-cover rounded-lg overflow-hidden',
						item.representative ? 'border-4 border-primary-600' : '',
					)}
				/>
			</div>
		);
	};

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				hidden
				onChange={handleChangeFile}
			/>
		
			<Swiper
				centeredSlides
				direction="horizontal"
				modules={[Pagination]}
				pagination={{ clickable: true }}
				spaceBetween={2}
				slidesPerView="auto"
				breakpoints={{
					0: {  spaceBetween: 10 },
					375: { spaceBetween: 12 },
					640: {  spaceBetween: 16 },
				}}
				className="photo-swiper pb-6 h-106.75"
				onSwiper={(swiper: SwiperClass) => {
					setActiveRealIndex(swiper.realIndex);
				}}
				  onSlideChange={(swiper: SwiperClass) => {
					setActiveRealIndex(swiper.realIndex)}}
				loop
			>
				{photoItems?.map((item, idx) => (
					<SwiperSlide
						key={idx}
						className="!w-78.75"
					>
						<div className="flex justify-center items-center h-95">
							<div
								className={cn(
									'w-full rounded-lg transition-all duration-200 ease-in-out shadow-photo',
									idx === activeRealIndex ? 'h-95' : 'h-73.75',
								)}
							>
								{renderPhotoSlideContent(item, idx)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default Banner; 
