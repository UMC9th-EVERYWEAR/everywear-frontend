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

			// export interface UserResponse {
			//   /** @format int64 */
			//   userId?: number;
			//   name?: string;
			//   email?: string;
			//   socialType?: UserResponseSocialTypeEnum;
			//   isActive?: UserResponseIsActiveEnum;
			//   isAgreed?: boolean;
			//   alarmOnoff?: boolean;
			//   /** @format date-time */
			//   createdAt?: string;
			//   /** @format date-time */
			//   updatedAt?: string;
			// }

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
		enabled: !!accessToken, // ✅ accessToken 있을 때만 호출
		staleTime: 1000 * 60 * 5, // 5분
		retry: false,
	});
};
