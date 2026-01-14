import { PATH } from "../path";


/**
 * 인증이 필요한 라우트를 감싸는 Guard 컴포넌트
 * 인증 안 된 경우 login으로 보내고, 인증 된 경우 Outlet으로 자식 라우트 렌더
 */
export default function ProtectedRoute() {
	// TODO: 실제 프로젝트에서는 auth store / cookie / token 등으로 판별
	const isAuthed = Boolean(localStorage.getItem('accessToken'));

	if (!isAuthed) {
		return <Navigate
			to={PATH.LOGIN}
			replace
		       />;
	}

	return <Outlet />;
}
