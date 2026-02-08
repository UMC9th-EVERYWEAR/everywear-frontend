import { toggleProductLike } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useLike() {

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: toggleProductLike,
		onSuccess: () => {
			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.PRODUCT.ALL, 
			});

			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.CLOSET.ALL, 
			});
		},
		onError: (error) => {
			console.error('좋아요 변경 실패:', error);
		},
	})
}

export default useLike;
