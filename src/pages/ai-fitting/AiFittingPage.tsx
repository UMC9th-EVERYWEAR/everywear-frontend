import clsx from 'clsx';
import { useState } from 'react';
import FittingCardImgExample from '@/public/Ai-Fitting/FittingCardImgExample.svg'
import FittingCardStar from '@/public/Ai-Fitting/FittingCardStar.svg'
import FittingCardHeart from '@/public/Ai-Fitting/FittingCardHeart.svg'
import FittingCardHeartFill from '@/public/Ai-Fitting/FittingCardHeartFill.svg'
import AiFittingFrame from '@/src/components/ai-fitting/AiFittingFrame';



const AiFittingPage = () => {

	// 목데이터
	const imgaeUrlExample = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI'

	const [isAiFitting, setIsAiFitting] = useState(0);
	const [isHearted, setIsHearted] = useState(0);
	const [isFittingStarted, setIsFittingStarted] = useState(false);
	const [isFittingPending, setIsFittingPending] = useState(false);
	const [isReviewPending, setIsReviewPending] = useState(false);
	
	const handleTabBar = () => {
		setIsAiFitting((prev) => prev ? 0 : 1)
	}
	const handleHeart = () => {
		setIsHearted((prev) => prev ? 0 : 1)
	}
	const handleFittingStarted = () => {
		setIsFittingStarted((prev) => prev? false : true)
	}
	const handleFittingPending = () => {
		setIsFittingPending((prev) => prev? false : true)
	}

	return (
		<div className="flex flex-col px-4 h-full w-full">
			
			{/* 탭바 메뉴 */}
			<div className="relative flex border-b border-neutral-200 mb-[5px]"> 
				{/* AI 피팅 버튼 */}
				<button
					className={clsx(
						'text-base flex-1 h-11 flex items-center justify-center p-2.5  transition-all duration-300 cursor-pointer', 
						!isAiFitting ? 'text-primary-600' :
							'text-neutral-400')}
					onClick={handleTabBar}
				>AI 피팅</button>

				{/* AI 리뷰 버튼 */}
				<button
					className={clsx(
						'text-base flex-1 h-11 flex items-center justify-center p-2.5  transition-all duration-300 cursor-pointer', 
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
			{/* 피팅 상품 정보(FittingItemInfo) */}
			<div className='border rounded-xl border-neutral-200 border-solid h-25.75 px-[10px] py-[6px] flex mb-[10px]'>
				
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
			{!isFittingStarted && 
			<div
				className='w-full flex flex-col items-center justify-between mb-[34px] h-[541px]'
			>
				{/* 피팅 전 사진(before) & 사진 변경하기 버튼*/}
				<div className='h-[473px] w-full px-[10px] py-[16px] flex flex-col items-center border rounded-xl border-neutral-200 justify-between'>
					{/* 피팅 전 사진 */}
					<img
						className='border border-none rounded-xl h-[384.754px] w-[323px] flex items-center'
						src={imgaeUrlExample}
						alt='피팅 전 사진'
					/>

					{/* 사진 변경하기 버튼 */}
					<button
						className='w-[164px] h-[44px] p-[10px] border rounded-[10px] 
                border-solid border-primary-600 flex justify-center items-center text-primary-600 cursor-pointer'
					>
						사진 변경하기
					</button>

				</div>

				{/* AI 피팅하기 버튼 */}
				<button
					className='p-[10px] w-[343px] h-[48px] flex justify-center items-center
                 bg-primary-600 border rounded-[10px] text-regular-16 text-[#F0F2F7] cursor-pointer'
					onClick={handleFittingStarted}
				>AI 피팅하기</button>
			</div>}

			{isFittingStarted && 
			<div className='w-full flex flex-col items-center justify-between mb-[34px] h-[1096px]'> 
				{/* 피팅 로딩중 & before & after 피팅 사진 및 로딩 스피너 */}
				<div className='h-[948px] flex flex-col justify-between'>
					<AiFittingFrame
						isFittingStarted={true}
						isFittingPending={isFittingPending}
						imgUrl={imgaeUrlExample}
						type='BEFORE'
					/>
					<AiFittingFrame
						isFittingStarted={true}
						isFittingPending={true}
						imgUrl={imgaeUrlExample}
						type='AFTER'
					/>
				</div>
				<div className='h-[108px] w-full flex flex-col justify-between items-center'>
					<button
						className='h-11 border border-neutral-400 rounded-[10px] 
						border-solid flex justify-center items-center text-regular-16
						 w-[343px] p-[10px] text-neutral-400'
					>재생성하기</button>
					<button
						className='h-11 border borner-none bg-neutral-400 
						rounded-[10px] flex justify-center items-center text-regular-16 
						w-[343px] p-[10px] text-neutral-50'
					>다운로드하기</button>

				</div>
			</div>}
		</div>
	)
}

export default AiFittingPage;
