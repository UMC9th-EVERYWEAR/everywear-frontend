import { useState } from 'react';
import { HomeIcon, ProductIcon, FittingIcon, ClosetIcon } from '../common/Icons';

const NAV_ITEMS = [
	{ id: 'home', label: '홈', Icon: HomeIcon },
	{ id: 'product', label: '전체 상품', Icon: ProductIcon },
	{ id: 'fitting', label: '최근 피팅', Icon: FittingIcon },
	{ id: 'closet', label: '내 옷장', Icon: ClosetIcon },
];

export const Navbar = () => {
	const [activeTab, setActiveTab] = useState('home');

	return (
		<nav className="sticky bottom-0 flex w-full  h-[50px] px-4 justify-between items-center bg-white border-t border-neutral-100 shadow-[var(--shadow-4)] z-10">
			{NAV_ITEMS.map(({ id, label, Icon }) => {
				const isActive = activeTab === id;

				return (
					<button
						key={id}
						onClick={() => setActiveTab(id)}
						className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-primary-600' : 'text-neutral-700'
            }`}
					>
						<div className="flex items-center justify-center h-[20px]">
							<Icon />
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
