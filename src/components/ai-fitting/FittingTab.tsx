import type { FittingState } from '@/src/types/ai-fitting/status';
import FittingFrame from './FittingFrame';
import type { FittingData } from '@/src/types/ai-fitting/data';
import ButtonLayout from './ButtonLayout';
import { fileDownload } from '@/src/utils/fileDownload';

interface FittingTabProps {
    state: FittingState;
    handleStartFitting: () => void; 
	handleRestartFitting: () => void;
	showRestart?: boolean;
}

const FittingTab = ({ state, handleStartFitting, handleRestartFitting, showRestart = true }: FittingTabProps) => {
	// 목데이터
	const imageUrlExample : FittingData = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI';

	// 피팅결과 이미지 다운로드
	const handleDownload = () => {
		if (state.status === 'success' && state.resultUrl) {
			fileDownload(state.resultUrl);
		}
	};

	// 가독성을 위한 상태 변수
	const isIdle = state.status === 'idle';
	const isLoading = state.status === 'loading';
	const isSuccess = state.status === 'success';

	return (
		<div
			className='flex flex-col gap-4'
		>
			<div className='flex flex-col gap-5'>
				{/* idle 상태 */}
				{isIdle && (
					<FittingFrame
						state={state}
						imgUrl={imageUrlExample}
						type='BEFORE' 
					/>
				)}

				{/* Loading 또는 Success 상태 */}
				{!isIdle && (
					<>  
						<FittingFrame
							state={state}
							imgUrl={imageUrlExample}
							type='BEFORE'
						/>
						<FittingFrame
							state={state}
							type='AFTER'
							imgUrl={state.status === 'success' ? state.resultUrl : undefined}
							
						/>
					</>
				)}
			</div>
            
			{/* 1. 피팅 시작 버튼 (IDLE 상태일 때만 노출) */}
			{isIdle && (
				<ButtonLayout
					content='AI 피팅하기'
					variant='primary'
					onClick={handleStartFitting}
				/>
			)}

			{!isIdle && (
				<div className='flex flex-col mt-5 gap-5'>
					{showRestart && (
						<ButtonLayout
							content='재생성하기'
							variant={isSuccess ? 'outline' : 'outline-secondary'}
							onClick={handleRestartFitting}
							disabled={isLoading}
						/>
					)}
					{/* 다운로드하기 버튼 */}
					<ButtonLayout
						content='다운로드하기'
						variant={isSuccess ? 'primary' : 'secondary'}
						onClick={handleDownload}
						disabled={!isSuccess}
					/>
				</div>
			)}
			
            
			
		</div>
	);
};

export default FittingTab;
