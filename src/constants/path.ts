//  라우트 문자열을 상수로 관리해서 오타/불일치 방지
//  URL 변경 시 한 곳(PATH)만 수정하면 전체 반영되도록 하기 위함
//  Link/navigate/route 등록에서 같은 path를 재사용해 일관성 유지
//  라우트 구조를 한눈에 문서처럼 파악할 수 있게 하기 위함
//  동적 라우트(:id 등)도 통일된 규칙으로 관리하기 위함


export const PATH = {
	LANDING: '/',
	LOGIN: {
		ROOT: '/login',
		TERMS: '/login/terms',
		CALLBACK: '/login/callback',
	},
	ONBOARDING:{
		ROOT: '/onboarding',
		PHOTO: '/onboarding/photo',
	},	
	
	HOME: '/home',

	PRODUCTS: {
		ROOT: '/products',
		ADD: '/products/add',
	},

	RECENT_FITTING: '/recent-fitting',

	FITTING_DETAIL: '/fitting-detail/:id',

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
	PATH.LOGIN.ROOT,
	PATH.ONBOARDING.ROOT,
];	

/* hideNavRoutes: Nav 숨길 라우트 목록 */ 
export const hideNavPatterns = [
	PATH.LANDING,
	PATH.LOGIN.ROOT,
	PATH.LOGIN.TERMS,
	PATH.ONBOARDING.ROOT,
	PATH.ONBOARDING.PHOTO,
	PATH.SETTING.ROOT,
	PATH.SETTING.CHANGE_PHOTO,
	PATH.SETTING.WITHDRAW,
	PATH.SETTING.INQUIRY,
	PATH.AI_FITTING.DETAIL,
	PATH.FITTING_DETAIL,
	PATH.PRODUCTS.ADD,
];
/* fullscreenPatterns: 화면을 전체로 사용하는 라우트 */
export const fullscreenPatterns = [
	PATH.LOGIN.ROOT,
	PATH.LANDING,
	PATH.ONBOARDING.ROOT,
]

/*전역에서 사용하는 SVG 아이콘 경로 상수 모음*/
 
export const ICON_PATHS = {
	// 설정(톱니바퀴) 아이콘
	SETTINGS: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
	// 뒤로가기 화살표
	BACK: 'M9 1L1 9L9 17',
} as const;

export const OAUTH_AUTHORIZATION_PATH = {
	KAKAO: '/oauth2/authorization/kakao',
	GOOGLE: '/oauth2/authorization/google',
} as const;
