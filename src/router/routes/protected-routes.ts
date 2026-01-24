import  { PATH } from '@/src/constants/path';
import Home from '@/src/pages/Home';
import RecentFitting from '@/src/pages/recent-fitting';
import SettingPage from '@/src/pages/setting/SettingPage';

/*
 * protectedRoutes
 * - 인증이 필요한 페이지들
 */


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
