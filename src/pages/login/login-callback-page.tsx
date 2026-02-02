import { refreshToken } from '@/src/apis/domain';
import { PATH } from '@/src/constants/path';
import { useAuthStore } from '@/src/store/use-auth-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OAuthCallbackPage = () => {
	const navigate = useNavigate();
	const login = useAuthStore((state)=> state.login)


	useEffect(() => {
		const run = async () => {
			try {
				// 1. 쿠키 기반 accessToken 재발급
				const accessToken = await refreshToken();

				if (!accessToken) {
					throw new Error('accessToken 발급 실패');
				}

				// 2.  Zustand에 accessToken 저장
				login(
					{
						id: 'temp',      // 다음 단계에서 /me로 교체
						name: '사용자',
						email: '',
					},
					accessToken,
					true,
				);

				// 3. 약관 / 로그인 페이지으로 이동
				navigate(PATH.LOGIN.TERMS, { replace: true });
			} catch (e) {
				console.error('OAuth 콜백 처리 실패', e);
				navigate(PATH.LOGIN.ROOT, { replace: true });
			}
		};

		run();
	}, [login, navigate]);
	return <div>로그인 처리 중입니다...</div>;
};

export default OAuthCallbackPage;



// 프론트엔드는 OAuth 로그인 시작 URL로 브라우저를 리다이렉트시키고,
// 사용자가 인증을 완료하면 백엔드가 토큰 발급과 쿠키 설정을 마친 뒤
// 프론트 페이지로 다시 리다이렉트하는 구조
// 프론트에서는 쿠기 기반으로 로그인 되어있으면 refresh로 액세스토큰 받아서 저장
// export const useMe = () => {
//   return useQuery({
//     queryKey: ['me'],
//     queryFn: () => apiClient.getMyInfo().then(res => res.data.result),
//     enabled: !!useAuthStore.getState().accessToken,
//   });
// };
