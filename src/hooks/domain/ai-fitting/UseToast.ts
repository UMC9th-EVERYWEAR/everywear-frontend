import { useRef, useState } from 'react';

export interface Toast {
    id: number;
    message: string;
}

export type ToastInput = Omit<Toast, 'id'>;

function useToast() {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const idRef = useRef(0);

	const createToast = (toast : ToastInput) => {
		const newToast: Toast = { 
			id: idRef.current, 
			...toast, 
		};

		setToasts((prevToasts) => [...prevToasts, newToast]);
		idRef.current++;
	}

	const deleteToast = (id : number) => {
		setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	return { toasts, createToast, deleteToast };
}

export default useToast;
