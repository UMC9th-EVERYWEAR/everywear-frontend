import { getReviews } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReview(product_id : number) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.RECENT(product_id),
		queryFn :() => getReviews(product_id), 
	})

}

export default useGetReview;
