import type { FittingState } from '@/src/types/ai-fitting/status';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/src/utils/cn';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';
import { useCallback } from 'react';

export type ImgType = 'BEFORE' | 'AFTER';

interface FittingFrameProps {
    type?: ImgType;
    imgUrl?: string;
	state: FittingState;
}

const FittingFrame = ({ type = 'BEFORE', imgUrl, state }: FittingFrameProps) => {
	const navigate = useNavigate();

	const handleChangeProfileImg = useCallback(() => {
		navigate(PATH.SETTING.CHANGE_PHOTO);
	}, [navigate]);

	return (
		<div
			className="w-full px-2.5 py-4 border rounded-xl border-neutral-200 
		 flex flex-col bg-white items-center gap-2"
		>
			{state.status !== 'idle' && 
			<div className={cn('flex justify-start w-full')}>
				<div
					className={cn('px-1 py-2.5 border rounded-full border-primary-600 \
						h-8 w-[77px] flex justify-center items-center text-medium-16 \
						text-primary-600')}
				>
					{type}
				</div>
			</div>
			}

			<div className="w-full border-none rounded-xl flex flex-col justify-center items-center overflow-hidden gap-2">
				<div className="flex flex-col justify-center items-center gap-4 h-121">
					{state.status === 'loading' && type === 'AFTER' ? (
						<>
							<span className="text-regular-16 text-neutral-900">
								가상 피팅을 진행중입니다.
							</span>
							<LoadingSpinner size={10} />
						</>
					) : state.status === 'error' && type === 'AFTER' ? (
						<span className="text-regular-16 text-neutral-900">
							피팅 이미지 생성에 실패했습니다.
						</span>
					) : (
						imgUrl && (
							<img
								src={imgUrl}
								alt={`피팅 ${type} 이미지`}
								className="w-full h-full object-cover border-none rounded-xl"
							/>
						)
					)}
				</div>

				{state.status === 'idle' && (
					<button
						className={cn('w-[50%] p-2.5 flex justify-center items-center border\
						 rounded-[10px] border-primary-600 text-regular-16\
						 cursor-pointer text-primary-600')}
						 onClick={handleChangeProfileImg}
					>
						사진 변경하기
					</button>
				)}
			</div>
		</div>
	);
};

export default FittingFrame;
