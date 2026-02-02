import type React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/src/utils/cn'; 

const ToastContainer = ({ children }: { children: React.ReactNode }) => {
	const toastPortal = document.getElementById('portal');
	if (!toastPortal) return null;

	return ReactDOM.createPortal(
		<div 
			className={cn(
				// 토스트 컨테이너(투명) 자리 잡기
				// 토스트 컨테이너는 빈 공간 클릭 시 뒤에 있는 요소가 클릭되게끔 설정해야 함 -> pointer-events-none
				'fixed inset-y-0 left-1/2 -translate-x-1/2 z-50',
				'w-full max-w-109', 
				'pointer-events-none', 
			)}
		>
			{/* 실제 토스트 위치 잡기 */}
			{/* 실제 토스트 위치 잡기 */}
			{/* 실제 토스트에서는 X 버튼으로 끌 수 있어야 함 -> pointer-events-auto*/}
			<div className="absolute top-15 right-4 flex flex-col items-end gap-2 pointer-events-auto">
				{children}
			</div>
		</div>,
		toastPortal,
	);
};

export default ToastContainer;
