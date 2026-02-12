import { useNavigate } from 'react-router';
import {  PATH } from '../../constants/path'; 
import { Icons } from '@/src/assets/icons/components/Icons';

interface HeaderProps {
  type: 'main' | 'sub'; 
  title?: string;       
  onBack?: () => void;  
}

const Header = ({ type, title = 'EVERY WEAR', onBack }: HeaderProps) => {
	const navigate = useNavigate();

	// 뒤로가기 로직: 부모의 onBack이 있으면 실행, 없으면 이전 페이지로 이동
	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			navigate(-1);
		}
	};

	return (
		<header className="w-full h-11.25 px-4 bg-white flex items-center sticky top-0 z-30 shadow-12">
			{type === 'main' ? (
			/* 1. 메인 헤더 레이아웃*/
				<div className="flex justify-between items-end w-full">
					<Icons.Everywear width={133}/>
					<button 
						className="transition-opacity active:opacity-50 cursor-pointer"
						aria-label="설정"
						onClick={() => navigate(PATH.SETTING.ROOT)}
					>
						<Icons.SettingHeader />
					</button>
				</div>
			) : (
			/* 2. 서브 헤더 레이아웃 (뒤로가기 + 타이틀) */
				<div className="flex items-center w-full h-full">
					<button 
						onClick={handleBack}
						className="flex items-center justify-center mr-1 active:opacity-50 transition-opacity cursor-pointer"
						aria-label="뒤로가기"
					>
		
						<Icons.Arrow
							className='text-primary-600 rotate-180'
							size={30}
						/>

					</button>
					<h2 className="text-primary-600 text-bold-16">
						{title}
					</h2>
				</div>
			)}
		</header>
	);
};

export default Header;
