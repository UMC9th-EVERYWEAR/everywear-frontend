import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '../constants/path';

const NotFoundPage = () => {
	const [remainingSeconds, setRemainingSeconds] = useState(3);

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
			<h1 className="text-not-found text-primary-600 mb-1">404</h1>
			<p className="text-semibold-16 text-primary-700">요청하신 페이지가 존재하지 않거나 이동된 것 같습니다</p>
			<p className="text-semibold-16 ttext-gray-50 text-primary-700">
				{remainingSeconds}초 후 홈으로 이동합니다...
			</p>
		</div>
	);
};

export default NotFoundPage;

