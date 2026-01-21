import clsx from 'clsx';
import { useState } from 'react';
import FittingCardImgExample from '@/public/Ai-Fitting/FittingCardImgExample.svg'
import FittingCardStar from '@/public/Ai-Fitting/FittingCardStar.svg'
import FittingCardHeart from '@/public/Ai-Fitting/FittingCardHeart.svg'
import FittingCardHeartFill from '@/public/Ai-Fitting/FittingCardHeartFill.svg'



const AiFittingPage = () => {
	const [isAiFitting, setIsAiFitting] = useState(0);
	const [isHearted, setIsHearted] = useState(0);
	const handleTabBar = () => {
		setIsAiFitting((prev) => prev ? 0 : 1)
	}
	const handleHeart = () => {
		setIsHearted((prev) => prev ? 0 : 1)
	}

	return (
		<div className="flex flex-col px-4 h-full w-full">
			
			{/* 탭바 메뉴 */}
			<div className="relative flex border-b border-neutral-200 mb-[5px]"> 
				{/* AI 피팅 버튼 */}
				<button
					className={clsx(
						'text-base flex-1 h-11 flex items-center justify-center p-2.5  transition-all duration-300', 
						!isAiFitting ? 'text-primary-600' :
							'text-neutral-400')}
					onClick={handleTabBar}
				>AI 피팅</button>

				{/* AI 리뷰 버튼 */}
				<button
					className={clsx(
						'text-base flex-1 h-11 flex items-center justify-center p-2.5  transition-all duration-300', 
						isAiFitting ? 'text-primary-600' :
							'text-neutral-400')}
					onClick={handleTabBar}
				>AI 리뷰</button>

				{/* 버튼 밑 밑줄 이동(슬라이딩 인디케이터) */}
				<div
					className={clsx(
						'absolute bottom-0 left-0 h-0.5 w-1/2 bg-primary-600', 
						'transition-transform duration-200 ease-in-out', // ease-in-out : 가속/감속 효과
						isAiFitting === 1 ? 'translate-x-full' : 'translate-x-0', // 위치 이동
					)}
				/>
			</div>

			<div className='border rounded-xl border-neutral-200 border-solid h-25.75 px-[10px] py-[6px] flex'>
				
				{/* 피팅 상품 이미지 */}
				<div className='flex items-center h-full py-[3px] mr-[16px]'>
					<img
						className='border rounded-[10px] h-[85px] max-w-20'
						src={FittingCardImgExample}
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
						<div className='w-[201px] p-[4px] bg-primary-600 border rounded-[10px] flex justify-center text-neutral-50 text-regular-16'>
							구매하기
						</div>
						<div className='flex items-center '>
							<button onClick={handleHeart}>
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
		</div>
	)
}

export default AiFittingPage;
