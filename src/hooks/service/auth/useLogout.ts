import { useMutation } from '@tanstack/react-query';
import { userLogout } from '@/src/apis/domain';
import { useAuthStore } from '@/src/store/use-auth-store';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';


export const useLogout = () => {
	const logoutStore = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async () => {
			try {
				await userLogout(); // 서버 로그아웃
			} catch (e) {
				console.error('로그아웃 API 실패', e);
				// API 실패해도 계속 진행
			}
		},
		onSettled: () => {
			// 성공/실패 상관없이 실행
			logoutStore(); // zustand + storage 정리

			navigate(PATH.LOGIN.ROOT);
		},
	});

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending,
	};
};
