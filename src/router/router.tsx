

import { createBrowserRouter } from 'react-router';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import NotFoundPage from '@/src/pages/NotFoundPage';
import { protectedRoutes } from './routes/protected-routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { publicRoutes } from './routes/public-routes';
import RecentFitting from '../pages/recent-fitting';
  	/*  RootLayout 아래에
	publicRoutes들은 바로 접근 가능
	protectedRoutes들은 ProtectedRoute라는 (Guard) 아래에 있음 
	*/




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
