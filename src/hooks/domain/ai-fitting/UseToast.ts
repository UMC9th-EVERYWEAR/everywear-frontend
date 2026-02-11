import { useRef, useState, useCallback } from 'react'; 

interface ToastType {
    id: number;
    message: string;
}

export type ToastInput = Omit<ToastType, 'id'>;

function useToast() {
	const [toasts, setToasts] = useState<ToastType[]>([]);
	const idRef = useRef(0);

	const createToast = useCallback((toast: ToastInput) => {
		const newId = idRef.current; 
		const newToast: ToastType = { 
			id: newId, 
			...toast, 
		};

		setToasts((prevToasts) => [...prevToasts, newToast]);
        
		idRef.current += 1; 
	}, []); 

	const deleteToast = useCallback((id: number) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	}, []); 

	return { toasts, createToast, deleteToast };
}

export default useToast;
