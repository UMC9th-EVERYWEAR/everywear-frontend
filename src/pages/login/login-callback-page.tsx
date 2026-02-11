
import { accessTokenStorage } from '@/src/apis/common/apiInstance';
import Loading from '@/src/components/common/Loading';
import { PATH } from '@/src/constants/path';
import { useLogin } from '@/src/hooks/service/auth/useLogin';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';



const OAuthCallbackPage = () => {
	const [searchParams] = useSearchParams();
	const { mutate: login } = useLogin();
	const navigate = useNavigate();
	const accessToken = searchParams.get('accessToken');

	
	useEffect(() => {

		if (!accessToken) {
			navigate(PATH.LOGIN.ROOT, { replace: true });
			return;
		}

		accessTokenStorage.setItem(accessToken)

		  login();
	}, [accessToken, login, navigate]);

	return <Loading />
};

export default OAuthCallbackPage;
