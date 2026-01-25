import { LoadingSpinner } from './LoadingSpinner';

interface AiFittingFrameProps {
    isFittingStarted : boolean;
    isFittingPending : boolean;
    type : 'BEFORE' | 'AFTER';
    imgUrl : string;
}

const AiFittingFrame = ({ isFittingPending, type, imgUrl } : AiFittingFrameProps) => {
	return (
		<div
			className="px-[10px] py-[20px] border rounded-xl border-solid
         border-neutral-200 h-[464px] w-[343px] flex flex-col"
		>
			<div
				className="px-[4px] py-[10px] border rounded-[999px] border-primary-600 
            h-[32px] w-[77px] flex justify-center items-center text-primary-600 text-medium-16 mb-2"
			>{type}</div>

			<div className="h-[384px] border border-none rounded-xl flex flex-col justify-center">
				{!isFittingPending ? <img
					src={imgUrl}
					alt='피팅 전/후 이미지'
				                     /> : <div className='h-[116px] w-full flex flex-col justify-between items-center'>
					<span className='text-regular-16 text-neutral-900'>가상 피팅을 진행중입니다.</span>
					<LoadingSpinner size={15}/>
				</div>}

			</div>
      
		</div>
	)
}

export default AiFittingFrame;
