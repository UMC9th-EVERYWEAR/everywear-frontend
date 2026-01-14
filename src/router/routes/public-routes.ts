// import { PATH } from '../path';

// ✅ Data Router(createBrowserRouter)에서는 element(<Component />)보다 Component(Component)를 쓰는 방식이 더 권장됨
// ✅ 라우터가 내부에서 React.createElement(Component)로 렌더링해서 라우트 정의가 더 깔끔해짐
// ✅ 추후 성능 최적화를 위해 lazy()로 불러오는 페이지도 Component 방식이 더 자연스럽게 연결됨

export const publicRoutes = [
	// {
	//   path: PATH.LOGIN,
	// Component: LoginPage,
	// }
]
