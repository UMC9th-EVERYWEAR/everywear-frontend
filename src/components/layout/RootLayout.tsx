import { matchPath, Outlet, useLocation } from 'react-router';
import Header from './Header';
import { Navbar } from './Navbar';
import { Modal } from '../common/Modal';
import { useMemo, useRef, useState, useEffect } from 'react'; 
import { fullscreenPatterns, hideHeaderPatterns, hideNavPatterns, PATH } from '@/src/constants/path';
import { cn } from '@/src/utils/cn';
import ScrollToTop from '@/src/hooks/domain/products/useScrollToTop';
import { useThemeStore } from '@/src/store/use-theme-store'; 

const RootLayout = () => {
	const { pathname } = useLocation();
	const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
	const mainRef = useRef<HTMLElement | null>(null);
	const theme = useThemeStore((state) => state.theme);

	// 테마 적용
	useEffect(() => {
		const root = window.document.documentElement; 
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);

	const shouldHideHeader = useMemo(() => hideHeaderPatterns.some((pattern) =>
		matchPath(pattern, pathname),
	), [pathname]);
    
	const shouldHideNav = useMemo(() => hideNavPatterns.some((pattern) =>
		matchPath(pattern, pathname),
	), [pathname]);

	const HEADER_TITLE_MAP = [
		{ pattern: PATH.RECENT_FITTING, title: '최근 피팅 내역' },
		{ pattern: PATH.AI_FITTING.DETAIL, title: 'AI 분석하기' },
		{ pattern: PATH.PRODUCTS.ROOT, title: '전체 상품 보기' },
		{ pattern: PATH.CLOSET, title: '내 옷장' },
		{ pattern: PATH.SETTING.ROOT, title: '설정' },
		{ pattern: PATH.SETTING.CHANGE_PHOTO, title: '기본 사진 변경' },
		{ pattern: PATH.SETTING.INQUIRY, title: '1:1 문의하기' },
		{ pattern: PATH.SETTING.WITHDRAW, title: '회원탈퇴' },
		{ pattern: PATH.LOGIN.TERMS, title: '뒤로가기' },
		{ pattern: PATH.ONBOARDING.PHOTO, title: '사진 가이드' },
	] as const;

	const getHeaderTitle = (pathname: string) => {
		const matched = HEADER_TITLE_MAP.find(({ pattern }) => matchPath(pattern, pathname));
		return matched?.title;
	};

	const isMain = ['/home'].some((pattern) => matchPath(pattern, pathname)) || pathname === '/';
	const isFullscreen = fullscreenPatterns.some((path) => matchPath(path, pathname));

	return (
		<div
			className={cn(
				// ✅ h-screen 대신 h-[100dvh]로 모바일 주소창 대응
				'h-[100dvh] w-full flex justify-center overflow-hidden transition-colors duration-300',
				'bg-gray-50 dark:bg-black', 
			)}
		>
			<div
				className={cn(
					'flex flex-col w-full h-full relative transition-colors duration-300',
					'bg-white dark:bg-gray-900', 
					isFullscreen ? '' : 'max-w-2xl',
				)}
			>
				{!shouldHideHeader && (
					<Header
						type={isMain ? 'main' : 'sub'}
						title={getHeaderTitle(pathname)}
					/>
				)}

				<ScrollToTop targetRef={mainRef} />
                
				<main
					ref={mainRef}
					className={cn(
						'flex-1 overflow-y-auto no-scrollbar bg-transparent min-h-0',
						// ✅ Navbar가 fixed이므로 콘텐츠가 가려지지 않게 하단 여백 추가
						!shouldHideNav && 'pb-[60px]',
					)}
				>
					<Outlet />
				</main>

				{/* ✅ Navbar는 레이아웃 최하단에 배치 (z-index 50으로 항상 최상단 노출) */}
				{!shouldHideNav  && <Navbar />} 

				<Modal 
					isOpen={isWithdrawOpen}
					onClose={() => setIsWithdrawOpen(false)}
					title='정말 탈퇴하시겠습니까?'
					btn1Text='확인'
					btn1Action={() => setIsWithdrawOpen(false)}
					btn2Text='취소'
					btn2Action={() => setIsWithdrawOpen(false)}
				/>
			</div>
		</div>
	);
};

export default RootLayout;
