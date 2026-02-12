import { cn } from '@/src/utils/cn';
import { X as TurnOff } from 'lucide-react'
import { useEffect, useState } from 'react';

interface ToastProps {
    id : number; 
    
    deleteToast : (id : number) => void;
    
    duration? : number;
    message: string;
    className?: string;
}

const Toast = ({ id, deleteToast, duration = 3000, message, className } : ToastProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const animationDuration = 300; 
    
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsClosing(true);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	useEffect(() => {
		if (isClosing) {
			const deleteTimer = setTimeout(() => {
				deleteToast(id);
			}, animationDuration);

			return () => clearTimeout(deleteTimer);
		}
	}, [isClosing, id, deleteToast]);

	const handleClose = () => {
		setIsClosing(true);
	}

	return (
		<div
			className={cn(
				'w-[300px] p-4 flex justify-between bg-toast-background border-0 rounded-lg',
				'items-center shadow-lg mb-3 pointer-events-auto',
				'duration-300 ease-in-out',
				'animate-in slide-in-from-bottom-full fade-in',
				isClosing && 'animate-out slide-out-to-bottom-full fade-out fill-mode-forwards',
			)}
		>
			<span className={cn('text-white text-regular-16 leading-[150%]', className)}>{message}</span>
			<TurnOff
				size={24}
				color='white'
				className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
				onClick={handleClose} 
			/>
		</div>
	)
}

export default Toast;
