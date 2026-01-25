import SettingPhotoPage from '@/src/pages/setting/setting-photo-page';
import Home from '../../pages/Home';
import SettingPage from '../../pages/setting/setting-page';
import SettingInquiry from '@/src/pages/setting/setting-inquiry-page';
import SettingWithdraw from '@/src/pages/setting/setting-withdraw-page';
import RecentFitting from '@/src/pages/recent-fitting';
import  { PATH } from '@/src/constants/path';
import AiFittingPage from '@/src/pages/ai-fitting/ai-fitting-page';
import LoginTermsPage from '@/src/pages/login/login-terms-page';

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
		path: PATH.SETTING.CHANGE_PHOTO,
		Component: SettingPhotoPage,
	},
	{
		path: PATH.SETTING.INQUIRY,
		Component: SettingInquiry,
	},
	{
		path: PATH.SETTING.WITHDRAW,
		Component:  SettingWithdraw
		,
	},
	{ 
		path: PATH.RECENT_FITTING,
		Component: RecentFitting,
	},
	{
		path: PATH.AI_FITTING.DETAIL,
		Component: AiFittingPage,
	},
	{
		path: PATH.LOGIN.TERMS,
		Component: LoginTermsPage,
	},
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
