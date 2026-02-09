import { generateAiReview } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface GenerateAiReviewVariable {
    productId : number;
}

function usePostReviewAi() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (product  : GenerateAiReviewVariable) => generateAiReview(product.productId),

		onSuccess : (_data, variable) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.REVIEW.AI(variable.productId),
			})
            
		},
	})

}

export default usePostReviewAi;
