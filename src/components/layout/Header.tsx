import { useNavigate } from 'react-router';
import { Icons } from '@/src/assets/icons/components/Icons';
import { useThemeStore } from '@/src/store/use-theme-store';
import { PATH } from '@/src/constants/path';

interface HeaderProps {
  type: 'main' | 'sub'; 
  title?: string;       
  onBack?: () => void;  
}

const Header = ({ type, title = 'EVERY WEAR', onBack }: HeaderProps) => {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useThemeStore();

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			navigate(-1);
		}
	};

	return (
		<header className="w-full h-[45px] px-4 bg-white dark:bg-gray-900 flex items-center sticky top-0 z-30 shadow-12 transition-colors duration-300">
			{type === 'main' ? (
				<div className="flex justify-between items-end w-full pb-1">
					<Icons.Everywear width={133}/>                    
					<div className="flex items-center gap-3 ">
						<button 
							onClick={toggleTheme}
							className="text-primary-600 dark:text-primary-400 cursor-pointer p-1 pb-0"
							aria-label="테마 전환"
						>
							{theme === 'light' ? (
								<Icons.LightLogo className='text-primary-600'/>		
							) : (
								<Icons.DarkLogo className='text-primary-600' />
							)}
						</button>

						<button 
							className="text-primary-600 dark:text-primary-400 transition-opacity active:opacity-50 cursor-pointer p-1 pb-0"
							aria-label="설정"
							onClick={() => navigate(PATH.SETTING.ROOT)}
						>
							<Icons.SettingHeader  className='text-primary-600'/>
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center w-full h-full">
					<button 
						onClick={handleBack}
						className="flex items-center justify-center mr-1 -ml-2 active:opacity-50 transition-opacity cursor-pointer"
						aria-label="뒤로가기"
					>
						<Icons.Arrow
							className='text-primary-600 rotate-180 dark:text-primary-400'
							size={30}
						/>
					</button>
					<h2 className="text-primary-600 dark:text-primary-400 text-medium-16 tracking-[-0.48px] font-bold">
						{title}
					</h2>
				</div>
			)}
		</header>
	);
};

export default Header;
