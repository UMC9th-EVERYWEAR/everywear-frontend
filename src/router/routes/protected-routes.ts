import SettingPhotoPage from '@/src/pages/setting/setting-photo-page';
import SettingPage from '../../pages/setting/setting-page';
import SettingInquiry from '@/src/pages/setting/setting-inquiry-page';
import SettingWithdraw from '@/src/pages/setting/setting-withdraw-page';
import ClosetPage from '@/src/pages/closet/closet-page';
import RecentFitting from '@/src/pages/RecentFittingPage';
import  { PATH } from '@/src/constants/path';
import AiFittingPage from '@/src/pages/ai-fitting/ai-fitting-page';
import LoginTermsPage from '@/src/pages/login/login-terms-page';
import OnBoardingPage from '@/src/pages/onboarding/onboarding-page';
import OnBoardingPhotoPage from '@/src/pages/onboarding/onboarding-photo-page';
import Home from '@/src/pages/Home';
import ProductsPage from '@/src/pages/products/products/products-page';
import ProductsAddPage from '@/src/pages/products/add/products-add-page';
import OAuthCallbackPage from '@/src/pages/login/login-callback-page';

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
		path: PATH.LOGIN.TERMS,
		Component: LoginTermsPage,
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
		path: PATH.LOGIN.CALLBACK,
		Component: OAuthCallbackPage,
	},

];
