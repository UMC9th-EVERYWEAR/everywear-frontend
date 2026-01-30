/**
 * Route Path Map (React Router)
 *
 * /login                 → pages/login/LoginPage.tsx
 * /home                  → pages/home/HomePage.tsx
 *
 * /products              → pages/products/ProductsPage.tsx
 * /products/url          → pages/products/ProductsUrlPage.tsx
 *
 * /recent-fitting        → pages/recent-fitting/RecentFittingPage.tsx
 *
 * /ai-fitting            → pages/ai-fitting/AiFittingPage.tsx
 * /ai-fitting/:id        → pages/ai-fitting/AiFittingDetailPage.tsx
 *
 * /closet                → pages/closet/ClosetPage.tsx
 *
 * /setting               → pages/setting/SettingPage.tsx
 * /setting/logout        → pages/setting/LogoutPage.tsx
 * /setting/withdraw      → pages/setting/WithdrawPage.tsx
 * /setting/change-photo  → pages/setting/ChangePhotoPage.tsx
 */

//  라우트 문자열을 상수로 관리해서 오타/불일치 방지
//  URL 변경 시 한 곳(PATH)만 수정하면 전체 반영되도록 하기 위함
//  Link/navigate/route 등록에서 같은 path를 재사용해 일관성 유지
//  라우트 구조를 한눈에 문서처럼 파악할 수 있게 하기 위함
//  동적 라우트(:id 등)도 통일된 규칙으로 관리하기 위함


export const PATH = {
	LANDING: '/',
	LOGIN: '/login',
	ONBOARDING:{
		ROOT: '/onboarding',
		PHOTO: '/onboarding/photo',
	},

	HOME: '/home',

	PRODUCTS: {
		ROOT: '/products',
		URL: '/products/url',
	},

	RECENT_FITTING: '/recent-fitting',

	AI_FITTING: {
		DETAIL: '/ai-fitting/:id', 
	},

	CLOSET: '/closet',

	SETTING: {
		ROOT: '/setting',
		WITHDRAW: '/setting/withdraw',        
		CHANGE_PHOTO: '/setting/change-photo',  
		INQUIRY: '/setting/inquiry',
	},
} as const;

/* hideHeaderRoutes: 헤더 숨길 라우트 목록 */
export const hideHeaderPatterns = [
	PATH.LANDING,
	PATH.ONBOARDING.ROOT,
	PATH.LOGIN,

];	

/* hideNavRoutes: Nav 숨길 라우트 목록 */ 
export const hideNavPatterns = [
	PATH.LANDING,
	PATH.ONBOARDING.ROOT,
	PATH.ONBOARDING.PHOTO,
	PATH.LOGIN,
	PATH.SETTING.ROOT,
	PATH.SETTING.CHANGE_PHOTO,
	PATH.SETTING.WITHDRAW,
	PATH.SETTING.INQUIRY,
	PATH.AI_FITTING.DETAIL,
];
