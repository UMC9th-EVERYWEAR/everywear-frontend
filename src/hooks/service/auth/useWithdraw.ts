import { useMutation } from '@tanstack/react-query';
import { withdraw } from '@/src/apis/domain';
import { useAuthStore } from '@/src/store/use-auth-store';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { queryClient } from '@/src/lib/react-query';


export const useWithdraw = () => {
	const logoutStore = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async () => {
			try {
				await withdraw();
			} catch (e) {
				console.error('탈퇴 API 실패', e);
			}
		},
		onSettled: () => {
			// 성공/실패 상관없이 실행
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER });
			logoutStore(); // 로그아웃도 같이, zustand + storage 정리
			navigate(PATH.LOGIN.ROOT);
		},
	});

	return {
		withdraw: mutation.mutate,
		isLoading: mutation.isPending,
	};
};
