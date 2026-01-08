import { useState } from 'react';
import { HomeIcon, ProductIcon, FittingIcon, ClosetIcon } from '../common/Icons';

const NAV_ITEMS = [
  { id: 'home', label: '홈', Icon: HomeIcon },
  { id: 'product', label: '전체 상품', Icon: ProductIcon },
  { id: 'fitting', label: '최근 피팅', Icon: FittingIcon },
  { id: 'closet', label: '내 옷장', Icon: ClosetIcon },
];

export const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-neutral-100 pb-safe shadow-[var(--shadow-4)] z-10">
      <div className="flex justify-around items-center h-16">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-primary-600' : 'text-neutral-700'
              }`}
            >
              <Icon />
              <span className="text-regular-10 mt-1 font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};