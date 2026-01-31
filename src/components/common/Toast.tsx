import { cn } from '@/src/utils/cn';
import { X as TurnOff } from 'lucide-react'
import { useEffect, useState } from 'react';

interface ToastProps {
    id : number; // 삭제를 위해 필요
    deleteToast : (id : number) => void;
    duration? : number;
    message: string;
    className?: string;
}


const Toast = ({ id, deleteToast, duration = 3000, message, className } : ToastProps) => {
	// 닫히는 애니메이션을 트리거하기 위한 로컬 상태
	const [isClosing, setIsClosing] = useState(false);
	const animationDuration = 300; // 애니메이션 지속 시간 (ms)
	
	useEffect(() => {
		// 1. duration(3초) 후에 "닫히는 상태"로 전환
		const timer = setTimeout(() => {
			setIsClosing(true);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	useEffect(() => {
		// 2. "닫히는 상태"가 되면 애니메이션 시간만큼 기다렸다가 진짜로 삭제
		if (isClosing) {
			const deleteTimer = setTimeout(() => {
				deleteToast(id);
			}, animationDuration);

			return () => clearTimeout(deleteTimer);
		}
	}, [isClosing, id, deleteToast]);

	// 수동으로 닫을 때도 "닫히는 상태"를 먼저 트리거
	const handleClose = () => {
		setIsClosing(true);
	}

	return (
		<div
			className={cn(
				'w-[300px] p-4 flex justify-between bg-toast-background border-0 rounded-lg',
				'items-center shadow-lg mb-3 pointer-events-auto',
                
				// 애니메이션 관련 클래스

				// 공통 애니메이션 설정 (지속시간 300ms, 부드러운 감속)
				'duration-300 ease-in-out',

				// 1. 등장 애니메이션 (마운트 시 자동 적용)
				'animate-in slide-in-from-bottom-full fade-in',
                
				// 2. 퇴장 애니메이션 (isClosing이 true일 때 적용)
				// fill-mode-forwards: 애니메이션이 끝난 상태 유지 (깜빡임 방지)
				isClosing && 'animate-out slide-out-to-bottom-full fade-out fill-mode-forwards',
			)}
		>
			<span className={cn('text-white text-regular-16 leading-[150%]', className)}>{message}</span>
			<TurnOff
				size={24}
				color='white'
				className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
				onClick={handleClose} // X 버튼 클릭 시 handleManualClose 호출
			/>
		</div>
	)
}

export default Toast;
