
/*
 * protectedRoutes
 * - 인증이 필요한 페이지들
 */

import Home from '@/src/pages/home/home-page';
import SettingPage from '@/src/pages/setting/setting-page';
import  { PATH } from '@/src/shared/configs/path';
import RecentFitting from '@/src/pages/recent-fitting/recent-fitting-page';

export const protectedRoutes = [
	{
		path: PATH.HOME,
		Component: Home,
	},
	{
		path: PATH.SETTING.ROOT,
		Component: SettingPage,
	},
	{
		path: PATH.RECENT_FITTING,
		Component: RecentFitting,
	},
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
