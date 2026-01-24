import SettingPhotoPage from '@/src/pages/setting/SettingPhotoPage';
import Home from '../../pages/Home';
import SettingPage from '../../pages/setting/SettingPage';
import { PATH } from '../path';
import SettingInquiry from '@/src/pages/setting/SettingInquiryPage';
import SettingWithdraw from '@/src/pages/setting/SettingWithdrawPage';
import RecentFitting from '@/src/pages/recent-fitting';

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
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
