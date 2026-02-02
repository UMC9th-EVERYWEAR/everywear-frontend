import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/src/apis/domain/user';
import { useAuthStore } from '@/src/store/use-auth-store';

export const useMe = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const login = useAuthStore((state) => state.login);

	return useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			const me = await getMyInfo();

			// 서버에서 받은 진짜 유저 정보로 Zustand 갱신
			login(
				{
					id: me?.userId ?? 0,
					name: me?.name ?? '',
					email: me?.email ?? '',
				},
        accessToken!,
        true,
			);
			return me;
		},
	});
};
