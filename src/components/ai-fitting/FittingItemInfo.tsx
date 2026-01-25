import FittingCardStar from '@/public/ai-fitting/FittingCardStar.svg'
import FittingCardHeart from '@/public/ai-fitting/FittingCardHeart.svg'
import FittingCardHeartFill from '@/public/ai-fitting/FittingCardHeartFill.svg'

interface FittingItemInfoProps {
    data: ItemData
    isHearted : boolean;
    handleHeart : () => void;

}

export interface ItemData {
	company: string,
	rating: number,
	title: string,
	price: number,
	imgUrl: string,
	buyUrl : string,
}


const FittingItemInfo = ({ data, isHearted, handleHeart } : FittingItemInfoProps) =>  {
	return (
		<div className='border rounded-xl border-neutral-200 border-solid h-25.75 px-[10px] py-[6px] flex mb-[10px]'>
				
			{/* 피팅 상품 이미지 */}
			<div className='flex items-center h-full py-[3px] mr-[16px]'>
				<img
					className='border rounded-[10px] h-[85px] max-w-20'
					src={data.imgUrl}
					alt='피팅상품이미지'
				/>

			</div>

			{/* 피팅 상품 정보 */}
			<div className='flex flex-col w-full font-normal'>
				{/* 쇼핑몰 정보 & 별점 */}
				<div className='flex justify-between'>
					<p className='flex text-[#767676] text-regular-12 font-anonymous'>{data.company}</p>
					<div className='flex items-center'>
						<img
							className='h-[14px] w-[14px]'
							src={FittingCardStar}
							alt='피팅 상품 별점'
						/>
						<p className='text-neutral-900 text-regular-12 font-anonymous'>{data.rating}</p>
					</div>

				</div>
				{/* 피팅 상품 이름 */}
				<p className='text-neutral-900 text-regular-14 flex justify-start'>{data.title}</p>
				{/* 피팅 상품 가격 */}
				<p className='text-neutral-900 text-regular-14 flex justify-start font-anonymous'>{data.price}원</p>

				{/* 구매하기 & 내 옷장 저장(하트) 버튼 */}
				<div className='flex justify-between gap-3'>
					<button
						className='flex flex-1 p-[4px] bg-primary-600 border rounded-[10px] 
                        justify-center text-neutral-50 text-regular-16 cursor-pointer font-anonymous'
					>
						구매하기
					</button>
					<div className='flex items-center '>
						<button
							onClick={handleHeart}
							className='cursor-pointer'
						>
							{isHearted ? <img
								src={FittingCardHeartFill}
								alt='내 옷장 저장'
							             /> : <img
								src={FittingCardHeart}
								alt='내 옷장 저장 X'
							                  />}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FittingItemInfo;
