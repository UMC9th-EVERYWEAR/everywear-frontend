import { getAiReview } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReviewAi(product_id : number, options = {}) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.AI(product_id),
		queryFn :() => getAiReview(product_id), 


		refetchInterval : (query) => {
			const data = query.state.data;

			if (!data) return 5000;
			else return false;
		},
		refetchIntervalInBackground : true,
		...options,
	})

}

export default useGetReviewAi;
