import { matchPath, Outlet, useLocation } from 'react-router';
import Header from './Header';
import { Navbar } from './Navbar';
import { Modal } from '../common/Modal';
import { useMemo, useState } from 'react';
import { hideHeaderPatterns, hideNavPatterns, PATH } from '@/src/constants/path';

const RootLayout = () => {
	const { pathname } = useLocation();
	const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  
	// 추후 추가 가능

	// 헤더 기능은 딱 2개
	// 1. 뒤로가기
	// 2. setting 페이지로 이동
	const shouldHideHeader = useMemo(() => hideHeaderPatterns.some((pattern) =>
		matchPath(pattern, pathname),
	), [pathname]);
	const shouldHideNav = useMemo(() => hideNavPatterns.some((pattern) =>
		matchPath(pattern, pathname),
	), [pathname]);

	/* HEADER_TITLE_MAP: 추후 헤더 타이틀 동적 변경 */
	const HEADER_TITLE_MAP = [
		{ pattern: PATH.RECENT_FITTING, title: '최근 피팅 내역' },
		{ pattern: PATH.AI_FITTING.DETAIL, title: 'AI 분석' },
		{ pattern: PATH.PRODUCTS.ROOT, title: '전체 상품 보기' },
		{ pattern: PATH.CLOSET, title: '내 옷장' },
		{ pattern: PATH.SETTING.ROOT, title: '설정' },
		{ pattern: PATH.SETTING.CHANGE_PHOTO, title: '기본 사진 변경' },
		{ pattern: PATH.SETTING.INQUIRY, title: '1:1 문의하기' },
		{ pattern: PATH.SETTING.WITHDRAW, title: '회원탈퇴' },
		{ pattern: PATH.ONBOARDING.PHOTO, title: '사진 가이드' },
	] as const;

	/*  getHeaderTitle: pathname으로 title 뽑는 함수 */
	const getHeaderTitle = (pathname: string) => {
		const matched = HEADER_TITLE_MAP.find(({ pattern }) => matchPath(pattern, pathname));
		return matched?.title;
	};

  	/*  isMain: 타입 main/sub 나누는 로직 변수 */
	const isMain =
    ['/home'].some((pattern) => matchPath(pattern, pathname)) ||
    pathname === '/';


	return (
		<div className="min-h-screen  bg-gray-50 flex justify-center">
			<div className='w-full flex justify-center'>

				<div className='flex flex-col max-w-2xl w-full'>

					{!shouldHideHeader && <Header
						type={isMain ? 'main' : 'sub'}
						title={getHeaderTitle(pathname)}
					                      />}
					<div className='grow bg-white'>
						<Outlet />
					</div>
					{!shouldHideNav && <Navbar />}
					{/* 모달 등 전역 요소 */}
					<Modal 
						isOpen={isWithdrawOpen}
						onClose={() => setIsWithdrawOpen(false)}
						title="정말 탈퇴하시겠습니까?"
						btn1Text="확인"
						btn1Action={() => setIsWithdrawOpen(false)}
					/>
				</div>
			</div>
		</div >
	);
};

export default RootLayout;
