import { useMutation } from '@tanstack/react-query';
import { toggleAgree, toggleAlarm } from '@/src/apis/domain/user';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { queryClient } from '@/src/lib/react-query';

export const useToggleAlarm = () => {

	return useMutation({
		mutationFn: toggleAlarm,
		onSuccess: () => {
			// 알림 상태가 포함된 유저 정보 갱신
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER });
		},
	});
};

export const useToggleAgree = () => {
	return useMutation({
		mutationFn: toggleAgree,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER });
		},
	});
};
