import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '../router/path';

const NotFoundPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate(PATH.HOME, { replace: true }); 
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="min-h-screen bg-gray-50 flex justify-center">
			<div className="w-full flex justify-center">
				<div className="flex flex-col max-w-2xl w-full">

					<div className="flex grow flex-col items-center justify-center text-center px-4">
						<h1 className="text-primary-600 text-6xl font-bold mb-4">
							404
						</h1>
						<p className="text-regular-18 mb-2">
							페이지를 찾을 수 없습니다.
						</p>
						<p className="text-gray-400 mb-4">
							요청하신 페이지가 존재하지 않거나 이동된 것 같습니다.
						</p>
						<p className="text-regular-16 text-gray-400">
							3초 후 홈으로 이동합니다...
						</p>
					</div>

				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;

