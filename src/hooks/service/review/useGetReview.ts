import { getReviews } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReview(product_id : number, options = {}) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.RECENT(product_id),
		queryFn :() => getReviews(product_id), 

		select: (data) => ({
			status: data.status,
    		total_count: data.total_count,
    		reviews: data.reviews,
		}),
		
		refetchInterval : (query) => {
			const data = query.state.data;

			if (!data ||data.status === 'processing') return 5000;
			else return false;
		},
		refetchIntervalInBackground : true,
		...options,
	})

}


export default useGetReview;
