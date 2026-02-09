import { getReviews } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReview(product_id : number) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.RECENT(product_id),
		queryFn :() => getReviews(product_id), 
		
		refetchInterval : (query) => {
			const data = query.state.data;

			if (!data || query.state.status === 'pending') return 5000;
			else return false;
		},
		refetchIntervalInBackground : true,
	})

}

export default useGetReview;
