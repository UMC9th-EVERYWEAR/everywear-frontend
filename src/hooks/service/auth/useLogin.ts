import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/src/apis/domain/user';
import { useAuthStore } from '@/src/store/use-auth-store';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';

export const useLogin = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	return useQuery({
		queryKey: ['me'], //TODO: 쿼리 수정
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
			navigate(PATH.LOGIN.TERMS)
			return me;
		},
	});
};
