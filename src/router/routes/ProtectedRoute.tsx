import { Navigate, Outlet } from 'react-router';
import { PATH } from '../path';


/*
 * 인증이 필요한 라우트를 감싸는 Guard 컴포넌트
 * 인증 안 된 경우 login으로 보내고, 인증 된 경우 Outlet으로 자식 라우트 렌더
 */
export default function ProtectedRoute() {
	// TODO: Api 연결 시에는 apiclient에서 인증 상태를 확인하도록 변경
	const isAuthed = true; // 임시: 항상 인증된 상태로 가정

	if (!isAuthed) {
		return <Navigate
			to={PATH.LOGIN}
			replace
		       />;
	}

	return <Outlet />;
}
