import type { ListDTO } from '@/src/apis/generated';
import { AI_FITTING_IMAGES } from '@/src/constants/images';

interface FittingItemInfoProps {
    data: ListDTO | null | undefined
    handleHeart: () => void;
    handleBuy: () => void;
}

const FittingItemInfo = ({ data, handleHeart, handleBuy }: FittingItemInfoProps) => {
	return (
		<div className='border rounded-xl border-neutral-200 border-solid px-2.5 py-1.5 flex mb-2.5 gap-4'>

			{/* flex-shrink-0: 텍스트가 길어져도 이미지 영역이 찌그러지지 않게 고정 */}
			{/* w-20: 너비를 고정 (약 80px) */}
			<div className='flex shrink-0 w- py-0.75'>
				<img
					// object-cover: 이미지 비율을 유지하면서 영역을 꽉 채움 (넘치는 부분은 잘림)
					className='border-none rounded-[10px] w-full h-22 object-cover'
					src={data?.product_img_url}
					alt='피팅상품이미지'
				/>
			</div>

			{/* 3. 피팅 상품 정보 영역 */}
			<div className='flex flex-col w-full'>
                
				<div className='flex flex-col'> 
					{/* 쇼핑몰 정보 & 별점 */}
					<div className='flex justify-between items-center'>
						<p className='text-fitting-company text-regular-12'>{data?.shoppingmale_name}</p>
						<div className='flex items-center gap-0.5'>
							<img
								className='h-4 w-4'
								src={AI_FITTING_IMAGES.FITTING_CARD_STAR}
								alt='피팅 상품 별점'
							/>
							<p className='text-neutral-900 text-regular-12'>{data?.star_point}</p>
						</div>
					</div>
					{/* 피팅 상품 이름 */}
					<p className='text-neutral-900 text-regular-14 text-left line-clamp-1'>{data?.product_name}</p>
					{/* 피팅 상품 가격 */}
					<p className='text-neutral-900 text-regular-14 text-left'>{data?.price}</p>
				</div>

				{/* 하단 버튼 그룹 */}
				<div className='flex justify-between gap-3'>
					<button
						className='flex flex-1 py-1.5 bg-primary-600 border rounded-[10px] 
                        justify-center text-neutral-50 text-regular-16 cursor-pointer hover:bg-primary-700 transition-colors'
						onClick={handleBuy}
					>
						구매하기
					</button>
					<div className='flex items-center'>
						<button
							onClick={handleHeart}
							className='cursor-pointer p-1'
						>
							{data?.is_liked ? (
								<img
									src={AI_FITTING_IMAGES.FITTING_CARD_HEART_FILL}
									alt='내 옷장 저장'
								/>
							) : (
								<img
									src={AI_FITTING_IMAGES.FITTING_CARD_HEART}
									alt='내 옷장 저장 X'
								/>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FittingItemInfo;
