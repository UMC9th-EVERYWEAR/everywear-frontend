import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import React, { type RefObject } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { cn } from '@/src/utils/cn';
import {  useEffect } from 'react';
import { SETTING_IMAGES } from '@/src/constants/images';
import type { Swiper as SwiperClass } from 'swiper/types';
import type { UserImgQuery } from '@/src/apis/generated';
import type { PendingUpload } from '@/src/pages/setting/setting-photo-page';
import { useBannerUpload } from '@/src/hooks/domain/setting/useBannerUpload';

interface BannerProps {
	photoItems?: UserImgQuery[];
	activeRealIndex: number;
  swiperRef: RefObject<SwiperClass | null>;
	itemIds: number[]
	setActiveRealIndex: (index: number) => void;
	setIsAddCardActive?: (isActive: boolean) => void;
	setPendingUploads: React.Dispatch<React.SetStateAction<PendingUpload[]>>;
	handleUploadStartNotice: () => void;
	handleError: () => void;
	handleSuccess: () => void;
	
}
const Banner = ({ activeRealIndex, photoItems, swiperRef, itemIds, setActiveRealIndex, setIsAddCardActive, setPendingUploads, handleUploadStartNotice, handleError, handleSuccess }: BannerProps) => {
	
	const { fileInputRef, openFilePicker, handleChangeFile } = useBannerUpload({
		setPendingUploads,
		handleUploadStartNotice,
		handleError,
		handleSuccess,
	})

	useEffect(() => {
		if(!setIsAddCardActive || !photoItems) return;
		const activeItem = photoItems?.[activeRealIndex];
		const hasId = itemIds.some((i)=> activeItem?.profileImageId === i)
		setIsAddCardActive(!hasId);
	
	}, [activeRealIndex, setIsAddCardActive, itemIds, photoItems]);



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
					if(swiperRef){
						swiperRef.current = swiper

					}
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
