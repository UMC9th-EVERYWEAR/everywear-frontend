import { crawlReview } from '@/src/apis/domain';
import type { CrawlReviewDTO } from '@/src/apis/generated';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CrawlReviewVariable {
    payload : CrawlReviewDTO;
}

function usePostReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ payload } : CrawlReviewVariable) => crawlReview(payload), 

		onSuccess: (_data, variable) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.REVIEW.RECENT(variable.payload.product_id),
			})
		},

	})
}

export default usePostReview;
