// import { PATH } from '../path';

import { PATH } from '@/src/constants/path';
import OAuthCallbackPage from '@/src/pages/login/login-callback-page';
import LoginPage from '@/src/pages/login/login-page';
import LoginTermsPage from '@/src/pages/login/login-terms-page';

// ✅ Data Router(createBrowserRouter)에서는 element(<Component />)보다 Component(Component)를 쓰는 방식이 더 권장됨
// ✅ 라우터가 내부에서 React.createElement(Component)로 렌더링해서 라우트 정의가 더 깔끔해짐
// ✅ 추후 성능 최적화를 위해 lazy()로 불러오는 페이지도 Component 방식이 더 자연스럽게 연결됨


/*
 * publicRoutes
 * - 로그인 없이 접근 가능한 페이지들
*/
export const publicRoutes = [
	{
		path: PATH.LOGIN.ROOT,
		Component: LoginPage,
	},
	{
		path: PATH.LOGIN.CALLBACK,
		Component: OAuthCallbackPage,
	},
	{
		path: PATH.LOGIN.TERMS,
		Component: LoginTermsPage,
	},
]
