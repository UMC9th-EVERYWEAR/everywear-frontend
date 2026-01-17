import dummy from '@/public/svgs/dummyphoto.jpeg';
import type { PhotoItem } from '@/src/types/schemas/setting/setting-photo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const Banner = () => {

	// 더미 데이터
	const PHOTO_ITEMS_DUMMY: PhotoItem[] = [
		{ isDefault: true, imageUrl: dummy },
		{ isDefault: false, imageUrl: dummy },
		{ isDefault: false, imageUrl: dummy },
		{ isDefault: false, imageUrl: dummy },
		{ isDefault: false, imageUrl: '' }, // ✅ 이미지 없음 => AddCard 렌더링
	];

	  const [activeRealIndex, setActiveRealIndex] = useState(0);


	// slide 안에 들어갈 컨텐츠 결정 함수 (추천 네이밍)
	const renderPhotoSlideContent = (item: PhotoItem) => {
		// 이미지 없으면 => 추가 카드
		if (!item.imageUrl) {
			return (
				<button
					type="button"
					className=" aspect-square rounded-lg border border-neutral-200 flex items-center justify-center"
				>
					<img
						src={dummy}
						alt="add"
						className='rounded'
					/>
				</button>
			);
		}

		// 이미지 있으면 => 이미지 카드
		return (
			<div className="relative w-full h-full aspect-square rounded-lg overflow-hidden">
				<img
					src={item.imageUrl}
					alt="card"
					className={cn('w-full h-full object-cover rounded-lg overflow-hidden',
						item.isDefault ? 'border-4 border-primary-600' : '',
					)}
				/>


			</div>
		);
	};

	return (
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
			   onSwiper={(swiper) => setActiveRealIndex(swiper.realIndex)}
			onSlideChange={(swiper) => setActiveRealIndex(swiper.realIndex)}
			loop
		>
			{PHOTO_ITEMS_DUMMY.map((item, idx) => (
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
							{renderPhotoSlideContent(item)}
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Banner;
