import { getReviews } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReview(product_id : number, options = {}) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.RECENT(product_id),
		queryFn :() => getReviews(product_id), 
		
		refetchInterval : (query) => {
			const data = query.state.data;

			if (data?.result?.status=== 'processing') {
				console.log('5초 타임아웃');
				return 10000;
			}
			else return false;
		},
		refetchIntervalInBackground : true,
		...options,
	})

}


export default useGetReview;
