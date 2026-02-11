import type { FittingState } from '@/src/types/ai-fitting/status';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/src/utils/cn';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';

export type ImgType = 'BEFORE' | 'AFTER';

interface FittingFrameProps {
    type?: ImgType;
    imgUrl?: string;
    state: FittingState;
}

const FittingFrame = ({ type = 'BEFORE', imgUrl, state }: FittingFrameProps) => {
	const navigate = useNavigate();

	const handleChangeProfileImg = () => {
		navigate(PATH.SETTING.CHANGE_PHOTO);
	}

	return (
	/* ✅ 1. bg-white -> dark:bg-neutral-800 (회색 카드 배경)
           ✅ 2. border-neutral-200 -> dark:border-neutral-700
        */
		<div
			className={cn(
				'w-full px-2.5 py-4 border rounded-xl border-neutral-200 dark:border-neutral-700',
				'flex flex-col bg-white dark:bg-neutral-800 items-center gap-2 transition-colors duration-300',
			)}
		>
			{state.status !== 'idle' && 
			<div className={cn('flex justify-start w-full')}>
				{/* BEFORE / AFTER 라벨 */}
				<div
					className={cn(
            			'px-1 py-2.5 border rounded-full border-primary-600 h-8 w-[77px]',
            			'flex justify-center items-center text-medium-16 text-primary-600',
            			'dark:border-primary-400 dark:text-primary-400', // ✅ 다크모드 시 라벨 색상 살짝 밝게
            		)}
				>
					{type}
				</div>
			</div>
			}

			{/* 이미지 본문 */}
			<div className="w-full border-none rounded-xl flex flex-col justify-center items-center overflow-hidden gap-2">
				{state.status === 'loading' && type === 'AFTER' ? (
					<div className="flex flex-col justify-center items-center gap-4 h-121">
						{/* ✅ 로딩 텍스트: dark:text-neutral-200 */}
						<span className="text-regular-16 text-neutral-900 dark:text-neutral-200">
							가상 피팅을 진행중입니다.
						</span>
						<LoadingSpinner size={10} />
					</div>
				) : state.status === 'error' && type === 'AFTER' ? (
					<div className="flex flex-col justify-center items-center gap-4 h-121">
						{/* ✅ 에러 텍스트: dark:text-neutral-200 */}
						<span className="text-regular-16 text-neutral-900 dark:text-neutral-200">
							피팅 이미지 생성에 실패했습니다.
						</span>
					</div>
				) : (
					imgUrl && (
						<img
							src={imgUrl}
							alt={`피팅 ${type} 이미지`}
							className="w-full h-full object-cover"
						/>
					)
				)}
                
				{state.status === 'idle' && (
					<button
						className={cn(
							'w-[50%] p-2.5 flex justify-center items-center border',
							'rounded-[10px] border-primary-600 text-regular-16',
							'cursor-pointer text-primary-600 transition-all active:scale-95',
							'dark:border-primary-400 dark:text-primary-400', // ✅ 버튼 테두리/글자색 대응
						)}
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
