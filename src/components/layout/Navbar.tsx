import { useNavigate, useLocation } from 'react-router'; 
import { HomeIcon, ProductIcon, FittingIcon, ClosetIcon } from '../common/Icons';
import { PATH } from '@/src/constants/path';

// ✅ Props 타입 정의: 분석 중인지 여부와 모달 제어 함수를 받습니다.
interface NavbarProps {
    isAnalyzing?: boolean;
    onBlockedClick?: (targetPath: string) => void;
}

const NAV_ITEMS = [
    { id: 'home', label: '홈', Icon: HomeIcon, path: PATH.HOME }, 
    { id: 'product', label: '전체 상품', Icon: ProductIcon, path: PATH.PRODUCTS.ROOT },
    { id: 'fitting', label: '최근 피팅', Icon: FittingIcon, path: PATH.RECENT_FITTING },
    { id: 'closet', label: '내 옷장', Icon: ClosetIcon, path: PATH.CLOSET },
];

export const Navbar = ({ isAnalyzing = false, onBlockedClick }: NavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (path: string) => {
        // ✅ 현재 경로와 이동하려는 경로가 같으면 아무것도 안 함
        if (location.pathname === path) return;

        // ✅ AI 분석 중일 때 다른 메뉴를 누르면 이동을 막고 모달 호출
        if (isAnalyzing && onBlockedClick) {
            onBlockedClick(path); // 이동하려는 경로를 넘겨주며 모달 띄우기 요청
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="sticky bottom-0 flex w-full h-[50px] px-4 justify-between items-center bg-white border-t border-neutral-100 shadow-[var(--shadow-4)] z-10">
            {NAV_ITEMS.map(({ id, label, Icon, path }) => {
                const isActive = location.pathname === path;

                return (
                    <button
                        key={id}
                        onClick={() => handleItemClick(path)} // ✅ 직접 navigate하지 않고 핸들러 거침
                        className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                            isActive ? 'text-primary-600 font-bold' : 'text-neutral-700'
                        }`}
                    >
                        <div className="flex items-center justify-center h-[20px]">
                            <Icon active={isActive} /> 
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