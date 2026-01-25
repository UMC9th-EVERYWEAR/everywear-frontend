import { useState, useEffect } from 'react';
import type { FittingState } from '@/src/types/ai-fitting/status'; // 경로 수정
import { Modal } from '../common/Modal';
import FittingFrame from './FittingFrame';
import FittingButton from './FittingButton';
import type { FittingData } from '@/src/types/ai-fitting/data';

interface FittingTabProps {
    state: FittingState;
    onClick: () => void;
	onModal: () => void;
}


const FittingTab = ({ state, onClick, onModal }: FittingTabProps) => {

	if (state.status === 'success') onModal(true)

	// 목데이터
	const imageUrlExample : FittingData = 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI';


	// 결과 확인용 로컬 상태 (Success 상태 내부에서의 UI 분기)
	
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-5'>
                
				{/* 1. Idle 상태 (Before 사진만) */}
				{state.status === 'idle' && (
					<FittingFrame
						state={state}
						imgUrl={imageUrlExample}
						type='BEFORE' 
					/>
				)}

				{/* 2. Loading 또는 Success 상태 (괄호로 묶어줘야 함!) */}
				{(state.status === 'loading' || state.status === 'success') && (
					<>  
						{/* 보통 피팅 결과 화면에서는 Before 사진도 같이 보여줍니다 */}
						<FittingFrame
							state={state}
							imgUrl={imageUrlExample}
							type='BEFORE'
						/>
                        
						{/* After 사진 (결과) */}
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
			/>

			<Modal
				isOpen={isModalOpen} 
				onClose={handleModalClose}
				text="가상 피팅이 완료되었습니다."
				btn1Text="확인하러 가기"
				btn1Action={handleModalClose}
			/>
		</div>
	);
};

export default FittingTab;
