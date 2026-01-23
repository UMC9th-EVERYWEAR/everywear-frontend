import FittingCardStar from '@/public/Ai-Fitting/FittingCardStar.svg'
import FittingCardHeart from '@/public/Ai-Fitting/FittingCardHeart.svg'
import FittingCardHeartFill from '@/public/Ai-Fitting/FittingCardHeartFill.svg'

interface FittingItemInfoProps {
    itemImgUrl : string;
    isHearted : boolean;
    handleHeart : () => void;

}

const FittingItemInfo = ({ itemImgUrl, isHearted, handleHeart } : FittingItemInfoProps) =>  {
	return (
		<div className='border rounded-xl border-neutral-200 border-solid h-25.75 px-[10px] py-[6px] flex mb-[10px]'>
				
			{/* 피팅 상품 이미지 */}
			<div className='flex items-center h-full py-[3px] mr-[16px]'>
				<img
					className='border rounded-[10px] h-[85px] max-w-20'
					src={itemImgUrl}
					alt='피팅상품이미지'
				/>

			</div>

			{/* 피팅 상품 정보 */}
			<div className='flex flex-col w-full font-normal'>
				{/* 쇼핑몰 정보 & 별점 */}
				<div className='flex justify-between'>
					<p className='flex text-[#767676] text-regular-12'>무신사</p>
					<div className='flex items-center'>
						<img
							className='h-[14px] w-[14px]'
							src={FittingCardStar}
							alt='피팅 상품 별점'
						/>
						<p className='text-neutral-900 text-regular-12'>4.7</p>
					</div>

				</div>
				{/* 피팅 상품 이름 */}
				<p className='text-neutral-900 text-regular-14 flex justify-start'>베이직 화이트 티셔츠</p>
				{/* 피팅 상품 가격 */}
				<p className='text-neutral-900 text-regular-14 flex justify-start'>29,000원</p>

				{/* 구매하기 & 내 옷장 저장(하트) 버튼 */}
				<div className='flex justify-between'>
					<button
						className='w-[201px] p-[4px] bg-primary-600 border rounded-[10px] 
                        flex justify-center text-neutral-50 text-regular-16 cursor-pointer'
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
