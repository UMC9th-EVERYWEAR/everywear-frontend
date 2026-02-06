
// import { accessTokenStorage } from '@/src/apis/common/apiInstance';
import Loading from '@/src/components/common/Loading';
// import { PATH } from '@/src/constants/path';
// import { useLogin } from '@/src/hooks/service/auth/useLogin';
// import { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router';


const OAuthCallbackPage = () => {
	// const [searchParams] = useSearchParams();
	// const { mutate: login } = useLogin();
	// const navigate = useNavigate();

	
	// useEffect(() => {
	// 	const accessToken = searchParams.get('accessToken');

	// 	if (!accessToken) {
	// 		navigate(PATH.LOGIN.ROOT);
	// 		return;
	// 	}

	// 	accessTokenStorage.setItem(accessToken)

	// 	  login();
	// }, [searchParams, login, navigate]);

	return <Loading />
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
