import Home from '../../pages/Home';
import SettingPage from '../../pages/setting/SettingPage';
import { PATH } from '../path';
import RecentFittingPage from '../../pages/recent-fitting';
import ClosetPage from '@/src/pages/closet/ClosetPage';

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
		Component: RecentFittingPage,
	},
	{
		path: PATH.CLOSET,
		Component: ClosetPage,
	},
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
