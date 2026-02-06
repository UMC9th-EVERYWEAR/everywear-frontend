import { useEffect } from 'react';

const usePreventRefresh = (shouldBlock: boolean) => {
	useEffect(() => {
		if (!shouldBlock) return;

		const preventClose = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = '';
		};

		window.addEventListener('beforeunload', preventClose);

		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, [shouldBlock]);
};

export default usePreventRefresh;
