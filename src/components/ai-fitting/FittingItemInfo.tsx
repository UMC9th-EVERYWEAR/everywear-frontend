import type { ListDTO } from '@/src/apis/generated';
import { AI_FITTING_IMAGES } from '@/src/constants/images';
import { useState } from 'react';

interface FittingItemInfoProps {
    data: ListDTO | null | undefined
    handleHeart: (current: boolean) => void;
    handleBuy: () => void;
}

const FittingItemInfo = ({ data, handleHeart, handleBuy }: FittingItemInfoProps) => {
	const [isLiked, setIsLiked] = useState(data?.is_liked ?? false);

	const onHeartClick = () => {
		const nextStatus = !isLiked;
		setIsLiked(nextStatus);
		handleHeart(nextStatus);
	};

	return (
	/* ✅ 배경: bg-white -> dark:bg-neutral-800 (짙은 회색)
           ✅ 테두리: border-neutral-200 -> dark:border-neutral-700
        */
		<div className='border rounded-xl border-neutral-200 dark:border-neutral-700 border-solid px-2.5 py-1.5 flex mb-2.5 gap-4 bg-white dark:bg-neutral-800 shadow-sm transition-colors duration-300'>

			<div className='flex shrink-0 w-20 py-0.75'>
				<img
					className='border-none rounded-[10px] w-full h-22 object-cover'
					src={data?.product_img_url}
					alt='피팅상품이미지'
				/>
			</div>

			<div className='flex flex-col w-full'>
				<div className='flex flex-col'> 
					<div className='flex justify-between items-center'>
						{/* ✅ 쇼핑몰명: dark:text-neutral-400 */}
						<p className='text-neutral-600 dark:text-neutral-400 text-regular-12'>{data?.shoppingmale_name}</p>
						<div className='flex items-center gap-0.5'>
							<img
								className='h-4 w-4'
								src={AI_FITTING_IMAGES.FITTING_CARD_STAR}
								alt='별점'
							/>
							<p className='text-neutral-900 dark:text-neutral-200 text-regular-12'>{data?.star_point}</p>
						</div>
					</div>
					{/* ✅ 상품명/가격: dark:text-white */}
					<p className='text-neutral-900 dark:text-white text-regular-14 text-left line-clamp-1 font-medium'>{data?.product_name}</p>
					<p className='text-neutral-900 dark:text-white text-regular-14 text-left font-bold'>{data?.price}</p>
				</div>

				<div className='flex justify-between gap-3 mt-1'>
					<button
						className='flex flex-1 py-1.5 bg-primary-600 border border-transparent rounded-[10px] 
                        justify-center text-white text-regular-14 cursor-pointer hover:bg-primary-700 transition-colors'
						onClick={handleBuy}
					>
						구매하기
					</button>
					<div className='flex items-center'>
						<button
							onClick={onHeartClick}
							className='cursor-pointer p-1 active:scale-90 transition-transform'
						>
							<img
								src={isLiked ? AI_FITTING_IMAGES.FITTING_CARD_HEART_FILL : AI_FITTING_IMAGES.FITTING_CARD_HEART}
								alt='찜'
								className="w-6 h-6"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FittingItemInfo;
