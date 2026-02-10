import { generateAiReview } from '@/src/apis/domain'; 
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AiReviewVariable {
  productId: number;
}

function usePostAiReview() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ productId }: AiReviewVariable) => generateAiReview(productId),

		onSuccess: (data, variables) => {
			queryClient.setQueryData(
				QUERY_KEYS.REVIEW.AI(variables.productId), 
				data,
			);
		},
	});
}

export default usePostAiReview;
