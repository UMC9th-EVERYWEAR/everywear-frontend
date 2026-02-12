import  { PATH } from '@/src/constants/path';
import { lazy } from 'react';
const Home = lazy(() => import('@/src/pages/home/home-page'));
const SettingPage = lazy(() => import('../../pages/setting/setting-page'));
const SettingPhotoPage = lazy(() => import('@/src/pages/setting/setting-photo-page'));
const SettingInquiry = lazy(() => import('@/src/pages/setting/setting-inquiry-page'));
const SettingWithdraw = lazy(() => import('@/src/pages/setting/setting-withdraw-page'));
const ClosetPage = lazy(() => import('@/src/pages/closet/closet-page'));
const RecentFitting = lazy(() => import('@/src/pages/fitting/RecentFittingPage'));
const AiFittingPage = lazy(() => import('@/src/pages/ai-fitting/ai-fitting-page'));
const OnBoardingPage = lazy(() => import('@/src/pages/onboarding/onboarding-page'));
const OnBoardingPhotoPage = lazy(() => import('@/src/pages/onboarding/onboarding-photo-page'));
const ProductsPage = lazy(() => import('@/src/pages/products/products/products-page'));
const ProductsAddPage = lazy(() => import('@/src/pages/products/add/products-add-page'));
const FittingDetailPage = lazy(() => import('@/src/pages/fitting/FittingDetailPage'));



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
		path: PATH.ONBOARDING.ROOT,
		Component: OnBoardingPage,
	},
	{
		path: PATH.ONBOARDING.PHOTO,
		Component: OnBoardingPhotoPage,
	},
	{
		path: PATH.AI_FITTING.DETAIL,
		Component: AiFittingPage,
	},
	{
		path: PATH.CLOSET,
		Component: ClosetPage,
	},
	{
		path: PATH.PRODUCTS.ROOT,
		Component: ProductsPage,
	},
	{
		path: PATH.PRODUCTS.ADD,
		Component: ProductsAddPage,
	},

	{
		path: PATH.FITTING_DETAIL, 
		Component: FittingDetailPage,
	},
];
