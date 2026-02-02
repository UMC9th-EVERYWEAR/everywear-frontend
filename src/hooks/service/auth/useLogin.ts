import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/src/apis/domain/user';
import { useAuthStore } from '@/src/store/use-auth-store';
import { ENV_CONFIG } from '@/src/constants/config';


export const useLogin = () => {
	const login = useAuthStore((state) => state.login);
	const accessToken = useAuthStore((state) => state.accessToken);

	return useMutation({
		mutationFn: getMyInfo, // 로그인 직후 /me 확인
		onSuccess: (me) => {
			login(
				{
					id: me?.userId ?? 0,
					name: me?.name ?? '',
					email: me?.email ?? '',
				},
        accessToken!,
        true,
			);

			if (ENV_CONFIG.isDev) {
				console.log('[DEV] login success 💻', me);
			}

			//  배포 모드 전용 로직
			if (ENV_CONFIG.isProd) {
				console.log('[Prod] login success 🚀', me);
			}
		},
	});
};
