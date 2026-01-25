import type { FittingStateStatus } from '@/src/types/ai-fitting/status';
import ButtonLayout from './ButtonLayout';

interface FittingButtonProps {
    state: FittingStateStatus;
	onClick?: () => void;
}

const FittingButton = ({ state, onClick } : FittingButtonProps) => {
	return (
		<>
			{state === 'idle' && (
				<ButtonLayout
					content='AI 피팅하기'
					className='bg-primary-600 text-white'
					onClick={onClick}
				/>)}
			
            
			{state !== 'idle' && (
				<div className='flex flex-col mt-5 gap-5'>
					<ButtonLayout
						content='재생성하기'
						className={state === 'success' ? 'border-primary-600 text-primary-600' : 'border-neutral-400 text-neutral-400'}
						onClick={onClick}
					/>
					<ButtonLayout
						content='다운로드하기'
						className={state === 'success' ? 'bg-primary-600 text-white' : 'bg-neutral-400 text-white'}
						onClick={onClick}
					/>
				</div>
			)}
		</>
	)
}

export default FittingButton;
