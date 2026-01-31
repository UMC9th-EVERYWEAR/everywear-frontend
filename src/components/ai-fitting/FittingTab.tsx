import type { FittingState } from '@/src/types/ai-fitting/status';
import FittingFrame from './FittingFrame';
import FittingButton from './FittingButton';
import type { FittingData } from '@/src/types/ai-fitting/data';

interface FittingTabProps {
    state: FittingState;
    handleStartFitting: () => void; 
	handleRestartFitting: () => void;
}

const FittingTab = ({ state, handleStartFitting, handleRestartFitting }: FittingTabProps) => {
	// 목데이터
	const imageUrlExample : FittingData = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI';

	// 다운로드 핸들러
	// 부모에서 만들고 넘겨줘야 하지만 임시로 이렇게 설정
	// 나중에 api 연결 후에 변경할 예정
	const handleDownload = () => {
		if (state.status === 'success' && state.resultUrl) {
			window.open(state.resultUrl, '_blank');
		}
	};

	return (
		<div
			className='flex flex-col gap-4'
		>
			<div className='flex flex-col gap-5'>
				{/* idle 상태 */}
				{state.status === 'idle' && (
					<FittingFrame
						state={state}
						imgUrl={imageUrlExample}
						type='BEFORE' 
					/>
				)}

				{/* Loading 또는 Success 상태 */}
				{(state.status === 'loading' || state.status === 'success' || state.status === 'error') && (
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

			<FittingButton
				state={state.status}
				onStart={handleStartFitting} // "AI 피팅하기" & "재생성하기" 클릭 시 실행
				onRestart={handleRestartFitting}
				onDownload={handleDownload} // "다운로드하기" 클릭 시 실행
			/>
			
            
			
		</div>
	);
};

export default FittingTab;
