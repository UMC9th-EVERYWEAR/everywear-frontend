import AiFittingPage from '@/src/pages/ai-fitting/AiFittingPage';
import Home from '../../pages/Home';
import SettingPage from '../../pages/setting/SettingPage';
import { PATH } from '../path';

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
		path: PATH.AI_FITTING.DETAIL,
		Component: AiFittingPage,
	},
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
