import { useNavigate } from 'react-router';
import { Icons } from '@/src/assets/icons/components/Icons';
import { useThemeStore } from '@/src/store/use-theme-store';

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
					<div className="flex items-center gap-3">
						<button 
							onClick={toggleTheme}
							className="text-primary-600 dark:text-primary-400 cursor-pointer p-1"
							aria-label="테마 전환"
						>
							{theme === 'light' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								><circle
									cx="12"
										cy="12"
										r="5"
								/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
							)}
						</button>

						<button 
							className="text-primary-600 dark:text-primary-400 transition-opacity active:opacity-50 cursor-pointer p-1"
							aria-label="설정"
							onClick={() => navigate('/setting')}
						>
							<Icons.SettingHeader />
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center w-full h-full">
					<button 
						onClick={handleBack}
						className="flex items-center justify-center mr-1 active:opacity-50 transition-opacity cursor-pointer"
						aria-label="뒤로가기"
					>
						<svg
							width="10"
							height="18"
							viewBox="0 0 10 18"
							fill="none"
							className="shrink-0"
						>
							<Icons.Arrow
								className='text-primary-600 rotate-180 dark:text-primary-400'
								size={30}
							/>
						</svg>
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
