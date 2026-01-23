import Home from '../../pages/Home';
import SettingPage from '../../pages/setting/SettingPage';
import { PATH } from '../path';
import RecentFittingPage from '../../pages/recent-fitting';
import OnBoardingPage from '@/src/pages/onboarding/onboarding-page';
import OnBoardingPhotoPage from '@/src/pages/onboarding/onboarding-photo-page';

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
		path: PATH.ONBOARDING.ROOT,
		Component: OnBoardingPage,
	},
	{
		path: PATH.ONBOARDING.PHOTO,
		Component: OnBoardingPhotoPage,
	},
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
