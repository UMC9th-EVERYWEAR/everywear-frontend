import type { FittingState } from '@/src/types/ai-fitting/status';
import FittingFrame from './FittingFrame';
import FittingButton from './FittingButton';
import type { FittingData } from '@/src/types/ai-fitting/data';

interface FittingTabProps {
    state: FittingState;
    onStartFitting: () => void; // 부모에서 내려준 피팅 시작 함수
    // 다운로드는 간단한 기능이라 여기서 처리하거나, 부모에게 받아도 됩니다.
    // 여기서는 예시로 내부에서 처리하거나 부모에게 요청하는 구조를 만듭니다.
}

const FittingTab = ({ state, onStartFitting }: FittingTabProps) => {

	// 목데이터
	const imageUrlExample : FittingData = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI';

	// 다운로드 핸들러 (간단한 로직이라 여기서 구현 예시)
	const handleDownload = () => {
		if (state.status === 'success' && state.resultUrl) {
			// 실제 다운로드 로직 (새 탭 열기 등)
			window.open(state.resultUrl, '_blank');
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-5'>
				{/* IDLE 상태 */}
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

			{/* 버튼에 핸들러 전달 */}
			<FittingButton
				state={state.status}
				onStart={onStartFitting} // "AI 피팅하기" & "재생성하기" 클릭 시 실행
				onDownload={handleDownload} // "다운로드하기" 클릭 시 실행
			/>
            
			{/* 중요: 여기서 Modal을 렌더링하지 않습니다. 
               Modal은 AiFittingPage(부모)에서 state.modal 상태에 따라 렌더링합니다.
            */}
		</div>
	);
};

export default FittingTab;
