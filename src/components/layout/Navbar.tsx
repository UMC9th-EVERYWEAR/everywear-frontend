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
	const navigate = useNavigate(); //이동을 위한 함수
	const location = useLocation(); //현재 경로를 가져오는 함수

	return (
		<nav className="sticky bottom-0 flex w-full h-[50px] px-4 justify-between items-center bg-white border-t border-neutral-100 shadow-[var(--shadow-4)] z-10">
			{NAV_ITEMS.map(({ id, label, Icon, path }) => {
				// 현재 URL 경로가 해당 아이템의 path와 일치하는지 확인
				const isActive = location.pathname === path;

				return (
					<button
						key={id}
						onClick={() => navigate(path)} // 4. 클릭 시 해당 경로로 이동
						className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                            isActive ? 'text-primary-600 font-bold' : 'text-neutral-700'
                        }`}
					>
						<div className="flex items-center justify-center h-[20px]">
							{/* isActive를 props로 넘겨서 아이콘 색상을 바꿀 수 있다면 전달 */}
							<IconImage
								name={Icon}
								size={20}
								active={isActive}
							/>
						</div>
						<span className="text-regular-10 mt-[2px] font-medium leading-none text-center">
							{label}
						</span>
					</button>
				);
			})}
		</nav>
	);
};
