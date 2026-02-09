import { getAiReview } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReviewAi(product_id : number) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.AI(product_id),
		queryFn :() => getAiReview(product_id), 
	})

}

export default useGetReviewAi;
