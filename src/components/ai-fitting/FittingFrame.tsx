import type { FittingState } from '@/src/types/ai-fitting/status';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/src/utils/cn';

export type ImgType = 'BEFORE' | 'AFTER';

interface FittingFrameProps {
    type?: ImgType;
    imgUrl?: string;
	state: FittingState;
}

const FittingFrame = ({ type = 'BEFORE', imgUrl, state }: FittingFrameProps) => {
	return (
		<div
			className="w-full h-[464px] px-2.5 py-4 border rounded-xl border-solid border-neutral-200 
		 flex flex-col bg-white items-center gap-2"
		>
			{state.status !== 'idle' && 
			<div className={cn('flex justify-start w-full')}>
				{/* BEFORE / AFTER(idle 상태에서는 타입 표시 X) */}
				<div
					className={cn('px-1 py-2.5 border rounded-full border-primary-600 \
						h-[32px] w-[77px] flex justify-center items-center text-medium-16 \
						text-primary-600')}
				>
					{type}
				</div>
			</div>
			}

			{/* 이미지 본문 */}
			<div className="w-full border h-full border-none rounded-xl flex flex-col justify-center items-center overflow-hidden gap-3">
				{state.status === 'loading' && type === 'AFTER' ? (
					<div className="flex flex-col justify-center items-center gap-4">
						<span className="text-regular-16 text-neutral-900">
							가상 피팅을 진행중입니다.
						</span>
						<LoadingSpinner size={10} />
					</div>
				) : (
					
					<img
						src={imgUrl}
						alt={`피팅 ${type} 이미지`}
						className="w-fit object-cover"
					/>
				)}
				{state.status === 'idle' && imgUrl && (
					<button
						className='w-[50%] p-2.5 flex justify-center items-center border 
						rounded-[10px] border-solid border-primary-600 font-anonymous 
						text-regular-16 cursor-pointer'
					>
						사진 변경하기
					</button>
				)}
			</div>
		</div>
	);
};

export default FittingFrame;
