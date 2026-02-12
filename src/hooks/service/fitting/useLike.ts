import { toggleProductLike } from '@/src/apis/domain';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import type { ToastInput } from '../../domain/ai-fitting/useToast';

interface useLikeProps {
    createToast: (toast: ToastInput) => void;
}

interface LikeVariables {
    productId: number;
    isLiked: boolean | undefined;
}

function useLike({ createToast } : useLikeProps) {

	return useMutation({
		mutationFn: ({ productId }: LikeVariables) => toggleProductLike(productId),
		onSuccess: (_data, variables) => {

			queryClient.invalidateQueries({
				queryKey : QUERY_KEYS.PRODUCT.DETAIL(variables.productId),
			})

			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.CLOSET.ALL, 
			});

			if (variables.isLiked) {
				createToast({ message: '내 옷장에서 삭제되었습니다.' });
			} else {
				createToast({ message: '내 옷장에 추가되었습니다.' });
			}
		},
	})
}

export default useLike;
