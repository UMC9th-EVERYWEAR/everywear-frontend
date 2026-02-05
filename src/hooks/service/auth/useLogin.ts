import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/src/apis/domain/user';
import { useAuthStore } from '@/src/store/use-auth-store';
import { ENV_CONFIG } from '@/src/constants/config';
import { accessTokenStorage } from '@/src/apis/common/apiInstance';


export const useLogin = () => {
	const login = useAuthStore((state) => state.login);
	const latestAccessToken = accessTokenStorage.getItem();

	return useMutation({
		mutationFn: async () => {
			return getMyInfo();
		},		
		onSuccess: (me) => {
			login(
				{
					id: me?.userId ?? 0,
					name: me?.name ?? '',
					email: me?.email ?? '',
				},
        latestAccessToken!,
        true,
			);

			if (ENV_CONFIG.isDev) {
				console.log('[DEV] login success 💻', me);
			}

			//  배포 모드 전용 로직
			if (ENV_CONFIG.isProd) {
				console.log('[Prod] login success 🚀');
			}
		},
	});
};