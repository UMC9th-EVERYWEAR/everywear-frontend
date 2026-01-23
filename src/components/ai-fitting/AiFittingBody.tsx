import AiFittingFrame from './AiFittingFrame';

interface AiFittingBodyProps {
    isFittingFetching: boolean;
    isFittingPending: boolean;
    imageUrlExample: string;
    handleFittingStarted: () => void;
}

const AiFittingBody = ({ isFittingFetching, isFittingPending, imageUrlExample, handleFittingStarted } : AiFittingBodyProps) => {
	return (
		<>
			{!isFittingFetching && 
			<div
				className='w-full flex flex-col items-center justify-between mb-[34px] h-[541px]'
			>
				{/* 피팅 전 사진(before) & 사진 변경하기 버튼*/}
				<div className='h-[473px] w-full px-[10px] py-[16px] flex flex-col items-center border rounded-xl border-neutral-200 justify-between'>
					{/* 피팅 전 사진 */}
					<img
						className='border border-none rounded-xl h-[384.754px] w-[323px] flex items-center'
						src={imageUrlExample}
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

			{isFittingFetching && 
			<div className='w-full flex flex-col items-center justify-between mb-[34px] h-[1096px]'> 
				{/* 피팅 로딩중 & before & after 피팅 사진 및 로딩 스피너 */}
				<div className='h-[948px] flex flex-col justify-between'>
					<AiFittingFrame
						isFittingStarted={true}
						isFittingPending={isFittingPending}
						imgUrl={imageUrlExample}
						type='BEFORE'
					/>
					<AiFittingFrame
						isFittingStarted={true}
						isFittingPending={true}
						imgUrl={imageUrlExample}
						type='AFTER'
					/>
				</div>
				<div className='h-[108px] w-full flex flex-col justify-between items-center'>
					<button
						className='h-11 border border-neutral-400 rounded-[10px] 
						border-solid flex justify-center items-center text-regular-16
						 w-[343px] p-[10px] text-neutral-400 cursor-pointer'
					>재생성하기</button>
					<button
						className='h-11 border borner-none bg-neutral-400 
						rounded-[10px] flex justify-center items-center text-regular-16 
						w-[343px] p-[10px] text-neutral-50 cursor-pointer'
					>다운로드하기</button>

				</div>
			</div>}
		</>
	)
}

export default AiFittingBody
