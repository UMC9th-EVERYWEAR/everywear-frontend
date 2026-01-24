import { Component } from 'react';
import Home from '../../page/Home';
import SettingPage from '../../page/setting/SettingPage';
import { PATH } from '../../constants/path';
import RecentFittingPage from '../../page/recent-fitting';

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
	// 필요하면 계속 추가
	// { path: PATH.CLOSET, Component: ClosetPage },
	// { path: PATH.PRODUCTS.ROOT, Component: ProductsPage },
];
