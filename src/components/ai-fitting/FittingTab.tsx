import type { FittingState } from '@/src/types/ai-fitting/status';
import FittingFrame from './FittingFrame';
import ButtonLayout from './ButtonLayout';
import { fileDownload } from '@/src/utils/fileDownload';

interface FittingTabProps {
	profileImg? : string;
    state: FittingState;
    handleStartFitting: () => void; 
	handleRestartFitting: () => void;
}

const FittingTab = ({ profileImg = '', state, handleStartFitting, handleRestartFitting }: FittingTabProps) => {
	
	const handleDownload = () => {
		if (state.status === 'success' && state.resultUrl) {
			fileDownload(state.resultUrl);
		}
	};

	const isIdle = state.status === 'idle';
	const isLoading = state.status === 'loading';
	const isSuccess = state.status === 'success';

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-5'>
				{isIdle && (
					<FittingFrame
						state={state}
						imgUrl={profileImg}
						type='BEFORE' 
					/>
				)}
				{!isIdle && (
					<>  
						<FittingFrame
							state={state}
							imgUrl={profileImg}
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
			{isIdle && (
				<ButtonLayout
					content='AI 피팅하기'
					variant='primary'
					onClick={handleStartFitting}
				/>
			)}
			{!isIdle && (
				<div className='flex flex-col mt-5 gap-5'>
					<ButtonLayout
						content='재생성하기'
						variant={isSuccess ? 'outline' : 'outline-secondary'}
						onClick={handleRestartFitting}
						disabled={isLoading} 
					/>
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
