import { requestFitting } from '@/src/apis/domain';
import type { FittingRequest } from '@/src/apis/generated';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FittingVariable {
    payload : FittingRequest;
}

function usePostFitting() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ payload } : FittingVariable) => requestFitting(payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.FITTING.SESSION,
			});
			console.log('피팅 결과 : ', data);
		},

		onError:(error) => {
			console.log('에러 발생 : ', error);
		},
	})
}

export default usePostFitting;
