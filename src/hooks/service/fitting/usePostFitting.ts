import { requestFitting } from '@/src/apis/domain';
import type { FittingRequest } from '@/src/apis/generated';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ToastInput } from '../../domain/ai-fitting/useToast';

interface usePostFittingProps {
    createToast : (toast : ToastInput) => void;
}

interface FittingVariable {
    payload : FittingRequest;
}

function usePostFitting({ createToast } : usePostFittingProps) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ payload } : FittingVariable) => requestFitting(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.FITTING.SESSION,
			});
			createToast({ message: '가상 피팅이 완료되었습니다.' });
		},

		onError:(error) => {
			console.log('에러 발생 : ', error);
		},
	})
}

export default usePostFitting;
