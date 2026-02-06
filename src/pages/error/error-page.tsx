import { PATH } from '@/src/constants/path';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { FallbackProps } from 'react-error-boundary';



const ErrorPage = ({ error }: FallbackProps) => {
	const [remainingSeconds, setRemainingSeconds] = useState(3);
	const message =
    error instanceof Error
    	? error.message
    	: 'Unexpected error occurred';


	const navigate = useNavigate();

	useEffect(() => {
	  const timer = setTimeout(() => {
			setRemainingSeconds((prev) => prev - 1);
		}, 1000);

		if(remainingSeconds === 0 ){
			navigate(PATH.HOME, { replace: true }); 

		}

		return () => clearTimeout(timer);
	}, [navigate, remainingSeconds]);


	return (
		<div className="flex flex-col  items-center justify-center h-full px-4 text-center">   
			<h1 className="text-not-found text-primary-600 mb-1">ERROR</h1>
			<p className="text-semibold-16 text-primary-700">{message}</p>
			<p className="text-semibold-16 text-primary-700">
				{remainingSeconds}초 후 홈으로 이동합니다...
			</p>
		</div>
	);
};

export default ErrorPage;

