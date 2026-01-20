import dummy from '@/public/svgs/dummyphoto.jpeg';
import plusIcon from '@/public/svgs/plus-icon.svg';
import type { PhotoItem } from '@/src/types/schemas/setting/setting-photo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';

interface BannerProps {
	setHasImage: (hasImage: boolean) => void;
	photoItems: PhotoItem[];
}

const Banner = ({ setHasImage , photoItems }: BannerProps) => {


	  const [activeRealIndex, setActiveRealIndex] = useState(0);

	useEffect(() => {
		// 사진이 하나라도 있으면 true, 없으면 false
		const hasImage = photoItems[activeRealIndex].imageUrl !== '';
		setHasImage(hasImage);
	}, [setHasImage, activeRealIndex, photoItems]);


	// slide 안에 들어갈 컨텐츠 결정 함수 (추천 네이밍)
	const renderPhotoSlideContent = (item: PhotoItem) => {
		// 이미지 없으면 => 추가 카드
		if (!item.imageUrl) {
			return (
				<button
					type="button"
					className=" aspect-square rounded-lg w-full h-full  bg-neutral-50 flex items-center justify-center"
				>
					<img
						src={plusIcon}
						alt="add"
						className=''
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
			{photoItems.map((item, idx) => (
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
