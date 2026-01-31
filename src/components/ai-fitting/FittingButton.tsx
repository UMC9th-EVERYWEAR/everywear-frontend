import type { FittingStateStatus } from '@/src/types/ai-fitting/status';
import ButtonLayout from './ButtonLayout';

interface FittingButtonProps {
    state: FittingStateStatus;
    onStart: () => void;    // 피팅 시작
	onRestart: () => void;
    onDownload: () => void; // 다운로드
}

const FittingButton = ({ state, onStart, onDownload, onRestart } : FittingButtonProps) => {
	return (
		<>
			{/* 1. IDLE 상태: 피팅 시작 버튼 */}
			{state === 'idle' && (
				<ButtonLayout
					content='AI 피팅하기'
					className='bg-primary-600 text-white hover:bg-primary-700 transition-colors'
					onClick={onStart} // 부모의 handleStartFitting 실행
				/>
			)}
            
			{/* 2. SUCCESS/LOADING/ERROR 상태 */}
			{state !== 'idle' && (
				<div className='flex flex-col mt-5 gap-5'>
					{/* 재생성 버튼 */}
					<ButtonLayout
						content='재생성하기'
						className={state === 'success' ? 'border-primary-600 text-primary-600' : 'border-neutral-400 text-neutral-400'}
						// 로딩 중에는 클릭 방지 등의 로직을 추가할 수도 있음
						onClick={state === 'loading' ? undefined : onRestart}
						disabled={state === 'loading'}
					/>
                    
					{/* 다운로드 버튼 */}
					<ButtonLayout
						content='다운로드하기'
						className={state === 'success' ? 'bg-primary-600 text-white hover:bg-primary-700 transition-colors' : 'bg-neutral-400 text-white'}
						onClick={state === 'success' ? onDownload : undefined}
						disabled={state === 'loading'}
					/>
				</div>
			)}
		</>
	)
}

export default FittingButton;
