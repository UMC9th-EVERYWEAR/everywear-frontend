import { useNavigate, useLocation } from 'react-router'; 
import { PATH } from '@/src/constants/path';
import { IconImage } from '@/src/assets/icons';

const NAV_ITEMS = [
	{ id: 'home', label: '홈', Icon: 'Home', path: PATH.HOME }, 
	{ id: 'product', label: '전체 상품', Icon: 'Product', path: PATH.PRODUCTS.ROOT },
	{ id: 'fitting', label: '최근 피팅', Icon: 'Fitting', path: PATH.RECENT_FITTING },
	{ id: 'closet', label: '내 옷장', Icon: 'Closet', path: PATH.CLOSET },
] as const;

export const Navbar = () => {
	const navigate = useNavigate(); 
	const location = useLocation(); 

	return (
 
		<nav className="sticky bottom-0 flex w-full h-[50px] px-4 justify-between items-center bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 shadow-[var(--shadow-4)] z-10 transition-colors duration-300">
			{NAV_ITEMS.map(({ id, label, Icon, path }) => {
				const isActive = location.pathname === path;

				return (
					<button
						key={id}
						onClick={() => navigate(path)}
						className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                            isActive 
                            	? 'text-primary-600 font-bold' 
                            	: 'text-neutral-700 dark:text-neutral-400'
                        }`}
					>
						<div className="flex items-center justify-center h-[20px]">
							<IconImage
								name={Icon}
								size={24}
								active={isActive}
							/>
						</div>
						<span className="text-regular-12 mt-[2px] font-medium leading-none text-center">
							{label}
						</span>
					</button>
				);
			})}
		</nav>
	);
};
