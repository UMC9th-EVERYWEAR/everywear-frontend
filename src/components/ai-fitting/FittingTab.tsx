import type { FittingState } from '@/src/types/ai-fitting/status';
import FittingFrame from './FittingFrame';
import ButtonLayout from './ButtonLayout';
import { fileDownload } from '@/src/utils/fileDownload';

interface FittingTabProps {
    state: FittingState;
    profileImg?: string;
    handleStartFitting: () => void; 
    handleRestartFitting: () => void;
    showRestart?: boolean;
    showBefore?: boolean; 
}

const FittingTab = ({ 
	state, 
	profileImg,
	handleStartFitting, 
	handleRestartFitting, 
	showRestart = true,
	showBefore = true, 
}: FittingTabProps) => {

	const handleDownload = () => {
		if (state.status === 'success' && state.resultUrl) {
			fileDownload(state.resultUrl, 'download');
		}
	};

	const isIdle = state.status === 'idle';
	const isLoading = state.status === 'loading';
	const isSuccess = state.status === 'success';

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-5'>
				{showBefore && (
					<FittingFrame
						state={state}
						imgUrl={profileImg}
						type='BEFORE' 
					/>
				)}
				{!isIdle && (
					<FittingFrame
						state={state}
						type='AFTER'
						imgUrl={isSuccess ? state.resultUrl : undefined}
					/>
				)}
			</div>
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
					<ButtonLayout
						content='다운로드하기'
						variant={isSuccess ? 'primary' : 'secondary'}
						onClick={handleDownload}
						disabled={!isSuccess} 
					/>
				</div>
			)}
			{isIdle && (
				<ButtonLayout
					content='AI 피팅하기'
					variant='primary'
					onClick={handleStartFitting}
				/>
			)}
		</div>
	);
};

export default FittingTab;
