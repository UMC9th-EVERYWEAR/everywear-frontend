import { toggleProductLike } from '@/src/apis/domain';
import { useMutation } from '@tanstack/react-query';
import type { ToastInput } from '../../domain/ai-fitting/useToast';
import { queryClient } from '@/src/lib/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import type { ListDTO } from '@/src/apis/generated';

interface useLikeProps {
    createToast: (toast: ToastInput) => void;
}

function useLike({ createToast }: useLikeProps) {
	return useMutation({
		mutationFn: ({ productId }: { productId: number; isLiked: boolean }) => 
			toggleProductLike(productId),

		onMutate: async ({ productId, isLiked }) => {
			await queryClient.cancelQueries({ 
				queryKey: QUERY_KEYS.PRODUCT.DETAIL(productId), 
			});

			const previousData = queryClient.getQueryData(QUERY_KEYS.PRODUCT.DETAIL(productId));

			queryClient.setQueryData<ListDTO>(
				QUERY_KEYS.PRODUCT.DETAIL(productId), 
				(old) => {
					if (!old) return old;
					return {
						...old,
						is_liked: !isLiked, 
					};
				},
			);

			if (isLiked) {
				createToast({ message: '내 옷장에서 삭제되었습니다.' });
			} else {
				createToast({ message: '내 옷장에 추가되었습니다.' });
			}

			return { previousData };
		},

		onError: (_err, variables, context) => {
			if (context?.previousData) {
				queryClient.setQueryData<ListDTO>(
					QUERY_KEYS.PRODUCT.DETAIL(variables.productId),
                    context.previousData as ListDTO,
				);
			}
			createToast({ message: '잠시 후 다시 시도해주세요.' });
		},

		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.PRODUCT.DETAIL(variables.productId), 
			});
			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.CLOSET.ALL, 
			});
		},
	});
}

export default useLike;
