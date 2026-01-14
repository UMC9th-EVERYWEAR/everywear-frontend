import { createBrowserRouter } from 'react-router';

import { protectedRoutes } from './routes/protected-routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { publicRoutes } from './routes/public-routes';
import RootLayout from '../components/layout/RootLayout';


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
				children: protectedRoutes,
			},
		],
	},

]);
