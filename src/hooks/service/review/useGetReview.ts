import { getReviews } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReview(product_id: number, isEnabled: boolean) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.RECENT(product_id),
		queryFn: () => getReviews(product_id),
    
		enabled: !!product_id && isEnabled, 

		refetchInterval: (query) => {
			const status = query.state.data?.result?.status;
			if (status === 'processing' || status === 'not_started') {
				return 5000;
			}
			return false;
		},
    
		refetchIntervalInBackground: true,
	});
}

export default useGetReview;
