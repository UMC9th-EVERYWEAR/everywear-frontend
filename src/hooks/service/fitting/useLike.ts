import { toggleProductLike } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ToastInput } from '../../domain/ai-fitting/UseToast';

interface useLikeProps {
    createToast: (toast: ToastInput) => void;
}

interface LikeVariables {
    productId: number;
    isLiked: boolean | undefined; // 현재 좋아요 상태
}

function useLike({ createToast } : useLikeProps) {

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ productId }: LikeVariables) => toggleProductLike(productId),
		onSuccess: (_data, variables) => {
			// detail 키가 없으므로 전체 상품 리스트 갱신, 내 옷장 리스트 갱신
			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.PRODUCT.ALL, 
			});
			queryClient.invalidateQueries({ 
				queryKey: QUERY_KEYS.CLOSET.ALL, 
			});

			// 내가 보낸 이전 상태값으로 판별
			// 이전에 좋아요였다면(true) -> 클릭했으니 삭제
			// 이전에 좋아요가 아니었다면(false) -> 클릭했으니 추가
			if (variables.isLiked) {
				createToast({ message: '내 옷장에서 삭제되었습니다.' });
			} else {
				createToast({ message: '내 옷장에 추가되었습니다.' });
			}
		},
		onError: (error) => {
			console.error('좋아요 변경 실패:', error);
		},
	})
}

export default useLike;
