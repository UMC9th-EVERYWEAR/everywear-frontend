

  	/*  RootLayout 아래에
	publicRoutes들은 바로 접근 가능
	protectedRoutes들은 ProtectedRoute라는 (Guard) 아래에 있음 
	*/
import Home from '@/src/pages/home/home-page';
import NotFoundPage from '@/src/pages/not-found/not-found-page';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '@/src/app/router/routes/ProtectedRoute';
import { publicRoutes } from '@/src/app/router/routes/public-routes';
import RecentFitting from '@/src/pages/recent-fitting/recent-fitting-page';
import { protectedRoutes } from '@/src/app/router/routes/protected-routes';
import RootLayout from '@/src/widgets/layout/RootLayout';


export const router = createBrowserRouter([
	{
		Component: RootLayout,
		// ErrorBoundary: ErrorPage, **** TODO: 추후 에러 페이지 추가  *****
		children: [
			...publicRoutes, // 인증 필요 없는 페이지들(/login 등)
			{
				Component: ProtectedRoute,
				children: [
					...protectedRoutes,
					{
						path: 'home', // 'www.site.com/home'으로 접속
						Component: Home,
					},
					{
						path: 'recent-fitting',
						Component: RecentFitting,
					},
				],
			},

			// 3. 잘못된 주소 접근 시
			{ path: '*', Component: NotFoundPage },
		],
	},
]);
