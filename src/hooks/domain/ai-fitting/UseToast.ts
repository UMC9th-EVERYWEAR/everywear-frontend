import { useRef, useState } from 'react';

interface ToastType {
    id: number;
    message: string;
}

// id는 useToast에서 추가하므로 id는 뺀 타입 생성
type ToastInput = Omit<ToastType, 'id'>;

function useToast() {
	const [toasts, setToasts] = useState<ToastType[]>([]);
	const idRef = useRef(0);

	// createToast : 새로운 토스트 생성
	const createToast = (toast : ToastInput) => {
		// 새로운 Toast 생성
		// id는 새롭게 생성
		const newToast: ToastType = { 
			id: idRef.current, 
			...toast, 
		};

		// 이전 상태의 Toast 배열에 새로운 Toast를 추가
		setToasts((prevToasts) => [...prevToasts, newToast]);
		idRef.current++;
	}

	// deleteToast : id에 해당하는 토스트 삭제
	const deleteToast = (id : number) => {
		setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	return { toasts, createToast, deleteToast };
}



export default useToast;
